# UZOCAM EMPIRE – Site Web Officiel

Site web haut de gamme pour **UZOCAM EMPIRE** (Froid, Climatisation & Équipements Professionnels – Yaoundé).

## Contenu

- Hero section conversion-oriented
- Section cinématique scroll-driven (séquence d’images pilotée par le scroll)
- Services (Froid/Clim, Machines à glace, Shawarma, Lave-linge, Incubateurs, Pièces)
- Catalogue produits filtrable avec photos réelles
- À propos + contact (WhatsApp, téléphone, email, formulaire)
- SEO local + données structurées Schema.org
- Responsive (mobile / tablette / desktop)
- Accessibilité (skip-link, focus, prefers-reduced-motion)

## Comment ouvrir

Ouvrir simplement le fichier `index.html` dans un navigateur moderne,  
ou servir le dossier via un serveur local :

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Coordonnées intégrées

- Adresse : À 100 m de la station Tradex, Tsinga Elobi, Yaoundé
- Tél : 677 00 54 90 / 694 35 27 29 / 655 94 72 27
- Email : gloryuzomaglory45@gmail.com
- Horaires : 7h – 19h (tous les jours)

## Notes techniques

- Stack : HTML5 + CSS3 + JavaScript vanilla (aucune dépendance lourde)
- Animation : Canvas + image sequence synchronisée au scroll
- Formulaire : redirige vers WhatsApp avec le message pré-rempli
- Pour remplacer la séquence d’animation : modifier le tableau `sequenceSources` dans `assets/js/main.js`

## Prochaines améliorations possibles

- Ajouter une vraie séquence 3D (frames haute résolution) dans `assets/images/sequence/`
- Intégrer un backend pour le formulaire (Formspree, Netlify Forms, etc.)
- Ajouter Google Maps embed
- Optimiser les images en WebP
