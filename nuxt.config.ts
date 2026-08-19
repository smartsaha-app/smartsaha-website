// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],

  // Configuration du site (utilisée par Sitemap, Robots, SchemaOrg et i18n hreflang)
  site: {
    url: 'https://smart-saha.com',
    name: 'SmartSaha',
    description: 'SmartSaha est une plateforme numérique qui transforme l\'agriculture grâce à la technologie intelligente, l\'analyse de données et des outils innovants dédiés aux producteurs, coopératives et agro-entreprises à Madagascar et en Afrique.',
    defaultLocale: 'fr',
    logo: 'https://smart-saha.com/logo.png',
    twitter: '@smartsaha',
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  css: ['@/assets/css/main.css'],

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  // Configuration i18n
  i18n: {
    baseUrl: 'https://www.smart-saha.com',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json', flag: '/flags/fr.png' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', flag: '/flags/en.png' },
      { code: 'mg', language: 'mg-MG', name: 'Malagasy', file: 'mg.json', flag: '/flags/mg.png' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'fr',
    },
  },

  // Configuration Sitemap
  sitemap: {
    autoI18n: true,
    cacheMaxAgeSeconds: 3600,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
  },

  // Configuration Robots.txt
  robots: {
    disallow: ['/api/'],
    allow: ['/_nuxt/', '/'],
    // Le sitemap est ajouté automatiquement par Nuxt SEO
  },

  // Configuration Schema.org (Microdonnées Google)
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'SmartSaha',
      url: 'https://smart-saha.com',
      logo: 'https://smart-saha.com/logo.png',
      sameAs: [
        'https://www.facebook.com/share/1EHaGKpfnD/',
        'https://share.google/xF5gkcyYn6EsR5cPA',
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
})