<template>
  <NuxtLayout>
    <NuxtPage />
    <button 
      v-if="showBackToTop" 
      @click="scrollToTop"
      class="fixed bottom-4 right-4 z-40 bg-[#10b481] text-white p-2 rounded-lg shadow-lg hover:bg-[#0e946f] transition-all duration-300 transform hover:scale-110 active:scale-95"
      aria-label="Back to Top"
    >
      <i class="bx bx-chevron-up text-2xl"></i>
    </button>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useLanguageStore } from "~/stores/language";
import Lenis from "lenis";

const languageStore = useLanguageStore();
const { locale } = useI18n();

// Sync URL locale → custom translate system (enables SSR-aware language detection)
watch(locale, (newLocale) => {
  languageStore.setLang(newLocale);
}, { immediate: true });

const showBackToTop = ref(false);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const lenis = new Lenis();
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const seoContent = {
  en: {
    title: "SmartSaha - Digital Agriculture & Smart Farming Platform",
    description: "SmartSaha empowers smallholder farmers with AI, predictive weather, and geospatial insights for sustainable agriculture in Madagascar and Africa.",
    ogTitle: "SmartSaha - Transforming Agriculture with AI & Data",
    ogDescription: "Join the digital revolution in agriculture. SmartSaha provides smart tools for farmers, agribusinesses, and cooperatives.",
    keywords: "SmartSaha, agriculture, agritech, digital agriculture, smart farming, tantsaha, Madagascar, MRV, precision agriculture, AI farming",
  },
  fr: {
    title: "SmartSaha - Plateforme d'Agriculture Digitale et Intelligente",
    description: "SmartSaha accompagne les petits agriculteurs avec l'IA, les prévisions météo et les données géospatiales pour une agriculture durable à Madagascar.",
    ogTitle: "SmartSaha - Transformer l'Agriculture avec l'IA et les Données",
    ogDescription: "Rejoignez la révolution digitale agricole. SmartSaha fournit des outils intelligents aux agriculteurs, agribusinesses et coopératives.",
    keywords: "SmartSaha, agriculture, agritech, agriculture digitale, agriculture intelligente, tantsaha, Madagascar, MRV, agriculture de précision",
  },
  mg: {
    title: "SmartSaha - Sehatra Nomerika ho an'ny Fambolena",
    description: "SmartSaha dia manampy tantsaha amin'ny alalan'ny AI, teknika sy data mba hanatsara ny fambolena eto Madagasikara.",
    ogTitle: "SmartSaha - Fanavaozana ny Fambolena amin'ny AI",
    ogDescription: "Midira amin'ny revolisiona nomerika. SmartSaha dia manome fitaovana ho an'ny tantsaha sy orinasa.",
    keywords: "SmartSaha, fambolena, agritech, fambolena nomerika, tantsaha, Madagasikara, MRV, fambolena marani-tsaina",
  },
} as const;

type Lang = keyof typeof seoContent;
const getSeo = (key: keyof typeof seoContent.en): string => {
  const lang: Lang = (languageStore.lang as Lang) in seoContent ? (languageStore.lang as Lang) : "en";
  return seoContent[lang][key];
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SmartSaha",
  url: "https://smart-saha.com",
  logo: {
    "@type": "ImageObject",
    url: "https://smart-saha.com/logo.png",
    width: 512,
    height: 512,
  },
  description: "SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses in Madagascar and Africa.",
  foundingLocation: { "@type": "Place", addressCountry: "MG", name: "Madagascar" },
  areaServed: ["Madagascar", "Africa"],
  sameAs: ["https://www.facebook.com/share/1EHaGKpfnD/"],
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "smartsahaapp@gmail.com" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://smart-saha.com",
  name: "SmartSaha",
  description: "Digital platform transforming agriculture through smart technology and data-driven insights.",
  inLanguage: ["en", "fr", "mg"],
};

// hreflang + html[lang] — auto-generated from URL locale
const i18nHead = useLocaleHead();
useHead(computed(() => ({
  htmlAttrs: { lang: locale.value },
  link: (i18nHead.value.link || []) as any[],
  meta: (i18nHead.value.meta || []) as any[],
})));

// Static CSS + JSON-LD (fonts now self-hosted via @font-face in main.css)
useHead({
  link: [
    { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" },
  ],
  script: [
    { type: "module", src: "https://cdn.jsdelivr.net/npm/emoji-picker-element@1/index.js" },
    { type: "application/ld+json", innerHTML: JSON.stringify(organizationSchema) },
    { type: "application/ld+json", innerHTML: JSON.stringify(websiteSchema) },
  ],
});

// Reactive SEO meta per language (ogImage uses dashboard for better social preview)
useSeoMeta({
  titleTemplate: "%s | SmartSaha",
  title: () => getSeo("title"),
  description: () => getSeo("description"),
  keywords: () => getSeo("keywords"),
  author: "SmartSaha Team",
  ogTitle: () => getSeo("ogTitle"),
  ogDescription: () => getSeo("ogDescription"),
  ogType: "website",
  ogUrl: "https://smart-saha.com",
  ogImage: "https://smart-saha.com/dashboard.png",
  twitterCard: "summary_large_image",
  twitterTitle: () => getSeo("ogTitle"),
  twitterDescription: () => getSeo("ogDescription"),
  twitterImage: "https://smart-saha.com/dashboard.png",
});
</script>

<style>
/* Global styles can stay here or in main.css */
</style>
