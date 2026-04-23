// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],
  css: ['@/assets/css/main.css'],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  site: {
    url: 'https://sales.smart-saha.com',
    name: 'SmartSaha'
  },

  sitemap: {
    gzip: true,
    autoI18n: true,
    siteUrl: 'https://www.smart-saha.com',
    urls: [
      '/',
      '/'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }
  }
  
})
