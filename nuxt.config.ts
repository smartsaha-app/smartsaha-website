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
  colorMode: {
    classSuffix: '',
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },
  css: ['@/assets/css/main.css'],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  site: {
    url: 'https://smart-saha.com',
    name: 'SmartSaha',
    description: 'SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses in Madagascar and Africa.',
    defaultLocale: 'en',
    logo: 'https://smart-saha.com/logo.png',
    twitter: '@smartsaha',
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'mg', language: 'mg-MG', name: 'Malagasy' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },

  sitemap: {
    strictNuxtContentAds: true,
    autoI18n: true,
    cacheMaxAgeSeconds: 3600,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  },

  robots: {
    disallow: ['/api/'],
    allow: ['/_nuxt/', '/'],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'SmartSaha',
      logo: 'https://smart-saha.com/logo.png',
      sameAs: ['https://www.facebook.com/share/1EHaGKpfnD/'],
    },
  }
})
