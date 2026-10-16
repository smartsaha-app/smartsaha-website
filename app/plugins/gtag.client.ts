// Google Analytics 4 : suivi des visites du site (DEV-12)
export default defineNuxtPlugin(() => {
  const GA_ID = 'G-HRJM0RZ594' // ID de mesure GA4 (public)

  // Ne pas compter les visites en local
  if (window.location.hostname === 'localhost') return

  useHead({
    script: [{ src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true }],
  })

  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.gtag = function () { w.dataLayer.push(arguments) }
  w.gtag('js', new Date())
  w.gtag('config', GA_ID)
})