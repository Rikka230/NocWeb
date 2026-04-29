# Workflow contact Brevo - Nocx Web

Ce patch ajoute un backend Firebase Functions pour envoyer le formulaire de contact via Brevo sans exposer la clé API côté front.

## Fichiers ajoutés / modifiés

- `script.js` : le formulaire appelle `/api/sendContactEmail` au lieu d’un `mailto`.
- `style.css` : états visuels du message formulaire.
- `firebase.json` : rewrite Hosting vers la Function `sendContactEmail`.
- `functions/package.json` : dépendances Firebase Functions.
- `functions/index.js` : backend Brevo + validation + anti-spam simple.

## Secrets Firebase à créer

```bash
firebase functions:secrets:set BREVO_API_KEY
firebase functions:secrets:set BREVO_SENDER_EMAIL
firebase functions:secrets:set CONTACT_RECIPIENT_EMAIL
firebase functions:secrets:set BREVO_CONTACT_LIST_ID
```

Valeurs :

- `BREVO_API_KEY` : clé API Brevo transactionnelle.
- `BREVO_SENDER_EMAIL` : email expéditeur validé dans Brevo.
- `CONTACT_RECIPIENT_EMAIL` : email qui reçoit les demandes.
- `BREVO_CONTACT_LIST_ID` : ID numérique de la liste Brevo. Mettre `0` pour désactiver l’ajout à une liste au début.

## Installation

```bash
cd functions
npm install
cd ..
```

## Test local

```bash
firebase emulators:start --only functions,hosting
```

Puis ouvrir :

```txt
http://localhost:5000/?page=contact
```

## Déploiement complet

```bash
git checkout main
git pull origin main
firebase deploy --only functions,hosting
```

## Logs

```bash
firebase functions:log --only sendContactEmail
```

## Comportement attendu

- Expéditeur affiché : `Contact`
- Objet : `Nouvelle demande`
- Reply-To : email du prospect
- Tags Brevo : `contact`, `nouvelle-demande`
- Erreurs techniques loggées côté serveur uniquement.
