/* =========================================================
   NOCX WEB
   Navigation PJAX simulée + pages générées.
   Le site reste compatible avec des liens classiques :
   sans JS, les liens rechargent simplement index.html?page=...
   ========================================================= */

const CONTACT_ENDPOINT = "/api/sendContactEmail";

const routes = {
  home: {
    title: "Nocx Web | Sites premium, campus en ligne et portails privés",
    description: "Nocx Web crée des sites web professionnels, campus en ligne privés, plateformes e-learning sur mesure, portails clients et espaces membres.",
    render: () => `
      <section class="hero section">
        <div class="container hero-grid">
          <div class="hero-copy" data-reveal>
            <p class="eyebrow">Agence web · Campus privé · Portail client</p>
            <h1>Des sites web et campus en ligne conçus pour vendre, former et grandir.</h1>
            <p class="hero-lead">Nocx Web conçoit des sites premium, des espaces privés et des plateformes de formation sur mesure pour les entreprises, écoles, clubs et organismes qui veulent passer à un niveau supérieur.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="?page=campus" data-link>Découvrir les offres</a>
              <a class="btn btn-secondary" href="?page=contact" data-link>Demander un audit</a>
            </div>
            <div class="trust-row" aria-label="Points clés">
              <span>Design premium</span>
              <span>Architecture propre</span>
              <span>Expérience privée</span>
            </div>
          </div>

          ${dashboardVisual()}
        </div>
      </section>

      <section class="section-tight">
        <div class="container split-section">
          <div class="highlight-panel" data-reveal>
            <p class="kicker">Le problème</p>
            <h2>Vos contenus méritent mieux qu’un dossier Drive.</h2>
            <p>Beaucoup de structures possèdent déjà des cours, vidéos, PDF, ressources internes ou processus précieux. Le problème n’est pas le contenu : c’est l’expérience. Quand tout est dispersé entre mails, Drive, WhatsApp, PDF et liens vidéo, la valeur perçue chute.</p>
            <ul class="check-list">
              <li>Les apprenants cherchent les ressources au lieu d’apprendre.</li>
              <li>Les équipes perdent du temps à renvoyer les mêmes liens.</li>
              <li>L’image de marque ne reflète pas le niveau réel de l’offre.</li>
            </ul>
          </div>

          <div class="feature-grid">
            ${feature("Campus en ligne", "Un espace privé pour organiser vos cours, vidéos, documents, apprenants et suivis dans une interface à votre image.", "01")}
            ${feature("Sites vitrines premium", "Des sites web sur mesure, rapides et crédibles pour présenter vos services et générer des demandes qualifiées.", "02")}
            ${feature("Portails privés", "Un portail client ou espace membre pour centraliser documents, accès, ressources et tableaux de bord.", "03")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container campus-showcase">
          <div class="section-heading" data-reveal>
            <p class="kicker">Offre phare</p>
            <h2>Campus en ligne privé : votre plateforme, votre marque, votre méthode.</h2>
            <p>Ce n’est pas un simple site web. C’est un outil métier conçu pour rendre vos formations plus professionnelles, plus lisibles et plus faciles à vendre.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="?page=campus" data-link>Voir l’offre Campus</a>
              <a class="btn btn-secondary" href="?page=pricing" data-link>Voir les tarifs</a>
            </div>
          </div>
          ${campusMockup()}
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="section-heading center" data-reveal>
            <p class="kicker">Résultats attendus</p>
            <h2>Une expérience digitale plus claire augmente la valeur perçue.</h2>
            <p>Un campus en ligne aide vos utilisateurs à comprendre, progresser et revenir. Pour votre structure, il transforme vos contenus en actif digital durable.</p>
          </div>
          <div class="value-grid">
            ${valueCard("Image plus professionnelle", "Votre offre ressemble enfin à son niveau réel.")}
            ${valueCard("Organisation centralisée", "Cours, vidéos, PDF, accès et messages dans un seul espace.")}
            ${valueCard("Suivi plus lisible", "Vos apprenants avancent avec une progression claire.")}
            ${valueCard("Offre plus premium", "Une meilleure expérience permet de défendre un tarif plus élevé.")}
          </div>
        </div>
      </section>

      ${reassuranceSection()}

      <section class="section">
        <div class="container">
          <div class="cta-band" data-reveal>
            <h2>Vous avez déjà des formations, des vidéos ou des documents ?</h2>
            <p>Transformons-les en plateforme professionnelle. Nocx Web vous aide à structurer l’expérience, les accès, les parcours et la présentation de vos contenus.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="?page=contact" data-link>Demander un audit</a>
              <a class="btn btn-secondary" href="?page=method" data-link>Comprendre la méthode</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  campus: {
    title: "Campus en ligne privé | Plateforme e-learning sur mesure | Nocx Web",
    description: "Création de campus en ligne privés, espaces apprenants, plateformes e-learning sur mesure, cours, vidéos, documents et suivi de progression.",
    render: () => `
      ${pageHero("Campus en ligne privé", "Votre campus en ligne privé, à votre image.", "Une plateforme personnalisée pour centraliser vos cours, vidéos, documents, élèves, formateurs et suivis dans un espace clair, sécurisé et professionnel.", "Demander une démonstration", "contact")}

      <section class="section-tight">
        <div class="container campus-showcase">
          ${campusMockup()}
          <div class="section-heading" data-reveal>
            <p class="kicker">Outil métier</p>
            <h2>Ce n’est pas un simple site. C’est l’interface centrale de votre formation.</h2>
            <p>Vos élèves accèdent à leurs ressources depuis un espace clair, moderne et sécurisé. Vous gardez le contrôle sur les contenus, les accès, les rôles et l’expérience.</p>
            <ul class="check-list">
              <li>Une plateforme de formation privée alignée avec votre image.</li>
              <li>Une expérience apprenant plus fluide que des liens dispersés.</li>
              <li>Une base évolutive pour ajouter de nouvelles fonctionnalités.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading center" data-reveal>
            <p class="kicker">Fonctionnalités</p>
            <h2>Les briques essentielles d’un campus professionnel.</h2>
            <p>Chaque projet est adapté à votre structure. La version de départ peut rester simple, puis évoluer selon vos besoins réels.</p>
          </div>
          <div class="feature-list" data-reveal>
            ${[
              "Connexion élèves",
              "Espace apprenant",
              "Catalogue de cours",
              "Modules de formation",
              "Vidéos intégrées",
              "Documents téléchargeables",
              "Suivi de progression",
              "Tableau de bord professeur",
              "Tableau de bord administrateur",
              "Notifications",
              "Gamification",
              "Forum / Communauté",
              "Profils utilisateurs",
              "Accès sécurisés",
              "Design aux couleurs du client",
              "Architecture évolutive"
            ].map(item => `<span>${item}</span>`).join("")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="section-heading" data-reveal>
            <p class="kicker">Pour qui ?</p>
            <h2>Une solution adaptée aux structures qui veulent professionnaliser leur contenu.</h2>
          </div>
          <div class="use-grid">
            ${[
              ["Organismes de formation", "Centralisez les cours, documents, apprenants et suivis dans une interface privée."],
              ["Écoles privées", "Offrez un espace moderne pour vos élèves, équipes pédagogiques et ressources."],
              ["Clubs sportifs", "Structurez les contenus, séances, vidéos, programmes et accès membres."],
              ["Académies football", "Présentez vos parcours, modules, exercices et suivis comme une vraie plateforme."],
              ["Coachs professionnels", "Vendez une expérience de formation plus premium et mieux organisée."],
              ["Entreprises", "Déployez un espace de formation interne pour collaborateurs ou partenaires."]
            ].map(([title, text]) => useCard(title, text)).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading center" data-reveal>
            <p class="kicker">Avant / Après</p>
            <h2>Le même contenu. Une perception complètement différente.</h2>
          </div>
          <div class="compare-grid">
            <article class="compare-card before" data-reveal>
              <h3>Avant</h3>
              <ul class="check-list">
                <li>Liens dispersés entre Drive, WhatsApp et mails.</li>
                <li>PDF envoyés manuellement aux élèves.</li>
                <li>Vidéos non organisées et difficiles à retrouver.</li>
                <li>Aucun suivi clair de la progression.</li>
                <li>Image peu professionnelle malgré la qualité du contenu.</li>
              </ul>
            </article>
            <article class="compare-card after" data-reveal>
              <h3>Après</h3>
              <ul class="check-list">
                <li>Plateforme privée accessible depuis un espace dédié.</li>
                <li>Cours structurés par modules, niveaux ou parcours.</li>
                <li>Accès élèves, professeurs et administrateurs.</li>
                <li>Progression lisible et ressources centralisées.</li>
                <li>Expérience premium alignée avec votre marque.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container split-section">
          <div class="highlight-panel" data-reveal>
            <p class="kicker">Investissement</p>
            <h2>Pourquoi un campus justifie un budget plus élevé ?</h2>
            <p>Un campus en ligne n’est pas une dépense décorative. C’est un actif digital qui professionnalise votre formation, augmente la valeur perçue, centralise l’organisation et prépare l’évolution future de votre activité.</p>
          </div>
          <div class="grid-2">
            ${valueCard("Valeur perçue plus forte", "Une plateforme dédiée permet de présenter une formation comme une offre structurée, pas comme un dossier de fichiers.")}
            ${valueCard("Accompagnement plus clair", "Les apprenants savent où aller, quoi regarder et comment avancer.")}
            ${valueCard("Organisation durable", "Les contenus sont centralisés, versionnés et plus faciles à maintenir.")}
            ${valueCard("Marque renforcée", "L’interface devient un prolongement direct de votre identité.")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="cta-band" data-reveal>
            <h2>Construisons votre démonstration de campus en ligne.</h2>
            <p>Un audit permet d’identifier vos contenus, vos utilisateurs, vos accès, vos priorités et la première version réaliste à développer.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="?page=contact" data-link>Demander une démonstration de campus en ligne</a>
              <a class="btn btn-secondary" href="?page=pricing" data-link>Voir les offres Campus</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  sites: {
    title: "Site vitrine premium | Création site web professionnel | Nocx Web",
    description: "Création de sites vitrines premium, responsive, rapides, SEO, avec design sur mesure, formulaire, galerie et mise en ligne.",
    render: () => `
      ${pageHero("Sites vitrines premium", "Des sites vitrines modernes qui donnent envie de vous contacter.", "Nocx Web crée des sites rapides, beaux, responsive et adaptés à votre image pour transformer vos visiteurs en prospects qualifiés.", "Créer mon site vitrine", "contact")}

      <section class="section-tight">
        <div class="container split-section split-section-sites">
          <div class="highlight-panel highlight-panel-sites" data-reveal>
            <p class="kicker">Présence premium</p>
            <h2>Un site vitrine doit rassurer avant même le premier contact.</h2>
            <p>Un template générique peut exister. Un site premium doit vendre une impression : sérieux, clarté, niveau de service, confiance et cohérence avec votre marque.</p>
            <ul class="check-list">
              <li>Structure orientée conversion et prise de contact.</li>
              <li>Design mobile-first pensé pour les vrais usages.</li>
              <li>Contenus organisés pour expliquer rapidement votre valeur.</li>
            </ul>
            <div class="mini-proof-grid">
              <article class="mini-proof-card">
                <strong>Crédible</strong>
                <span>Une présence qui met votre niveau en face de vos tarifs.</span>
              </article>
              <article class="mini-proof-card">
                <strong>Lisible</strong>
                <span>Vos offres, preuves et contacts se comprennent en quelques secondes.</span>
              </article>
            </div>
          </div>
          <div class="feature-grid feature-grid-sites">
            ${[
              ["Design sur mesure", "Une interface adaptée à votre identité et à votre niveau de positionnement."],
              ["Responsive mobile", "Une expérience lisible et confortable sur smartphone, tablette et desktop."],
              ["SEO de base", "Structure, titres, descriptions et contenus pensés pour une indexation propre."],
              ["Pages services", "Des pages claires pour présenter vos offres, prestations et preuves."],
              ["Galerie & médias", "Des visuels intégrés proprement pour valoriser vos réalisations."],
              ["Formulaire & contact", "Des points de conversion visibles pour faciliter la demande de devis."]
            ].map(([title, text], i) => feature(title, text, String(i + 1).padStart(2, "0"))).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading center" data-reveal>
            <p class="kicker">Cibles</p>
            <h2>Pour les marques locales et structures qui veulent paraître au niveau.</h2>
            <p>Le bon site vitrine ne sert pas juste à exister. Il sert à rassurer, filtrer les bons prospects et rendre votre activité plus claire.</p>
          </div>
          <div class="use-grid">
            ${[
              ["Restaurants", "Menus, ambiance, réservation, avis et présentation haut de gamme."],
              ["Clubs sportifs", "Actualités, équipes, partenaires, résultats, inscriptions et identité."],
              ["Artisans", "Prestations, zones d’intervention, réalisations et demandes qualifiées."],
              ["Indépendants", "Positionnement clair, offres, preuves et contact rapide."],
              ["Commerces locaux", "Présence moderne pour générer confiance et visites."],
              ["Associations premium", "Image plus solide pour attirer membres, partenaires et sponsors."]
            ].map(([title, text]) => useCard(title, text)).join("")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="cta-band" data-reveal>
            <h2>Votre site doit travailler pour vous, pas juste être en ligne.</h2>
            <p>Créons une base commerciale claire, rapide, responsive, exportable et prête à évoluer.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="?page=contact" data-link>Créer mon site vitrine</a>
              <a class="btn btn-secondary" href="?page=pricing" data-link>Voir les tarifs</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  portals: {
    title: "Portail client et espace membre sur mesure | Nocx Web",
    description: "Création d’espaces privés, portails clients, espaces membres, dashboards, documents privés, accès par rôles et interfaces personnalisées.",
    render: () => `
      ${pageHero("Espaces privés / portails clients", "Un espace privé pour vos clients, membres ou collaborateurs.", "Centralisez documents, ressources, contenus privés, accès et tableaux de bord dans une interface personnalisée, claire et professionnelle.", "Parler de mon portail", "contact")}

      <section class="section-tight">
        <div class="container">
          <div class="section-heading center" data-reveal>
            <p class="kicker">Fonctionnalités</p>
            <h2>Un portail privé simplifie l’accès aux informations importantes.</h2>
          </div>
          <div class="feature-grid">
            ${[
              ["Connexion utilisateur", "Accès privé protégé pour clients, membres, élèves ou collaborateurs."],
              ["Documents privés", "Centralisation des ressources, contrats, PDF, médias et fichiers importants."],
              ["Ressources personnalisées", "Contenus visibles selon le profil, le rôle ou le niveau d’accès."],
              ["Tableau de bord", "Une vue claire des informations, statuts, étapes ou éléments clés."],
              ["Accès selon rôle", "Client, membre, admin, formateur ou équipe interne avec droits différenciés."],
              ["Administration simple", "Une base pensée pour rester utilisable par une petite équipe."]
            ].map(([title, text], i) => feature(title, text, String(i + 1).padStart(2, "0"))).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container split-section">
          <div class="highlight-panel" data-reveal>
            <p class="kicker">Exemples d’usage</p>
            <h2>Vos utilisateurs trouvent ce dont ils ont besoin, sans vous solliciter à chaque étape.</h2>
            <p>Le portail devient une porte d’entrée fiable pour accéder aux bons documents, suivre un projet, consulter des ressources ou rejoindre une expérience privée.</p>
          </div>
          <div class="grid-2">
            ${valueCard("Portail client", "Suivi de projet, documents, étapes, livrables et ressources centralisées.")}
            ${valueCard("Espace membre", "Accès premium, contenus exclusifs, club privé ou communauté fermée.")}
            ${valueCard("Ressources internes", "Documents d’équipe, procédures, formations et accès collaborateurs.")}
            ${valueCard("Formation interne", "Une base privée pour organiser les contenus destinés aux équipes.")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="cta-band" data-reveal>
            <h2>Vous voulez arrêter d’envoyer les mêmes fichiers à la main ?</h2>
            <p>Un portail client transforme les échanges récurrents en expérience propre, suivie et professionnelle.</p>
            <a class="btn btn-primary" href="?page=contact" data-link>Parler de mon projet</a>
          </div>
        </div>
      </section>
    `
  },

  method: {
    title: "Méthode Nocx Web | Audit, design, développement et mise en ligne",
    description: "Processus Nocx Web : audit, stratégie, design premium, développement, tests, mise en ligne et évolution.",
    render: () => `
      ${pageHero("Méthode", "Une méthode claire pour cadrer, construire et faire évoluer votre projet.", "Nocx Web accompagne les structures non techniques avec un processus lisible : besoin, structure, design, développement, tests, mise en ligne et évolution.", "Demander un audit", "contact")}

      <section class="section-tight">
        <div class="container">
          <div class="method-grid" data-reveal>
            ${[
              ["Audit et découverte", "Analyse de vos besoins, contenus, objectifs, utilisateurs et contraintes."],
              ["Structure et stratégie", "Définition de l’architecture, des pages, des accès et des parcours."],
              ["Design premium", "Création d’une direction artistique moderne et alignée avec votre marque."],
              ["Développement", "Construction d’une base propre, responsive, maintenable et évolutive."],
              ["Tests et corrections", "Vérification mobile, desktop, navigation, accès, formulaires et UX."],
              ["Mise en ligne", "Déploiement, configuration, accompagnement et prise en main."],
              ["Évolution", "Maintenance, améliorations et nouvelles fonctionnalités selon vos besoins."]
            ].map(([title, text], index) => `
              <article class="step-card">
                <span class="step-number">${index + 1}</span>
                <h3>${title}</h3>
                <p>${text}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container split-section">
          <div class="highlight-panel" data-reveal>
            <p class="kicker">Pourquoi commencer par un audit ?</p>
            <h2>Un bon projet se vend, se structure et se chiffre avant de se développer.</h2>
            <p>L’audit évite de partir dans une direction floue. Il permet de comprendre vos contenus, vos utilisateurs, vos priorités, les accès nécessaires, les risques et le budget réaliste.</p>
          </div>
          <div class="grid-2">
            ${valueCard("Cadrage clair", "Vous savez ce qui doit être créé maintenant et ce qui peut attendre.")}
            ${valueCard("Budget réaliste", "Le périmètre est aligné avec vos moyens, vos priorités et la valeur attendue.")}
            ${valueCard("Moins d’imprévus", "Les accès, rôles, contenus et parcours sont identifiés avant la production.")}
            ${valueCard("Évolution maîtrisée", "La première version devient une base solide, pas une impasse technique.")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="cta-band" data-reveal>
            <h2>Votre projet peut commencer petit et grandir proprement.</h2>
            <p>Une version Starter peut valider l’expérience, puis intégrer progressivement dashboards, notifications, rôles avancés, analytics ou automatisations.</p>
            <a class="btn btn-primary" href="?page=contact" data-link>Réserver un audit</a>
          </div>
        </div>
      </section>
    `
  },

  pricing: {
    title: "Tarifs Nocx Web | Audit, site vitrine, campus en ligne et projet sur mesure",
    description: "Tarifs Nocx Web à partir de 590 € HT : audit digital, site vitrine premium, portfolio intermittents, Campus Starter, Campus Pro et projet web sur mesure.",
    render: () => `
      ${pageHero("Tarifs", "Des offres pensées pour créer une vraie base commerciale, pas une coquille vide.", "Chaque projet est adapté à votre structure, vos contenus et vos objectifs. Les tarifs varient selon la complexité, les fonctionnalités et le niveau d’accompagnement souhaité.", "Parler de mon projet", "contact")}

      <section class="section-tight">
        <div class="container">
          <div class="pricing-grid">
            ${priceCard("Audit digital", "590\u202f€ HT", "à partir de", [
              "Analyse de votre besoin",
              "Recommandations",
              "Structure proposée",
              "Estimation budgétaire",
              "Plan d’action"
            ], "Réserver un audit", "contact")}

            ${priceCard("Site vitrine premium", "1\u202f490\u202f€ HT", "à partir de", [
              "Design responsive",
              "Pages essentielles",
              "SEO de base",
              "Formulaire",
              "Mise en ligne"
            ], "Créer mon site", "contact")}

            ${priceCard("Campus Starter", "4\u202f900\u202f€ HT", "à partir de", [
              "Espace privé",
              "Connexion utilisateurs",
              "Premiers modules de cours",
              "Interface personnalisée",
              "Mise en ligne",
              "Accompagnement"
            ], "Créer mon campus", "contact", true)}

            ${priceCard("Campus Pro", "12\u202f000\u202f€ HT", "à partir de", [
              "Rôles élèves / professeurs / administrateurs",
              "Suivi de progression",
              "Dashboard",
              "Notifications",
              "Cours structurés",
              "Sécurité renforcée",
              "Design avancé"
            ], "Demander une démo", "contact")}

            ${priceCard("Projet sur mesure", "Sur devis", "", [
              "Fonctionnalités avancées",
              "Automatisations",
              "Vidéo sécurisée",
              "Portail complet",
              "Chat",
              "Analytics",
              "Intégrations spécifiques"
            ], "Parler de mon projet", "contact")}
          </div>

          <div class="portfolio-offer-band" data-reveal>
            <div>
              <span class="price-badge portfolio-inline-badge">Créatifs & spectacle</span>
              <h2>Portfolio Intermittents</h2>
              <p>Une offre spécialisée pour comédiens, artistes, techniciens, modèles, musiciens et créatifs qui veulent un lien professionnel à envoyer aux castings, productions, agences ou partenaires.</p>
            </div>
            <div class="portfolio-offer-price">
              <small>à partir de</small>
              <strong>790 € HT</strong>
              <span>hors taxes</span>
            </div>
            <a class="btn btn-secondary" href="?page=intermittents" data-link>Découvrir l’offre</a>
          </div>

          <div class="section-tight">
            <div class="cta-band" data-reveal>
              <h2>Pourquoi un site premium coûte plus cher qu’un template ?</h2>
              <p>Parce qu’il ne s’agit pas seulement de poser des blocs. Il faut clarifier votre offre, structurer les parcours, adapter le design à votre marque, penser mobile, performance, SEO, conversion, évolutivité et maintenance.</p>
              <a class="btn btn-secondary" href="?page=method" data-link>Voir la méthode</a>
            </div>
          </div>
        </div>
      </section>
    `
  },


  intermittents: {
    title: "Portfolio Intermittents | Site portfolio artiste, acteur, modèle ou créatif",
    description: "Offre Portfolio Intermittents Nocx Web : site portfolio premium pour acteurs, actrices, modèles, artistes, musiciens, techniciens, créatifs et intermittents du spectacle.",
    render: () => `
      <div class="intermittents-page">
      ${pageHero("Portfolio Intermittents", "Un portfolio premium pour être vu, compris et contacté vite.", "Une offre pensée pour les acteurs, actrices, modèles, artistes, musiciens, techniciens, créatifs et intermittents du spectacle qui veulent un lien professionnel à envoyer aux castings, productions, agences ou partenaires.", "Demander ce portfolio", "contact")}

      <section class="section-tight">
        <div class="container intermittents-intro-grid">
          <div class="copy-block" data-reveal>
            <p class="kicker">Studio · casting · showreel</p>
            <h2>Plus vivant qu’un PDF, plus maîtrisé qu’un profil social.</h2>
            <p>Le but est simple : présenter votre univers en quelques secondes avec une photo forte, une bio courte, vos médias essentiels, un CV ou une filmographie, puis un contact clair. Pas une usine à gaz, mais une vitrine artistique propre, rapide et crédible.</p>
            <div class="bullet-stack">
              <div class="bullet-row"><span></span><p>Un lien unique à envoyer à une production, une agence, un casting, un client ou un partenaire.</p></div>
              <div class="bullet-row"><span></span><p>Une mise en scène visuelle pour vos photos, vidéos, showreel, bande démo, dates ou références.</p></div>
              <div class="bullet-row"><span></span><p>Une base courte et premium, évolutive si vous souhaitez ensuite ajouter plus de contenus.</p></div>
            </div>
            <div class="hero-actions">
              <a class="btn btn-primary" href="?page=contact" data-link>Créer mon portfolio</a>
              <a class="btn btn-secondary" href="?page=pricing" data-link>Voir les tarifs</a>
            </div>
          </div>

          ${intermittentsStageVisual()}
        </div>
      </section>

      <section class="section-tight">
        <div class="container split-section split-section-sites">
          <div class="highlight-panel portfolio-highlight" data-reveal>
            <span class="price-badge portfolio-inline-badge">Créatifs & spectacle</span>
            <h3>Portfolio Intermittents</h3>
            <div class="price">
              <small>à partir de</small>
              <strong>790 € HT</strong>
              <span>hors taxes</span>
            </div>
            <ul class="offer-checklist">
              <li>Page d’accueil artistique</li>
              <li>Galerie photos / vidéos</li>
              <li>Showreel ou bande démo</li>
              <li>Bio, CV, filmographie ou références</li>
              <li>Page contact professionnelle</li>
              <li>SEO de base sur nom et métier</li>
            </ul>
            <a class="btn btn-primary" href="?page=contact" data-link>Demander ce portfolio</a>
          </div>

          <div class="feature-grid feature-grid-sites">
            ${feature("Acteurs & actrices", "Profil casting, bande démo, photos, rôles, expériences, agent ou contact direct.", "01")}
            ${feature("Modèles & artistes", "Galerie visuelle, séries photo, univers artistique, réseaux et demandes professionnelles.", "02")}
            ${feature("Techniciens & créatifs", "CV clair, références, projets, compétences, bande démo ou sélection de réalisations.", "03")}
            ${feature("Musiciens & performers", "Showreel, extraits live, dates, clips, bio courte et contact booking.", "04")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="section-heading center" data-reveal>
            <p class="kicker">Contenu essentiel</p>
            <h2>Une page artistique complète, claire, rapide à parcourir.</h2>
            <p>Le site reste lisible, mais il raconte mieux votre profil qu’une fiche froide ou un PDF perdu en pièce jointe.</p>
          </div>
          <div class="grid-3">
            ${valueCard("Accueil artistique", "Photo principale, accroche, métier, ville, disponibilité, ambiance et informations clés.")}
            ${valueCard("Galerie & médias", "Photos, vidéos, extraits, showreel ou sélection de travaux présentés proprement sur mobile.")}
            ${valueCard("CV / filmographie", "Rôles, expériences, projets, compétences, collaborations ou références importantes.")}
            ${valueCard("Contact professionnel", "Un point de contact visible pour être joint par une production, un agent ou un client.")}
            ${valueCard("SEO de base", "Optimisation du nom, du métier et des informations principales pour améliorer la recherche Google.")}
            ${valueCard("Base évolutive", "La structure peut évoluer vers plus de pages, plus de médias ou des options privées.")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container dashboard-option-grid">
          <div class="copy-block" data-reveal>
            <p class="kicker">Option dashboard privé</p>
            <h2>Gérer ses contenus sans demander une refonte à chaque changement.</h2>
            <p>Selon le cadrage, on peut ajouter une brique privée simple pour mettre à jour certains contenus. L’idée n’est pas de promettre un CMS géant, mais un tableau de bord propre pour les besoins utiles.</p>
            <ul class="check-list">
              <li>Photos, vidéos, showreel et catégories de médias.</li>
              <li>Bio, CV, filmographie, références et actualités.</li>
              <li>Gestion pensée comme une option ou une brique incluse selon le budget.</li>
            </ul>
          </div>
          <div class="artist-dashboard-panel" data-reveal>
            <div class="artist-dashboard-top">
              <span>Dashboard privé</span>
              <strong>Contenus artiste</strong>
            </div>
            <div class="artist-dashboard-grid">
              <div><small>Photos</small><strong>24 médias</strong></div>
              <div><small>Vidéos</small><strong>5 extraits</strong></div>
              <div><small>Showreel</small><strong>À jour</strong></div>
              <div><small>Bio / CV</small><strong>Modifiable</strong></div>
            </div>
            <div class="artist-dashboard-lines"><span></span><span></span><span></span></div>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="compare-grid">
            <article class="compare-card" data-reveal>
              <p class="kicker">Pourquoi cette offre</p>
              <h3>Plus crédible qu’un simple profil social.</h3>
              <p>Un site portfolio centralise vos informations, vos médias et vos contacts. Il donne une impression plus professionnelle qu’un lien réseau social noyé dans le flux.</p>
            </article>
            <article class="compare-card" data-reveal>
              <p class="kicker">Positionnement</p>
              <h3>Entre carte de visite premium et mini-site artistique.</h3>
              <p>Le tarif démarre à 790 € HT pour éviter l’effet site low-cost, tout en restant adapté aux artistes qui veulent une base sérieuse et claire.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="cta-band" data-reveal>
            <h2>Vous voulez un portfolio plus crédible, plus élégant et plus facile à envoyer ?</h2>
            <p>On part de vos photos, vidéos, showreel, bio et références, puis on construit une vitrine artistique qui donne envie de vous contacter.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="?page=contact" data-link>Demander ce portfolio</a>
              <a class="btn btn-secondary" href="?page=pricing" data-link>Revenir aux tarifs</a>
            </div>
          </div>
        </div>
      </section>
      </div>
    `
  },

  faq: {
    title: "FAQ Nocx Web | Campus en ligne, site vitrine et portail privé",
    description: "Questions fréquentes sur les campus en ligne privés, sites vitrines premium, portails clients, design personnalisé, sécurité et mise en ligne.",
    render: () => `
      ${pageHero("FAQ", "Les réponses aux questions avant de cadrer votre projet.", "Campus en ligne, site vitrine premium, portail client, mise en ligne, sécurité et évolution : voici les bases à connaître avant de demander un audit.", "Demander un audit", "contact")}

      <section class="section-tight">
        <div class="container">
          <div class="faq-list" data-faq>
            ${[
              ["Est-ce que Nocx Web crée uniquement des sites vitrines ?", "Non. L’agence crée aussi des espaces privés, plateformes de formation, portails clients et interfaces sur mesure."],
              ["Qu’est-ce qu’un campus en ligne privé ?", "Un espace web personnalisé où vos apprenants ou membres peuvent se connecter, accéder aux cours, vidéos, documents et suivre leur progression."],
              ["Est-ce adapté aux petits organismes ?", "Oui. Le projet peut commencer avec une version simple, puis évoluer progressivement selon vos besoins, vos contenus et votre budget."],
              ["Est-ce que le design est personnalisé ?", "Oui. Chaque interface est adaptée à l’identité visuelle du client pour éviter l’effet template et renforcer la valeur perçue."],
              ["Puis-je commencer petit ?", "Oui. Il est possible de démarrer avec un Campus Starter puis d’ajouter des fonctionnalités comme le suivi avancé, les notifications, les rôles ou les dashboards."],
              ["Est-ce que vous gérez la mise en ligne ?", "Oui. Nocx Web accompagne la mise en ligne, les tests, les corrections et la prise en main."],
              ["Est-ce que la plateforme remplace Moodle ?", "Elle peut être une alternative plus personnalisée, plus simple et plus alignée avec votre image. Elle est conçue sur mesure selon vos besoins."],
              ["Est-ce que les contenus sont sécurisés ?", "Les accès peuvent être protégés par authentification et rôles utilisateurs. Pour les contenus vidéo très sensibles, des solutions spécifiques peuvent être étudiées."]
            ].map(([q, a], i) => faqItem(q, a, i)).join("")}
          </div>
        </div>
      </section>
    `
  },

  contact: {
    title: "Contact Nocx Web | Demander un audit ou une démonstration",
    description: "Contactez Nocx Web pour un audit, un site vitrine premium, un campus en ligne privé, une plateforme e-learning ou un portail client.",
    render: () => `
      ${pageHero("Contact", "Parlons de votre projet.", "Vous avez une formation, une école, un club, une entreprise ou une idée de plateforme ? Nocx Web vous aide à structurer une solution claire, premium et évolutive.", "", "")}

      <section class="section-tight">
        <div class="container contact-grid">
          <aside class="contact-panel" data-reveal>
            <p class="kicker">Qualification</p>
            <h2>Une demande claire permet une réponse plus précise.</h2>
            <p class="page-lead">Expliquez votre contexte, vos contenus existants, votre objectif et votre budget estimé. Nocx Web vous répond sous 24 à 48h ouvrées.</p>
            <div class="reassurance-stack">
              <div class="reassurance-item">
                <strong>Réponse sous 24 à 48h ouvrées</strong>
                <p>Vous recevez un premier retour pour valider le besoin, le niveau de priorité et la meilleure prochaine étape.</p>
              </div>
              <div class="reassurance-item">
                <strong>Approche progressive</strong>
                <p>Le projet peut commencer par un audit, une version Starter ou une base vitrine avant d’évoluer.</p>
              </div>
              <div class="reassurance-item">
                <strong>Pour petites et moyennes structures</strong>
                <p>Nocx Web est adapté aux organismes, clubs, écoles, indépendants et entreprises qui veulent une solution sérieuse sans usine à gaz.</p>
              </div>
            </div>
          </aside>

          <section class="contact-panel" data-reveal>
            <form class="contact-form" data-contact-form novalidate>
              <div class="form-status is-visible" data-form-status>Votre demande est prête.</div>

              <input type="hidden" name="formStartedAt" value="${Date.now()}" />
              <div class="form-field contact-honeypot" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden;pointer-events:none;">
                <label for="website">Site web</label>
                <input id="website" name="website" tabindex="-1" autocomplete="off" />
              </div>

              <div class="form-grid">
                <div class="form-field">
                  <label for="firstName">Prénom</label>
                  <input id="firstName" name="firstName" autocomplete="given-name" placeholder="Votre prénom" />
                </div>
                <div class="form-field">
                  <label for="lastName">Nom</label>
                  <input id="lastName" name="lastName" autocomplete="family-name" placeholder="Votre nom" />
                </div>
                <div class="form-field">
                  <label for="email">Email</label>
                  <input id="email" name="email" type="email" autocomplete="email" required placeholder="vous@email.fr" />
                </div>
                <div class="form-field">
                  <label for="phone">Téléphone</label>
                  <input id="phone" name="phone" autocomplete="tel" placeholder="Votre numéro" />
                </div>
                <div class="form-field full">
                  <label for="company">Société / profession</label>
                  <input id="company" name="company" autocomplete="organization" placeholder="Ex : organisme de formation, coach, club, restaurant..." />
                </div>
                <div class="form-field">
                  <label for="project">Type de projet</label>
                  <select id="project" name="project" required>
                    <option value="">Sélectionner</option>
                    <option>Campus en ligne</option>
                    <option>Site vitrine</option>
                    <option>Portfolio intermittent</option>
                    <option>Portail client</option>
                    <option>Projet sur mesure</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="budget">Budget estimé</label>
                  <select id="budget" name="budget" required>
                    <option value="">Sélectionner</option>
                    <option>Moins de 2 000 €</option>
                    <option>2 000 à 5 000 €</option>
                    <option>5 000 à 12 000 €</option>
                    <option>12 000 à 25 000 €</option>
                    <option>25 000 €+</option>
                  </select>
                </div>
                <div class="form-field full">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" required placeholder="Présentez votre structure, vos contenus existants, votre objectif et vos délais."></textarea>
                </div>
              </div>

              <button class="btn btn-primary" type="submit">Envoyer ma demande</button>
            </form>
          </section>
        </div>
      </section>
    `
  }
};

function dashboardVisual() {
  return `
    <div class="hero-visual" aria-label="Aperçu abstrait d’une interface de campus en ligne" data-reveal>
      <div class="dashboard-card main-dashboard">
        <div class="dash-top">
          <span></span><span></span><span></span>
        </div>
        <div class="dash-grid">
          <div class="course-card">
            <small>Module 01</small>
            <strong>Fondations</strong>
            <div class="progress"><i style="width:72%"></i></div>
          </div>
          <div class="metric-card">
            <small>Progression</small>
            <strong>78%</strong>
          </div>
          <div class="course-card wide">
            <small>Ressources</small>
            <strong>12 documents privés</strong>
            <div class="mini-list"><span></span><span></span><span></span></div>
          </div>
          <div class="metric-card neon">
            <small>Apprenants</small>
            <strong>146</strong>
          </div>
        </div>
      </div>
      <div class="floating-chip chip-one">Espace apprenant</div>
      <div class="floating-chip chip-two">Suivi centralisé</div>
    </div>
  `;
}

function intermittentsStageVisual() {
  return `
    <div class="intermittents-stage-card" aria-label="Aperçu d’un portfolio artistique" data-reveal>
      <div class="stage-light stage-light-a"></div>
      <div class="stage-light stage-light-b"></div>
      <div class="artist-main-card">
        <div class="artist-portrait"><span></span></div>
        <div>
          <small>Profil artiste</small>
          <strong>Nom · métier · ville</strong>
          <p>Bio courte, showreel, galerie et contact direct.</p>
        </div>
      </div>
      <div class="artist-media-card">
        <div class="media-card-top"><span>Galerie</span><strong>Photos · vidéos · scène</strong></div>
        <div class="artist-media-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      </div>
      <div class="showreel-pill"><span class="play"></span><div><small>Showreel</small><strong>01:42</strong></div></div>
      <div class="casting-chip chip-a">Casting</div>
      <div class="casting-chip chip-b">Portfolio privé</div>
    </div>
  `;
}

function campusMockup() {
  return `
    <div class="interface-panel" data-reveal>
      <div class="mock-sidebar-layout">
        <div class="mock-sidebar">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="mock-content">
          <div class="mock-header">
            <div class="mock-pill"></div>
            <div class="mock-pill"></div>
          </div>
          <div class="mock-main-grid">
            <div class="mock-widget large">
              <div class="mock-video"><span class="play"></span></div>
              <div class="mock-lines"><span></span><span></span><span></span></div>
            </div>
            <div class="mock-widget">
              <div class="metric-card neon">
                <small>Module complété</small>
                <strong>64%</strong>
              </div>
              <div class="mini-list" style="margin-top: 1rem;"><span></span><span></span><span></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function pageHero(kicker, title, lead, buttonLabel, buttonRoute) {
  const action = buttonLabel
    ? `<div class="hero-actions"><a class="btn btn-primary" href="?page=${buttonRoute}" data-link>${buttonLabel}</a><a class="btn btn-secondary" href="?page=pricing" data-link>Voir les tarifs</a></div>`
    : "";
  return `
    <section class="page-hero">
      <div class="container page-title" data-reveal>
        <p class="eyebrow">${kicker}</p>
        <h1>${title}</h1>
        <p class="page-lead">${lead}</p>
        ${action}
      </div>
    </section>
  `;
}

function feature(title, text, index) {
  return `
    <article class="feature-card" data-reveal>
      <div class="card-icon">${index}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function valueCard(title, text) {
  return `
    <article class="reassurance-card" data-reveal>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function useCard(title, text) {
  return `
    <article class="use-card" data-reveal>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function priceCard(title, amount, prefix, items, cta, route, featured = false) {
  return `
    <article class="price-card ${featured ? "featured" : ""}" data-reveal>
      ${featured ? `<span class="price-badge">Offre prioritaire</span>` : ``}
      <h3>${title}</h3>
      <div class="price">
        ${prefix ? `<small>${prefix}</small>` : ``}
        <strong>${amount}</strong>
        ${amount !== "Sur devis" ? `<span>hors taxes</span>` : ``}
      </div>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <a class="btn ${featured ? "btn-primary" : "btn-secondary"}" href="?page=${route}" data-link>${cta}</a>
    </article>
  `;
}

function faqItem(question, answer, index) {
  return `
    <article class="faq-item ${index === 0 ? "is-open" : ""}">
      <button class="faq-button" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${question}</span>
        <span aria-hidden="true">+</span>
      </button>
      <div class="faq-answer">
        <div><p>${answer}</p></div>
      </div>
    </article>
  `;
}

function reassuranceSection() {
  return `
    <section class="section-tight">
      <div class="container">
        <div class="section-heading center" data-reveal>
          <p class="kicker">Réassurance</p>
          <h2>Une base premium, mais pensée pour évoluer par étapes.</h2>
          <p>Nocx Web est adapté aux petites et moyennes structures qui veulent une solution sérieuse, progressive et compréhensible.</p>
        </div>
        <div class="grid-3">
          ${valueCard("Pourquoi investir ?", "Parce qu’une plateforme privée centralise l’expérience, réduit les échanges dispersés et renforce la valeur de votre offre.")}
          ${valueCard("Pourquoi un audit ?", "Parce qu’un bon cadrage évite les fonctionnalités inutiles, les angles morts et les budgets mal estimés.")}
          ${valueCard("Pourquoi par étapes ?", "Parce qu’une première version propre permet de lancer vite, apprendre, puis enrichir la plateforme sans repartir de zéro.")}
        </div>
      </div>
    </section>
  `;
}

const app = document.querySelector("#app");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const header = document.querySelector("[data-header]");
const yearNode = document.querySelector("[data-year]");
let currentPage = null;

function getPageFromUrl(url = window.location.href) {
  const parsedUrl = new URL(url, window.location.origin);
  const page = parsedUrl.searchParams.get("page") || "home";
  return routes[page] ? page : "home";
}

function buildUrl(page) {
  const url = new URL(window.location.href);
  if (page === "home") {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", page);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

function updateMeta(route) {
  document.title = route.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", route.description);
}

function setActiveNav(page) {
  document.querySelectorAll("[data-page]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.page === page);
  });
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
}

function initRevealAnimations() {
  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealNodes.forEach((node) => observer.observe(node));
}

function initFaq() {
  document.querySelectorAll(".faq-button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector("button[type='submit']");
  const startedAtInput = form.querySelector("input[name='formStartedAt']");

  const setStatus = (type, message) => {
    if (!status) return;
    status.className = `form-status is-visible is-${type}`;
    status.textContent = message;
  };

  const setLoading = (isLoading) => {
    if (submitButton) {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? "Envoi en cours…" : "Envoyer ma demande";
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = String(data.firstName || "").trim();
    const lastName = String(data.lastName || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();

    if (!firstName && !lastName) {
      setStatus("error", "Merci d’indiquer au moins votre prénom ou votre nom.");
      form.querySelector("#firstName")?.focus();
      return;
    }

    if (!email || !form.querySelector("#email")?.checkValidity()) {
      setStatus("error", "Merci d’indiquer une adresse email valide.");
      form.querySelector("#email")?.focus();
      return;
    }

    if (!message) {
      setStatus("error", "Merci d’ajouter un message.");
      form.querySelector("#message")?.focus();
      return;
    }

    setLoading(true);
    setStatus("loading", "Envoi en cours…");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          name: [firstName, lastName].filter(Boolean).join(" "),
          email,
          phone: String(data.phone || "").trim(),
          company: String(data.company || "").trim(),
          project: String(data.project || "").trim(),
          budget: String(data.budget || "").trim(),
          message,
          website: String(data.website || "").trim(),
          formStartedAt: Number(data.formStartedAt || 0)
        })
      });

      if (!response.ok) throw new Error("CONTACT_SEND_FAILED");

      form.reset();
      if (startedAtInput) startedAtInput.value = String(Date.now());
      setStatus("success", "Votre message a bien été envoyé.");
    } catch (error) {
      setStatus("error", "L’envoi est momentanément indisponible. Merci de réessayer ou de nous écrire directement.");
    } finally {
      setLoading(false);
    }
  });
}

function scrollToTopIfNeeded() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, 0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPage(page, options = {}) {
  const route = routes[page] || routes.home;
  if (!app || currentPage === page && !options.force) return;

  currentPage = page;
  updateMeta(route);
  setActiveNav(page);
  closeMenu();

  app.classList.add("page-exit");

  window.setTimeout(() => {
    app.innerHTML = route.render();
    app.classList.remove("page-exit");
    app.classList.add("page-enter");

    initRevealAnimations();
    initFaq();
    initContactForm();

    if (!options.skipScroll) scrollToTopIfNeeded();

    window.setTimeout(() => app.classList.remove("page-enter"), 460);
  }, 160);
}

function navigateTo(page) {
  const route = routes[page] ? page : "home";
  const nextUrl = buildUrl(route);
  window.history.pushState({ page: route }, "", nextUrl);
  renderPage(route);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || link.target === "_blank") return;

  const url = new URL(href, window.location.href);
  const page = url.searchParams.get("page") || "home";

  if (!routes[page]) return;

  event.preventDefault();
  navigateTo(page);
});

window.addEventListener("popstate", () => {
  renderPage(getPageFromUrl(), { skipScroll: false });
});

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (yearNode) yearNode.textContent = new Date().getFullYear();

renderPage(getPageFromUrl(), { force: true, skipScroll: true });
