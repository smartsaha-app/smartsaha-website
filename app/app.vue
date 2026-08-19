<template>
  <div class="min-h-screen bg-white dark:bg-[#0c1d23] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useLanguageStore } from "~/stores/language";

const languageStore = useLanguageStore();
const { locale } = useI18n();

// Synchronisation réactive de la langue URL vers le store
watch(
  locale,
  (newLocale) => {
    if (newLocale) {
      languageStore.setLang(newLocale);
    }
  },
  { immediate: true }
);

// Configuration i18n pour le Head (Gestion automatique des balises canonical & hreflang)
const i18nHead = useLocaleHead({
  addSeoAttributes: true // Ajoute automatiquement lang/dir à <html>
});

// Configuration Globale du Head (Polices, Icônes, Web App Manifest)
useHead(
  computed(() => ({
    htmlAttrs: {
      ...i18nHead.value.htmlAttrs,  // lang + dir gérés par i18n directement
    },
    link: [
      ...(i18nHead.value.link || []),
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/icon.png" },
      { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" },
    ],
    meta: [
      ...(i18nHead.value.meta || []),
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#112830" },
    ],
  }))
);

// Métadonnées SEO Globales Fallback (si une sous-page oublie de définir ses infos)
useSeoMeta({
  titleTemplate: "%s | SmartSaha",
  defaultTitle: "SmartSaha - AgTech et Digitalisation Agricole à Madagascar",
  siteName: "SmartSaha",
  author: "SmartSaha Team",
  ogType: "website",
  ogSiteName: "SmartSaha",
  ogImage: "https://www.smart-saha.com/dashboard.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: "summary_large_image",
  twitterImage: "https://www.smart-saha.com/dashboard.png",
  // Empêche le duplicate content si des paramètres d'URL sont ajoutés
  robots: "index, follow",
});
</script>

<style>
/* Reset de base et transitions d'état fluides entre les pages */
html {
  scroll-behavior: auto; /* Scroll natif classique pour une vraie structure multi-pages */
}

/* Transitions de pages Nuxt (rend la navigation très fluide tout en restant multi-page) */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>