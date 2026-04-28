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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useLanguageStore } from "~/stores/language";
import Lenis from "lenis";
const languageStore = useLanguageStore();
const route = useRoute();
const canonicalUrl = computed(() => `https://smart-saha.com${route.path}`);

const showBackToTop = ref(false);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Initialize Lenis
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

useHead({
  htmlAttrs: { 
    lang: languageStore.lang
  },
  link: [
    { rel: "canonical", href: canonicalUrl },
    { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" },
    { rel: "stylesheet", href: "https://cdn.boxicons.com/fonts/basic/boxicons.min.css" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" }
  ],
  script: [
    { type: "module", src: "https://cdn.jsdelivr.net/npm/emoji-picker-element@1/index.js" }
  ]
});

useSeoMeta({
  title: "SmartSaha",
  titleTemplate: "%s | SmartSaha",
  description: "SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses.",
  keywords: "SmartSaha, agriculture, agritech, digital agriculture, smart farming, data agriculture, tantsaha, Madagascar, innovation, MRV, precision agriculture",
  author: "SmartSaha Team",
  
  // Open Graph
  ogTitle: "SmartSaha - Grow the Future of Agriculture",
  ogDescription: "Digital platform transforming agriculture through smart technology and data-driven insights.",
  ogType: "website",
  ogUrl: "https://platform.smart-saha.com",
  ogImage: "/logo.png",
  ogLocale: languageStore.lang,

  // Twitter
  twitterCard: "summary_large_image",
  twitterTitle: "SmartSaha",
  twitterDescription: "SmartSaha is a digital platform transforming agriculture through smart technology.",
  twitterImage: "/logo.png",
});
</script>

<style>
/* Global styles can stay here or in main.css */
</style>
