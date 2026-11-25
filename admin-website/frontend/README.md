# SmartSaha Admin — Frontend

Interface web du panneau d'administration SmartSaha, permettant de gérer visuellement le blog, le portfolio, la boîte à plaintes et les paramètres du compte, en consommant l'[API backend](../backend/README.md).

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
│   ├── complaints/                 # Boîte à plaintes (plaintes, tâches, développeurs)
│   ├── settings/                   # Paramètres du compte
│   ├── middleware.ts                # Protection des routes authentifiées
│   └── layout.tsx                    # Layout global
├── components/
│   └── Header.tsx                     # En-tête de l'interface d'administration
├── context/
│   └── AuthContext.tsx                 # Contexte React de gestion de session
├── lib/
│   ├── api.ts                           # Client Axios centralisé (intercepteurs JWT / 401)
│   └── complaints.ts                     # Types et calcul du statut des plaintes
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
| `/complaints` | Boîte à plaintes : suivi des plaintes, tâches et développeurs 🔒 |
| `/settings` | Paramètres du compte 🔒 |

🔒 = route protégée par `middleware.ts`

## 📮 Boîte à plaintes

La page `/complaints` permet de :

- lister les plaintes reçues, avec filtres par statut (Toutes / Nouvelles / En cours / Résolues) et recherche ;
- ouvrir une plainte pour voir sa description et ses tâches ;
- ajouter, supprimer des tâches, changer leur statut (`Non commencée`, `En cours`, `Terminée`) et le développeur assigné ;
- gérer la liste des développeurs (bouton **Développeurs**) ;
- créer une plainte manuellement (bouton **Nouvelle plainte**) ;
- supprimer une plainte (ses tâches sont supprimées avec elle).

### Statut d'une plainte

Le statut n'est pas stocké en base : il est calculé à partir des tâches dans `lib/complaints.ts` (`getComplaintStatus`).

| Statut | Règle |
|---|---|
| **Nouvelle** | Aucune tâche, ou aucune tâche commencée |
| **En cours** | Au moins une tâche commencée ou terminée, mais pas toutes terminées |
| **Résolue** | Au moins une tâche, et **toutes** les tâches sont terminées |

Le **tableau de bord** affiche ces mêmes compteurs (Total, Nouvelles, En cours, Résolues) dans la section « Boîte à plaintes », calculés avec la même fonction.

## 🔐 Authentification

- La session est gérée via un **cookie JWT** émis par le backend lors de la connexion (`AuthContext.tsx` centralise la logique de login/logout/session).
- `middleware.ts` protège les routes `/dashboard`, `/blogs`, `/portfolios`, `/complaints` et `/settings` : sans cookie de session valide, l'utilisateur est redirigé vers la page de connexion (avec conservation de l'URL cible via `callbackUrl`).
- `lib/api.ts` configure un client Axios avec `withCredentials: true` (envoi des cookies cross-origin) et intercepte les réponses `401` pour déconnecter automatiquement l'utilisateur.

---

© SmartSaha — Tous droits réservés.