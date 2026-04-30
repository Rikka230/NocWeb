Patch Nocx Web - Offre Intermittents V2

Fichiers inclus :
- index.html
- script.js
- style.css

Contenu du patch :
- intégration propre de l'offre "Portfolio Intermittents" dans la grille Tarifs sans casser les tailles existantes ;
- badge harmonisé avec le badge "Offre prioritaire" ;
- ajout d'une page dédiée ?page=intermittents pour expliquer l'offre ;
- lien footer vers l'offre Portfolio Intermittents ;
- mise à jour du JSON-LD OfferCatalog.

Déploiement après remplacement des fichiers :
1) git pull origin main
2) copier les fichiers du patch dans le projet local
3) firebase deploy --only hosting
