<template>
  <section id="services" class="relative py-24 bg-white dark:bg-[#0b1a1f] px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Decorative background -->
    <div class="absolute top-1/2 left-0 w-72 h-72 bg-[#10b481]/5 rounded-full blur-3xl -translate-y-1/2 -ml-36"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header
      <div class="text-center mb-20" data-aos="fade-up">
        <h5 class="uppercase text-sm tracking-[0.2em] text-[#10b481] font-bold mb-4">
          Solutions for Future
        </h5>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-6">
          {{ t("ourService") }}
        </h2>
        <div class="w-24 h-1 bg-[#10b481] mx-auto rounded-full mb-8"></div>
        <p class="text-lg text-gray-500 font-inter leading-relaxed max-w-2xl mx-auto">
          {{ t("serviceText") }}
        </p>
      </div> -->

      <!-- Section Header Modernisé (Style Badge & Gradient) -->
    <div class="text-center mb-16 md:mb-20 relative" data-aos="fade-up">
      <!-- Badge Modernisé -->
      <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-6 border border-[#10b481]/20 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
        Solutions for Future
      </span>

      <!-- Titre avec effet de style / dégradé sombre -->
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight max-w-3xl mx-auto mb-6 tracking-tight">
        {{ t("ourService") }}
      </h2>

      <!-- Description modernisée avec accent discret -->
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-inter leading-relaxed max-w-2xl mx-auto font-normal">
        {{ t("serviceText") }}
      </p>
    </div>

<!-- Services Grid Uniformisé (4 Cards - Grid 2x2) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  
  <!-- Card 1 : Precision Agriculture -->
  <div 
    class="group relative p-8 rounded-3xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 hover:border-[#10b481]/50 hover:bg-white dark:hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
    data-aos="fade-up"
  >
    <div>
      <div class="w-14 h-14 rounded-2xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300">
        <i class="fas fa-seedling"></i>
      </div>
      <h3 class="text-xl font-manropeSemi text-[#112830] dark:text-white mb-3 group-hover:text-[#10b481] transition-colors">
        {{ t("precisonAgriculture") }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed mb-6">
        {{ t("servicePaText") }}
      </p>
    </div>
    
    <button 
      @click="scrollTo('precision')"
      class="inline-flex items-center gap-2 text-xs font-bold text-[#10b481] uppercase tracking-wider group-hover:gap-3 transition-all"
    >
      <span>{{ t("learnMore") }}</span>
      <i class="bx bx-right-arrow-alt text-lg"></i>
    </button>
  </div>

  <!-- Card 2 : Agribusiness Tools -->
  <div 
    class="group relative p-8 rounded-3xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 hover:border-[#10b481]/50 hover:bg-white dark:hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <div>
      <div class="w-14 h-14 rounded-2xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300">
        <i class="fas fa-tools"></i>
      </div>
      <h3 class="text-xl font-manropeSemi text-[#112830] dark:text-white mb-3 group-hover:text-[#10b481] transition-colors">
        {{ t("agribusiness") }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed mb-6">
        {{ t("agriText") }}
      </p>
    </div>
    
    <button 
      @click="scrollTo('mrv')"
      class="inline-flex items-center gap-2 text-xs font-bold text-[#10b481] uppercase tracking-wider group-hover:gap-3 transition-all"
    >
      <span>{{ t("learnMore") }}</span>
      <i class="bx bx-right-arrow-alt text-lg"></i>
    </button>
  </div>

  <!-- Card 3 : M.R.V System -->
  <div 
    class="group relative p-8 rounded-3xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 hover:border-[#10b481]/50 hover:bg-white dark:hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <div>
      <div class="w-14 h-14 rounded-2xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300">
        <i class="fas fa-chart-line"></i>
      </div>
      <h3 class="text-xl font-manropeSemi text-[#112830] dark:text-white mb-3 group-hover:text-[#10b481] transition-colors">
        {{ t("mrv") }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed mb-6">
        {{ t("mrvText") }}
      </p>
    </div>
    
    <button 
      @click="scrollTo('mrv')"
      class="inline-flex items-center gap-2 text-xs font-bold text-[#10b481] uppercase tracking-wider group-hover:gap-3 transition-all"
    >
      <span>{{ t("learnMore") }}</span>
      <i class="bx bx-right-arrow-alt text-lg"></i>
    </button>
  </div>

  <!-- Card 4 : Sequora Platform -->
  <div 
    class="group relative p-8 rounded-3xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 hover:border-[#10b481]/50 hover:bg-white dark:hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
    data-aos="fade-up"
    data-aos-delay="250"
  >
    <div>
      <div class="w-14 h-14 rounded-2xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300">
        <i class="fas fa-satellite"></i>
      </div>
      <h3 class="text-xl font-manropeSemi text-[#112830] dark:text-white mb-3 group-hover:text-[#10b481] transition-colors">
        {{ t("sequora") }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed mb-6">
        {{ t("sequoraText") }}
      </p>
    </div>
    
    <a 
      href="https://www.smart-saha.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 text-xs font-bold text-[#10b481] uppercase tracking-wider group-hover:gap-3 transition-all"
    >
      <span>{{ t("learnMore") }}</span>
      <i class="bx bx-right-arrow-alt text-lg"></i>
    </a>
  </div>

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
  position: relative;
  overflow: hidden;
}
</style>