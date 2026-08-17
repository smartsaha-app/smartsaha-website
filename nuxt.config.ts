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

  // Configuration du site (utilisée par Sitemap, Robots et SchemaOrg)
  site: {
    url: 'https://smart-saha.com',
    name: 'SmartSaha',
    description: 'SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses in Madagascar and Africa.',
    defaultLocale: 'en',
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
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: undefined },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: undefined },
      { code: 'mg', language: 'mg-MG', name: 'Malagasy', file: undefined }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  // Configuration Sitemap
  sitemap: {
    autoI18n: true,
    cacheMaxAgeSeconds: 3600,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    }
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
        'https://share.google/xF5gkcyYn6EsR5cPA'
      ],
    },
  },
  runtimeConfig : {
    public: {
      apiBase:''
    }
  }
})