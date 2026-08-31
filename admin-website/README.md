# SmartSaha — Panneau d'Administration

Panneau d'administration du site web SmartSaha, permettant de gérer le contenu dynamique affiché sur [www.smart-saha.com](https://www.smart-saha.com) : articles de blog, portfolio de réalisations, catégories et utilisateurs.

Ce dossier regroupe **deux applications distinctes** qui fonctionnent ensemble :

```
admin-website/
├── backend/    # API REST (Express + Sequelize + PostgreSQL)
└── frontend/   # Interface d'administration (Next.js)
```

## 📋 Sommaire

- [Vue d'ensemble](#-vue-densemble)
- [Sous-projets](#-sous-projets)
- [Démarrage rapide](#-démarrage-rapide)
- [Authentification](#-authentification)
- [Liens utiles](#-liens-utiles)

## 🧭 Vue d'ensemble

Le panneau d'administration permet à l'équipe SmartSaha de :

- Rédiger et publier des **articles de blog** (avec traductions FR/EN/MG)
- Gérer les **catégories** de contenu
- Ajouter et gérer les projets du **portfolio** (image de couverture + galerie)
- Gérer les **comptes utilisateurs** ayant accès à l'administration

Le contenu créé ici est ensuite consommé par le site public via des routes API publiques (`/api/blogs/list`, `/api/portfolios/list`, etc.).

## 📦 Sous-projets

| Sous-projet | Stack | Documentation |
|---|---|---|
| [`backend/`](./backend) | Express 5, Sequelize, PostgreSQL, JWT, Cloudinary | [backend/README.md](./backend/README.md) |
| [`frontend/`](./frontend) | Next.js 16, React 19, TypeScript, Tailwind CSS 4 | [frontend/README.md](./frontend/README.md) |

## 🚀 Démarrage rapide

Les deux sous-projets doivent être lancés en parallèle (deux terminaux) :

```bash
# 1. Backend (API) — voir backend/README.md pour la configuration complète
cd admin-website/backend
npm install
npm run dev   # ou node server.js selon la configuration

# 2. Frontend (interface d'administration)
cd admin-website/frontend
npm install
npm run dev
```

Par défaut :
- Le **backend** écoute sur le port défini par `LISTEN_PORT` (ex. `3001`)
- Le **frontend** écoute sur `http://localhost:3000`

⚠️ Le frontend doit être configuré avec `NEXT_PUBLIC_API_URL` pointant vers l'URL du backend (voir [frontend/README.md](./frontend/README.md)).

## 🔐 Authentification

L'authentification repose sur un **JWT stocké dans un cookie httpOnly**, transmis via des requêtes cross-origin (`credentials: true` côté frontend et backend). Le backend vérifie ce cookie via un middleware d'authentification sur toutes les routes protégées (gestion des blogs, portfolios, catégories, utilisateurs).

## 🔗 Liens utiles

- Site public : [www.smart-saha.com](https://www.smart-saha.com)
- Dépôt complet : [smartsaha-website](https://github.com/smartsaha-app/smartsaha-website)

---

© SmartSaha — Tous droits réservés.