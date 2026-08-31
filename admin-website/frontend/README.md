# SmartSaha Admin — Frontend

Interface web du panneau d'administration SmartSaha, permettant de gérer visuellement le blog, le portfolio et les paramètres du compte, en consommant l'[API backend](../backend/README.md).

## 🛠 Stack technique

| Domaine | Technologies |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Style | [Tailwind CSS 4](https://tailwindcss.com/) |
| Icônes | [lucide-react](https://lucide.dev/) |
| Requêtes HTTP | [Axios](https://axios-http.com/) (avec cookies cross-origin) |

## 📁 Structure du projet

```
frontend/
├── app/
│   ├── page.tsx              # Page de connexion (route racine)
│   ├── register/              # Création de compte administrateur
│   ├── forgot-password/        # Récupération de mot de passe
│   ├── dashboard/               # Tableau de bord
│   ├── blogs/                    # Gestion des articles de blog
│   ├── portfolios/                # Gestion des projets du portfolio
│   ├── settings/                   # Paramètres du compte
│   ├── middleware.ts                # Protection des routes authentifiées
│   └── layout.tsx                    # Layout global
├── components/
│   └── Header.tsx                     # En-tête de l'interface d'administration
├── context/
│   └── AuthContext.tsx                 # Contexte React de gestion de session
├── lib/
│   └── api.ts                           # Client Axios centralisé (intercepteurs JWT / 401)
└── public/                               # Assets statiques (logo, images)
```

## ✅ Prérequis

- Node.js ≥ 18
- Le [backend](../backend/README.md) doit être démarré et accessible

## 🚀 Installation

```bash
cd admin-website/frontend
npm install
```

## 🔑 Variables d'environnement

Créer un fichier `.env.local` à la racine du dossier `frontend/` :

```env
# URL de l'API backend
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

> Sans cette variable, le client utilise par défaut `http://localhost:5000/api`.

## ▶️ Développement

```bash
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

## 📦 Scripts disponibles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build de production
npm run start    # Démarrer le serveur en mode production
npm run lint      # Analyser le code avec ESLint
```

## 🖥️ Pages principales

| Route | Description |
|---|---|
| `/` | Connexion (login) |
| `/register` | Création d'un compte administrateur |
| `/forgot-password` | Récupération de mot de passe |
| `/dashboard` | Tableau de bord principal 🔒 |
| `/blogs` | Gestion des articles de blog 🔒 |
| `/portfolios` | Gestion des projets du portfolio 🔒 |
| `/settings` | Paramètres du compte 🔒 |

🔒 = route protégée par `middleware.ts`

## 🔐 Authentification

- La session est gérée via un **cookie JWT** émis par le backend lors de la connexion (`AuthContext.tsx` centralise la logique de login/logout/session).
- `middleware.ts` protège les routes `/dashboard`, `/blogs`, `/portfolios` et `/settings` : sans cookie de session valide, l'utilisateur est redirigé vers la page de connexion (avec conservation de l'URL cible via `callbackUrl`).
- `lib/api.ts` configure un client Axios avec `withCredentials: true` (envoi des cookies cross-origin) et intercepte les réponses `401` pour déconnecter automatiquement l'utilisateur.

---

© SmartSaha — Tous droits réservés.