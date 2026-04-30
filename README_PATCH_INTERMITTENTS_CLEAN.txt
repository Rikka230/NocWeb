Patch Nocx Web - Offre Intermittents propre

Base utilisée : ZIP fourni par Tony.
Fichiers à remplacer :
- index.html
- script.js
- style.css
- sitemap.xml

Important :
- pricing-extra.js n'est plus utilisé.
- Si le fichier pricing-extra.js reste sur GitHub, ce n'est pas grave tant que index.html ne le charge plus.
- Le formulaire Brevo / Firebase est conservé.
- Les corrections de pricing sont conservées : badge prioritaire au-dessus, prix centrés, HT sur la même ligne, boutons centrés, halo parasite supprimé.

Déploiement :
git checkout main
git pull origin main
firebase deploy --only hosting
