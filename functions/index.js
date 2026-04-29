const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const BREVO_API_KEY = defineSecret("BREVO_API_KEY");
const BREVO_SENDER_EMAIL = defineSecret("BREVO_SENDER_EMAIL");
const CONTACT_RECIPIENT_EMAIL = defineSecret("CONTACT_RECIPIENT_EMAIL");
const BREVO_CONTACT_LIST_ID = defineSecret("BREVO_CONTACT_LIST_ID");

const BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";
const SUBJECT = "Nouvelle demande";
const SENDER_NAME = "Contact";
const TAGS = ["contact", "nouvelle-demande"];
const MIN_SUBMIT_DELAY_MS = 2500;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_FIELD_LENGTH = 220;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

const requestMemory = new Map();

function setCors(req, res) {
  const allowedOrigins = new Set([
    "https://nocxweb.fr",
    "https://www.nocxweb.fr",
    "https://nocx-web.web.app",
    "http://localhost:5000",
    "http://127.0.0.1:5000"
  ]);
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Accept");
}

function safeString(value, max = MAX_FIELD_LENGTH) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function safeMessage(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (_) {
      return {};
    }
  }
  return {};
}

function getIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "");
  return forwarded.split(",")[0].trim() || req.ip || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = requestMemory.get(ip) || [];
  const recent = bucket.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestMemory.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function normalizePayload(raw) {
  const firstName = safeString(raw.firstName);
  const lastName = safeString(raw.lastName || raw.name);
  const name = safeString(raw.name || [firstName, lastName].filter(Boolean).join(" "));
  return {
    firstName,
    lastName,
    name,
    email: safeString(raw.email, 320).toLowerCase(),
    phone: safeString(raw.phone),
    company: safeString(raw.company || raw.profession || raw.organization),
    project: safeString(raw.project || raw.type),
    budget: safeString(raw.budget),
    message: safeMessage(raw.message),
    website: safeString(raw.website),
    formStartedAt: Number(raw.formStartedAt || 0)
  };
}

function validate(payload) {
  if (payload.website) return { ok: false, code: "SPAM_DETECTED" };
  if (!payload.firstName && !payload.lastName && !payload.name) return { ok: false, code: "NAME_REQUIRED" };
  if (!payload.email || !isEmail(payload.email)) return { ok: false, code: "EMAIL_REQUIRED" };
  if (!payload.message) return { ok: false, code: "MESSAGE_REQUIRED" };
  const elapsed = Date.now() - payload.formStartedAt;
  if (!payload.formStartedAt || elapsed < MIN_SUBMIT_DELAY_MS) {
    return { ok: false, code: "SUBMITTED_TOO_FAST" };
  }
  return { ok: true };
}

function formatDateParis(date = new Date()) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris"
  }).format(date);
}

function buildEmail(payload) {
  const sentAt = formatDateParis();
  const rows = [
    ["Nom", payload.lastName || payload.name || "Non renseigné"],
    ["Prénom", payload.firstName || "Non renseigné"],
    ["Email", payload.email],
    ["Téléphone", payload.phone || "Non renseigné"],
    ["Société / profession", payload.company || "Non renseigné"],
    ["Type de demande", payload.project || "Non renseigné"],
    ["Budget", payload.budget || "Non renseigné"],
    ["Date / heure d’envoi", sentAt]
  ];
  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:13px;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>
  `).join("");
  const htmlContent = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Nouvelle demande de contact</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
<tr><td style="padding:28px 28px 18px;border-bottom:1px solid #eef0f5;"><p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Nouvelle demande de contact</p><h1 style="margin:0;color:#0f172a;font-size:28px;line-height:1.15;">Nouvelle demande</h1></td></tr>
<tr><td style="padding:18px 28px 4px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${htmlRows}</table></td></tr>
<tr><td style="padding:16px 28px 24px;"><p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:700;">Message</p><div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e5e7eb;border-radius:16px;padding:16px;color:#111827;font-size:15px;line-height:1.65;">${escapeHtml(payload.message)}</div><div style="margin-top:18px;"><a href="mailto:${encodeURIComponent(payload.email)}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-size:14px;font-weight:700;">Répondre au prospect</a></div></td></tr>
</table></td></tr></table></body></html>`;
  const textContent = [
    "Nouvelle demande de contact", "",
    `Nom : ${payload.lastName || payload.name || "Non renseigné"}`,
    `Prénom : ${payload.firstName || "Non renseigné"}`,
    `Email : ${payload.email}`,
    `Téléphone : ${payload.phone || "Non renseigné"}`,
    `Société / profession : ${payload.company || "Non renseigné"}`,
    `Type de demande : ${payload.project || "Non renseigné"}`,
    `Budget : ${payload.budget || "Non renseigné"}`,
    `Date / heure d’envoi : ${sentAt}`, "", "Message :", payload.message
  ].join("\n");
  return { htmlContent, textContent };
}

