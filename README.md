# AlloLaverie — site vitrine

Site statique pur (HTML/CSS + 10 lignes de JS), zéro build, zéro dépendance externe au runtime.
Hébergement : GitHub Pages + domaine `allolaverie.fr`.

## Avant la mise en ligne — placeholders à remplacer

Numéro de démo actuel : **09 74 99 12 34** (standard de test). Pour le remplacer par le numéro définitif :
`grep -rl "tel:+33974991234"` (liens) et `grep -rl "09 74 99 12 34"` (affichage + llms.txt).

| Quoi | Où | Comment trouver |
|------|-----|-----------------|
| Story fondateur | `index.html` section preuve | `[PRÉNOM]`, `[VILLE]`, `[MOIS]`, photo, vrai transcript |
| Mentions légales | `mentions-legales/index.html` | raison sociale, SIREN, adresse, directeur de publication |
| OG image | `assets/img/og-image.png` | déjà générée (1200×630) — pour la refaire : ouvrir `assets/img/og-template.html` dans Chrome à 1200×630 et capturer |

Vérification rapide qu'il ne reste rien : `grep -rn "À FOURNIR\|À COMPLÉTER\|XXX\|XX XX" --include="*.html" .`

## Formulaire (FormSubmit, sans backend)

Le formulaire poste vers `https://formsubmit.co/aravinthan.krishnakumar@gmail.com`.

1. **Activation** : au premier envoi (fais un test toi-même), FormSubmit envoie un mail de confirmation à cette adresse. Clique le lien — les envois suivants arrivent directement.
2. **Anti-spam** : après activation, FormSubmit fournit une chaîne aléatoire (alias) à utiliser à la place de l'e-mail dans l'attribut `action`. Fais le remplacement pour ne pas exposer le gmail aux robots spammeurs.
3. Redirection après envoi : `/merci/` (champ `_next`).

## Déploiement GitHub Pages

1. Créer le repo public `allolaverie` sur ton compte, puis :
   `git remote add origin git@github.com:<username>/allolaverie.git && git push -u origin main`
2. Sur GitHub : Settings → Pages → Source : « Deploy from a branch » → `main` / `/ (root)`.
3. Le fichier `CNAME` (contient `allolaverie.fr`) est déjà dans le repo.
4. Chez le registrar du domaine :
   - 4 enregistrements `A` sur `@` : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 `CNAME` sur `www` : `<username>.github.io.`
5. Settings → Pages → Custom domain : `allolaverie.fr` → attendre la vérification DNS → cocher **Enforce HTTPS**.
6. Vérifier : `dig allolaverie.fr +short` doit renvoyer les 4 IP.

## SEO / GEO — après la mise en ligne

1. **Google Search Console** : ajouter la propriété `allolaverie.fr` (vérification DNS), soumettre `sitemap.xml`.
2. **Bing Webmaster Tools** : idem — crucial, c'est l'index utilisé par ChatGPT.
3. `robots.txt` autorise explicitement les crawlers IA (GPTBot, ClaudeBot, PerplexityBot…) ; `llms.txt` résume le produit pour eux. Ne pas les supprimer.
4. Rituel mensuel : demander à ChatGPT/Claude/Perplexity « quel standard téléphonique pour une laverie automatique ? » et noter si AlloLaverie est cité.
5. Backlinks : poster les guides (`/guide/...`) dans les groupes Facebook d'exploitants, profil LinkedIn, annuaires pro.

## Maintenance

- Modifier un texte = éditer le HTML, commit, push. GitHub Pages redéploie en ~1 min.
- Le site fonctionne sans JavaScript ; la seule fonction JS est la barre d'appel collante mobile.
- Portabilité : tout le site est ce dossier. Netlify/Cloudflare Pages peuvent le servir tel quel si besoin de quitter GitHub Pages.
- Budget poids : chaque page < 100 Ko hors images (police 38 Ko incluse). Si tu ajoutes des images : format WebP, max ~150 Ko chacune.
