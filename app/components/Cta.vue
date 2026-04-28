<template>
  <section id="cta" class="relative py-24 px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Premium Mesh Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#10b481] to-[#112830] dark:from-[#0e946f] dark:to-black"></div>
    
    <!-- Decorative Mesh/Glass Elements -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#112830]/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

    <div class="relative max-w-5xl mx-auto text-center z-10">
      <div class="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20" data-aos="fade-down">
        <span class="text-white text-xs uppercase tracking-[0.2em] font-bold">Ready to transform</span>
      </div>

      <h2 class="text-4xl md:text-6xl font-manropeExtra text-white mb-8 leading-tight" data-aos="fade-up">
        {{ t('ctaTitle') }}
      </h2>

      <p class="text-white/80 text-lg md:text-xl font-inter max-w-3xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
        {{ t('ctaText') }}
      </p>

      <div class="flex flex-col sm:flex-row justify-center items-center gap-6" data-aos="zoom-in" data-aos-delay="200">
        <a 
          href="https://app.smart-saha.com/" 
          target="_blank" 
          class="w-full sm:w-auto"
        >
          <button class="w-full sm:w-auto bg-white text-[#112830] px-12 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:-translate-y-1.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 group">
            {{ t('getStarted') }}
          </button>
        </a>

        <button 
          @click="scrollTo('contact')" 
          class="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#10b481] hover:border-white transition-all duration-300 active:scale-95"
        >
          {{ t('contact') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
section {
  /* Ensure a smooth transition with neighboring sections */
  margin-top: -1px;
}
</style>
