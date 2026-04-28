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
    description: 'SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools.',
    defaultLocale: 'en',
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'fr', iso: 'fr-FR', name: 'Français' },
      { code: 'mg', iso: 'mg-MG', name: 'Malagasy' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix', // Since they seem to use a custom switcher
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
    identity: 'Organization',
  }
})
