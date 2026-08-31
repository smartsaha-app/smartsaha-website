# SmartSaha — Site Web Officiel

Site web officiel de **SmartSaha**, plateforme AgTech malgache dédiée à l'agriculture de précision, à la mesure/reporting/vérification (MRV) carbone et à la digitalisation agricole à Madagascar.

🔗 Production : [www.smart-saha.com](https://www.smart-saha.com)

## 📋 Sommaire

- [À propos](#-à-propos)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Variables d'environnement](#-variables-denvironnement)
- [Scripts disponibles](#-scripts-disponibles)
- [Internationalisation (i18n)](#-internationalisation-i18n)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)

## 🌱 À propos

Ce dépôt contient le site vitrine de SmartSaha ainsi que le panneau d'administration associé. Le site présente les services de la plateforme (agriculture de précision, services agricoles, **Sequora** — service de MRV carbone bleu par satellite), un blog et un portfolio multilingues, ainsi qu'un formulaire de contact.

Le contenu est disponible en trois langues : **français, anglais et malgache**.

## 🛠 Stack technique

| Domaine | Technologies |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com/) / [Vue 3](https://vuejs.org/) |
| State management | [Pinia](https://pinia.vuejs.org/) |
| Style | [Tailwind CSS](https://tailwindcss.com/) |
| i18n | [@nuxtjs/i18n](https://i18n.nuxtjs.org/) (v10) |
| SEO | [@nuxtjs/sitemap](https://nuxtseo.com/sitemap), [@nuxtjs/robots](https://nuxtseo.com/robots), [nuxt-schema-org](https://nuxtseo.com/schema-org) |
| Graphiques | [Chart.js](https://www.chartjs.org/) / vue-chartjs |
| Emailing | [EmailJS](https://www.emailjs.com/), [Resend](https://resend.com/), [Nodemailer](https://nodemailer.com/) |
| Animations | [Lenis](https://lenis.darkroom.engineering/) (scroll fluide) |
| Composants UI | [Headless UI](https://headlessui.com/) |

## 📁 Structure du projet

```
smartsaha-website/
├── admin-website/     # Panneau d'administration
├── app/                # Application Nuxt (pages, composants, layouts)
├── i18n/locales/       # Fichiers de traduction (fr.json, en.json, mg.json)
├── public/             # Assets statiques
├── server/api/         # Routes API serveur Nuxt (ex. formulaire de contact)
├── nuxt.config.ts       # Configuration Nuxt
├── tailwind.config.ts   # Configuration Tailwind
└── .env.example         # Modèle des variables d'environnement
```

## ✅ Prérequis

- Node.js ≥ 18
- npm

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/smartsaha-app/smartsaha-website.git
cd smartsaha-website

# Installer les dépendances
npm install
```

## 🔑 Variables d'environnement

Copier `.env.example` vers `.env` et renseigner les valeurs :

```env
# Clé de l'API RESEND (envoi d'e-mails via le formulaire de contact)
RESEND_API_KEY=

# URL de l'API Backend (API métier consommée par le site)
NUXT_PUBLIC_API_BASE=
```

## 📜 Scripts disponibles

```bash
# Démarrer le serveur de développement (http://localhost:3000)
npm run dev
```

## 🌍 Internationalisation (i18n)

Le site est traduit en **français (fr)**, **anglais (en)** et **malgache (mg)** via `@nuxtjs/i18n`. Les clés de traduction se trouvent dans `i18n/locales/*.json`. Le routage localisé utilise `localePath()` pour générer les URLs adaptées à chaque langue.

## ☁️ Déploiement

Le site est déployé sur [Railway](https://railway.com/) en production sur **www.smart-saha.com**.

---

© SmartSaha — Tous droits réservés.