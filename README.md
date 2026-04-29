# Nocx Web - Guide de travail et déploiement

Site statique premium pour **Nocx Web**.

Fichiers principaux :

- `index.html`
- `style.css`
- `script.js`
- `firebase.json`
- `robots.txt`
- `sitemap.xml`
- `favicon.svg`
- `site.webmanifest`

---

## Règle officielle du projet

La branche **`main`** sur GitHub est la source officielle.

Quand une modification est faite manuellement via GitHub, ZIP ou upload de fichier, il faut toujours :

1. envoyer les fichiers sur GitHub dans `main` ;
2. vérifier que le commit est bien passé ;
3. rapatrier `main` en local ;
4. déployer Firebase Hosting.

Ne pas déployer depuis un dossier local qui n’a pas récupéré le dernier `main`.

---

## Commande officielle avant chaque déploiement

Depuis le dossier local du projet :

```bash
git checkout main
git pull origin main
firebase deploy --only hosting
```

Si Git bloque à cause de `.firebaserc` modifié localement :

```bash
git restore .firebaserc
git checkout main
git pull origin main
firebase deploy --only hosting
```

---

## Workflow avec upload manuel GitHub

Quand un fichier est modifié manuellement :

1. Aller sur GitHub.
2. Vérifier que la branche sélectionnée est bien `main`.
3. Remplacer le fichier concerné, par exemple `style.css`.
4. Cliquer sur **Commit changes**.
5. Vérifier qu’un nouveau commit apparaît sur `main`.
6. En local, lancer :

```bash
git checkout main
git pull origin main
firebase deploy --only hosting
```

---

## Cache mobile et CSS

Si le site est bon sur desktop ou dans l’inspecteur mobile Chrome, mais pas sur téléphone, le problème vient souvent du cache du téléphone.

Symptômes possibles :

- le téléphone garde une ancienne version de `style.css` ;
- les corrections responsive ne s’affichent pas ;
- Firebase est bien déployé, mais le mobile affiche encore l’ancien rendu.

Test rapide sur téléphone :

```txt
https://nocxweb.fr/?page=sites&v=2
```

ou sur l’URL Firebase :

```txt
https://nocx-web.web.app/?page=sites&v=2
```

Le paramètre `?v=2` force souvent le navigateur à recharger la page.

Autre test utile : ouvrir le site en navigation privée sur téléphone.

---

## Vider le cache sur mobile

### Android / Chrome

```txt
Chrome > ⋮ > Paramètres > Paramètres du site > Données stockées
```

Chercher :

```txt
nocxweb.fr
```

Puis supprimer les données du site.

### iPhone / Safari

```txt
Réglages > Safari > Avancé > Données de sites
```

Chercher :

```txt
nocxweb.fr
```

Puis supprimer les données du site.

---

## Versionner CSS et JS si le cache bloque

Si les téléphones gardent trop longtemps les anciens fichiers, modifier `index.html` en ajoutant une version aux assets.

Exemple :

```html
<link rel="stylesheet" href="style.css?v=20260429-2" />
<script src="script.js?v=20260429-2" defer></script>
```

À chaque gros changement, augmenter la version :

```txt
v=20260429-3
v=20260430-1
v=20260430-2
```

---

## Cache Firebase pendant le développement

Pendant les phases de modifications fréquentes, éviter un cache long sur `style.css` et `script.js`.

Dans `firebase.json`, préférer :

```json
{
  "source": "**/*.@(css|js)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "no-cache, max-age=0, must-revalidate"
    }
  ]
}
```

Quand le site est finalisé, on peut remettre un cache long, mais seulement si les fichiers CSS/JS sont bien versionnés.

---

## Navigation du site

Le site utilise une logique app-shell / PJAX simulée :

- Header et footer restent stables.
- `<main id="app">` est remplacé dynamiquement.
- Les liens internes utilisent `?page=...`.
- L’URL est mise à jour avec History API.
- Fallback : sans JavaScript, le contenu principal de l’accueil et un bloc de secours restent lisibles.

---

## Contact formulaire

Le formulaire utilise un `mailto` dans `script.js`.

Adresse actuellement configurée :

```txt
Viard.antony83@gmail.com
```