async function brevoRequest(endpoint, apiKey, payload, method = "POST") {
  const response = await fetch(endpoint, {
    method,
    headers: { "accept": "application/json", "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    const error = new Error(`BREVO_${method}_FAILED_${response.status}`);
    error.status = response.status;
    error.body = errorText.slice(0, 700);
    throw error;
  }
  if (response.status === 204) return null;
  return response.json().catch(() => null);
}

async function addOrUpdateContact(payload, apiKey, listId) {
  if (!listId) return;
  const numericListId = Number(listId);
  if (!Number.isFinite(numericListId) || numericListId <= 0) return;
  const attributes = {
    FIRSTNAME: payload.firstName || undefined,
    LASTNAME: payload.lastName || payload.name || undefined,
    SMS: payload.phone || undefined,
    SOCIETE: payload.company || undefined,
    TYPE_DEMANDE: payload.project || undefined,
    BUDGET: payload.budget || undefined
  };
  Object.keys(attributes).forEach((key) => { if (!attributes[key]) delete attributes[key]; });
  await brevoRequest(BREVO_CONTACTS_ENDPOINT, apiKey, {
    email: payload.email,
    attributes,
    listIds: [numericListId],
    updateEnabled: true
  });
}

exports.sendContactEmail = onRequest({
  region: "europe-west1",
  secrets: [BREVO_API_KEY, BREVO_SENDER_EMAIL, CONTACT_RECIPIENT_EMAIL, BREVO_CONTACT_LIST_ID],
  timeoutSeconds: 30,
  memory: "256MiB",
  maxInstances: 5
}, async (req, res) => {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const ip = getIp(req);
  if (isRateLimited(ip)) {
    console.warn("Contact form rate limited", { ip });
    return res.status(429).json({ ok: false });
  }
  const payload = normalizePayload(getBody(req));
  const validation = validate(payload);
  if (!validation.ok) {
    console.warn("Contact form validation failed", { code: validation.code, ip });
    return res.status(400).json({ ok: false });
  }
  const apiKey = BREVO_API_KEY.value();
  const senderEmail = BREVO_SENDER_EMAIL.value();
  const recipientEmail = CONTACT_RECIPIENT_EMAIL.value();
  const listId = BREVO_CONTACT_LIST_ID.value();
  if (!apiKey || !senderEmail || !recipientEmail) {
    console.error("Contact form missing server configuration", { hasApiKey: Boolean(apiKey), hasSenderEmail: Boolean(senderEmail), hasRecipientEmail: Boolean(recipientEmail) });
    return res.status(500).json({ ok: false });
  }
  const { htmlContent, textContent } = buildEmail(payload);
  try {
    const result = await brevoRequest(BREVO_EMAIL_ENDPOINT, apiKey, {
      sender: { name: SENDER_NAME, email: senderEmail },
      to: [{ email: recipientEmail, name: SENDER_NAME }],
      replyTo: { email: payload.email, name: payload.name || payload.email },
      subject: SUBJECT,
      htmlContent,
      textContent,
      tags: TAGS
    });
    addOrUpdateContact(payload, apiKey, listId).catch((error) => {
      console.error("Brevo contact sync failed", { status: error.status, body: error.body, message: error.message });
    });
    return res.status(200).json({ ok: true, messageId: result?.messageId || null });
  } catch (error) {
    console.error("Brevo email send failed", { status: error.status, body: error.body, message: error.message });
    return res.status(500).json({ ok: false });
  }
});
