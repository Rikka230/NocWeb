/* =========================================================
   NOCX WEB
   Ajout non destructif de l'offre Portfolio Intermittents
   sur la page Tarifs générée par script.js.
   ========================================================= */

(() => {
  const OFFER_ID = "portfolio-intermittents-offer";
  const STYLE_ID = "portfolio-intermittents-style";
  const PAGE_ROUTE = "?page=intermittents";

  function isPricingRoute() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") === "pricing";
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .pricing-grid.has-intermittents-offer {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: stretch;
      }

      .pricing-grid.has-intermittents-offer .price-card {
        min-width: 0;
      }

      .pricing-grid.has-intermittents-offer .price-card .price {
        text-align: center;
      }

      .pricing-grid.has-intermittents-offer .price-card .price strong {
        display: block;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        font-size: clamp(2.3rem, 3.3vw, 3.05rem);
        letter-spacing: -0.075em;
      }

      .pricing-grid.has-intermittents-offer .price-card .btn {
        width: 100%;
        text-align: center;
        justify-content: center;
        line-height: 1.12;
      }

      .intermittents-offer {
        border-color: rgba(255, 209, 102, 0.36);
        background:
          linear-gradient(145deg, rgba(255, 209, 102, 0.12), rgba(255, 255, 255, 0.035));
      }

      .intermittents-offer::before {
        background: radial-gradient(circle at 50% 0%, rgba(255, 209, 102, 0.15), transparent 36%);
      }

      .intermittents-offer .portfolio-tag {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -56%);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-width: max-content;
        padding: .5rem .9rem;
        border-radius: 999px;
        color: #241505;
        font-size: .72rem;
        font-weight: 950;
        letter-spacing: .06em;
        text-transform: uppercase;
        background: linear-gradient(135deg, rgba(255, 214, 102, .96), rgba(255, 193, 94, .9));
        box-shadow: 0 12px 28px rgba(255, 194, 86, 0.24);
        animation: portfolioBadgePulse 2.4s ease-in-out infinite;
        z-index: 5;
      }

      @keyframes portfolioBadgePulse {
        0%, 100% { transform: translate(-50%, -56%) scale(1); box-shadow: 0 12px 28px rgba(255, 194, 86, 0.20); }
        50% { transform: translate(-50%, -56%) scale(1.04); box-shadow: 0 16px 34px rgba(255, 194, 86, 0.30); }
      }

      @media (max-width: 1020px) {
        .pricing-grid.has-intermittents-offer {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 680px) {
        .pricing-grid.has-intermittents-offer {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createOfferCard() {
    const article = document.createElement("article");
    article.className = "price-card intermittents-offer";
    article.id = OFFER_ID;
    article.innerHTML = `
      <span class="portfolio-tag">Offre dédiée artistes</span>
      <h3>Portfolio Intermittents</h3>
      <div class="price">
        <span>à partir de</span>
        <strong>790 € HT</strong>
        <small>hors taxes</small>
      </div>
      <ul>
        <li>Page d’accueil artistique</li>
        <li>Galerie photos / vidéos</li>
        <li>CV ou filmographie</li>
        <li>Page contact professionnelle</li>
        <li>SEO nom / métier</li>
        <li>Mise en ligne</li>
      </ul>
      <a class="btn btn-secondary" href="?page=intermittents" data-link>Découvrir l’offre</a>
    `;
    return article;
  }

  function injectIntermittentsOffer() {
    if (!isPricingRoute()) return;

    const grid = document.querySelector(".pricing-grid");
    if (!grid || document.getElementById(OFFER_ID)) return;

    ensureStyle();
    grid.classList.add("has-intermittents-offer");

    const cards = [...grid.querySelectorAll(".price-card")];
    const offer = createOfferCard();

    const siteVitrineCard = cards.find((card) =>
      card.textContent.toLowerCase().includes("site vitrine")
    );

    if (siteVitrineCard && siteVitrineCard.nextElementSibling) {
      grid.insertBefore(offer, siteVitrineCard.nextElementSibling);
    } else {
      grid.appendChild(offer);
    }
  }

  function scheduleInject() {
    window.requestAnimationFrame(injectIntermittentsOffer);
    window.setTimeout(injectIntermittentsOffer, 90);
    window.setTimeout(injectIntermittentsOffer, 240);
  }

  document.addEventListener("DOMContentLoaded", () => {
    scheduleInject();

    const app = document.getElementById("app");
    if (app) {
      const observer = new MutationObserver(scheduleInject);
      observer.observe(app, { childList: true, subtree: true });
    }
  });

  window.addEventListener("popstate", scheduleInject);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-link]");
    if (link) scheduleInject();
  }, true);
})();
