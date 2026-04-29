# Nocx Web - Site premium statique

Livrable :
- `index.html`
- `style.css`
- `script.js`

## Test local
Ouvre `index.html` directement dans un navigateur.

## Navigation
Le site utilise une logique app-shell / PJAX simulée :
- Header et footer restent stables.
- `<main id="app">` est remplacé dynamiquement.
- Les liens internes utilisent `?page=...`.
- L’URL est mise à jour avec History API.
- Fallback : sans JavaScript, le contenu principal de l’accueil et un bloc de secours restent lisibles.

## À personnaliser
Dans `script.js`, remplace :
`contact@nocx-web.fr`
par l’adresse email réelle.
