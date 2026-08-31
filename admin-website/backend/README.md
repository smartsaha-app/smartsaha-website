# SmartSaha Admin — Backend

API REST du panneau d'administration SmartSaha. Elle gère l'authentification, les articles de blog, le portfolio, les catégories et les utilisateurs, avec traduction automatique du contenu (FR → EN/MG) et stockage des images sur Cloudinary.

## 🛠 Stack technique

| Domaine | Technologies |
|---|---|
| Framework | [Express 5](https://expressjs.com/) |
| ORM / Base de données | [Sequelize](https://sequelize.org/) + [PostgreSQL](https://www.postgresql.org/) |
| Authentification | [JWT](https://jwt.io/) (`jsonwebtoken`) via cookie (`cookie-parser`) |
| Mots de passe | [bcrypt](https://www.npmjs.com/package/bcrypt) |
| Upload d'images | [Multer](https://www.npmjs.com/package/multer) + [Cloudinary](https://cloudinary.com/) (`multer-storage-cloudinary`) |
| Traduction automatique | `google-translate-api-x` / `google-translate-api-browser` |
| CORS | `cors` (origines multiples autorisées via variable d'environnement) |

## 📁 Structure du projet

```
backend/
├── config/          # Configuration Sequelize (connexion DB)
├── controllers/      # Logique métier (blog, portfolio, catégorie, user, traductions)
├── middleware/        # Middleware d'authentification (vérification JWT)
├── migrations/         # Migrations Sequelize (tables : users, categories, blogs, portfolios, blogtranslates, portfoliotranslates)
├── models/              # Modèles Sequelize (Blog, Blogtranslate, Category, Portfolio, Portfoliotranslate, User)
├── services/             # Services (upload Cloudinary/local, suppression fichiers, traduction)
├── utils/                 # Utilitaires (JWT)
├── router.js               # Déclaration de toutes les routes API
├── server.js                # Point d'entrée de l'application
└── .env.example              # Modèle des variables d'environnement
```

## ✅ Prérequis

- Node.js ≥ 18
- Une base de données PostgreSQL
- Un compte [Cloudinary](https://cloudinary.com/) (pour l'upload d'images)

## 🚀 Installation

```bash
cd admin-website/backend
npm install
```

## 🔑 Variables d'environnement

Copier `.env.example` vers `.env` et renseigner :

```env
# Environnement
NODE_ENV=                    # development ou production

# Port d'écoute de l'API
LISTEN_PORT=3001

# Base de données PostgreSQL
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
DB_DIALECT=                  # postgres

# Service d'upload
UPLOAD_SERVICE=              # ex. Local ou Cloudinary

# Origines autorisées (CORS), séparées par des virgules
CORS_ORIGIN_URL=

# Clé secrète JWT
JWT_SECRET=

# Configuration Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 🗄️ Base de données

Le projet utilise les migrations Sequelize :

```bash
npx sequelize-cli db:migrate
```

Modèles principaux :
- **User** — comptes de l'administration (`username`, `email`, `password` hashé)
- **Category** — catégories de blog
- **Blog** / **Blogtranslate** — articles et leurs traductions par langue
- **Portfolio** / **Portfoliotranslate** — projets du portfolio et leurs traductions par langue

## ▶️ Lancer le serveur

```bash
node server.js
```

L'API est alors disponible sur `http://localhost:<LISTEN_PORT>`, avec toutes les routes préfixées par `/api`.

## 📡 Routes principales

### Routes publiques (consommées par le site vitrine)

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/categories/list` | Liste des catégories |
| GET | `/api/blogs/list` | Liste des articles de blog |
| GET | `/api/blogs/:id` | Détail d'un article |
| GET | `/api/portfolios/list` | Liste des projets du portfolio |
| GET | `/api/portfolios/:id` | Détail d'un projet |
| PUT | `/api/forgot-password` | Mot de passe oublié |

### Authentification

| Méthode | Route | Description |
|---|---|---|
| POST | `/api/users/register` | Créer un compte administrateur |
| POST | `/api/users/login` | Connexion (émet le cookie JWT) |
| GET | `/api/users/profile` | Profil de l'utilisateur connecté 🔒 |
| PUT | `/api/users/profile/password` | Modification du mot de passe |
| POST | `/api/users/logout` | Déconnexion 🔒 |

### Routes protégées (🔒 authentification requise)

| Méthode | Route | Description |
|---|---|---|
| GET / POST | `/api/categories` | Lister / créer une catégorie |
| DELETE | `/api/categories/:id` | Supprimer une catégorie |
| GET / POST | `/api/blogs` | Lister / créer un article (avec image) |
| DELETE | `/api/blogs/:id` | Supprimer un article |
| GET / POST | `/api/portfolios` | Lister / créer un projet (image de couverture + galerie) |
| DELETE | `/api/portfolios/:id` | Supprimer un projet |

## 🔐 Sécurité

- Authentification par **JWT** transmis via un cookie httpOnly (vérifié par `middleware/authMiddleware.js`)
- **CORS** restreint aux origines listées dans `CORS_ORIGIN_URL` (plusieurs origines possibles, séparées par des virgules), avec `credentials: true` pour autoriser l'envoi de cookies cross-origin
- Mots de passe hashés avec **bcrypt**

## 🌍 Traduction automatique

Le service `services/translationService.js` traduit automatiquement le contenu saisi en français vers l'anglais et le malgache lors de la création d'un blog ou d'un projet de portfolio, via `google-translate-api-x`.

---

© SmartSaha — Tous droits réservés.