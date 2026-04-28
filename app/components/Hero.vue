<template>
  <section
    class="relative bg-cover bg-center bg-white/65 pt-16 sm:pt-20"
    style="background-image: url('/bg-hero.jpeg')"
  >
    <!-- Deep Premium Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#10b481]/50 transition-colors duration-300"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-start gap-6"
    >
      <div class="hidden lg:flex flex-col items-center gap-6 mr-1" data-aos="fade-right">
        <div class="flex flex-col gap-4">
          <a href="https://share.google/xF5gkcyYn6EsR5cPA" class="text-white hover:text-[#10b481] transition transform hover:scale-110"
            ><i class="bx bxl-linkedin text-2xl"></i
          ></a>
          <a href="https://www.facebook.com/share/1EHaGKpfnD/" class="text-white hover:text-[#10b481] transition transform hover:scale-110"
            ><i class="bx bxl-facebook text-2xl"></i
          ></a>
        </div>
        <div class="w-px h-24 bg-white/70 mb-10"></div>
        <span class="text-white tracking-widest -rotate-90 small-medium text-sm">{{
          t("followUs")
        }}</span>
      </div>

      <div class="flex-1 flex flex-col justify-center gap-2 text-white z-10" data-aos="fade-up" data-aos-delay="100">
        <h5 class="rounded-full w-max bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-5 py-2 uppercase text-xs tracking-[0.2em] font-bold text-white">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          {{ t("titleHero") }}
        </h5>
        
        <h1
          class="text-hero text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          {{ t("accrocheHero") }}
        </h1>
        <p class="text-gray-200 small max-w-xl text-lg">
          {{ t("heroText") }}
        </p>
        <button
          @click="scrollTo('about')"
          class="inline-flex items-center w-max gap-3 border-2 border-white bg-white text-[#112830] px-8 py-3 rounded-full transition-all duration-300 mt-6 font-semibold group shadow-lg"
        >
          {{ t("learnMore") }}
          <i class="bxr bx-arrow-right-stroke text-2xl group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>

      <div
        class="flex-1 flex justify-end z-10 mt-24 sm:mt-1 lg:mt-auto sm:mr-4 lg:mr-12"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <!-- Ultra-Stylized Isometric Card -->
        <div class="relative perspective-1000 group max-w-sm w-full">
          <!-- Animated Background Blobs -->
          <div class="absolute -top-10 -left-10 w-40 h-40 bg-[#10b481] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>

          <!-- The Card itself -->
          <div class="relative bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform-gpu transition-all duration-700 ease-out group-hover:rotate-x-6 group-hover:rotate-y-12 group-hover:scale-105 group-hover:shadow-[0_80px_150px_-30px_rgba(16,180,129,0.3)]">
            
            <!-- Glass Shine Reflection -->
            <div class="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
              <div class="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full group-hover:translate-y-full transition-all duration-1000 ease-in-out"></div>
            </div>

            <!-- Header Badge -->
            <div class="flex justify-between items-start mb-10">
              <div class="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 ring-4 ring-[#10b481]/20">
                <img class="h-10 w-auto" src="/store.png" alt="Marketplace" />
              </div>
              <div class="px-4 py-1.5 rounded-full bg-[#10b481] text-white text-[10px] font-bold uppercase tracking-tighter flex items-center gap-2 shadow-lg shadow-[#10b481]/40">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Active Store
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-6">
              <h3 class="text-3xl font-manropeExtra text-white leading-tight tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                {{ t("marketplace") }}
                <span class="block h-1 w-12 bg-[#10b481] mt-2 rounded-full group-hover:w-20 transition-all duration-500"></span>
              </h3>
              
              <p class="text-gray-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {{ t("marketplaceText") }}
              </p>
            </div>

            <!-- Modern Interactive Button -->
            <a 
              href="https://sales.smart-saha.com" 
              target="_blank" 
              class="mt-10 group/btn relative inline-flex w-full items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-[#10b481] rounded-2xl overflow-hidden hover:bg-[#0e946f] active:scale-95 shadow-xl shadow-[#10b481]/20 hover:shadow-[#10b481]/40"
            >
              <span class="absolute inset-0 w-full h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-shimmer"></span>
              <span class="relative z-10 flex items-center gap-2">
                {{ t("joinUs") }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 z-10 mb-20"
    >
      <div
        class="bg-white/90 dark:bg-[#112830]/90 backdrop-blur-sm rounded-3xl shadow-xl flex flex-col lg:flex-row p-5 gap-6 hover-card transition-colors duration-300"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div
          class="lg:w-1/2 min-h-[200px] rounded-2xl bg-center bg-cover shadow-inner"
          style="background-image: url('/precision-agriculture.jpg')"
        ></div>

        <div class="lg:w-1/2 flex flex-col justify-between py-2">
          <div>
            <h4 class="text-2xl subtitle text-[#10b481] uppercase mb-4 font-bold">
              {{ t("precisonAgriculture") }}
            </h4>
            <p class="content text-gray-600 dark:text-gray-300">
              {{ t("precisionText") }}
            </p>
          </div>

          <a href="https://app.smart-saha.com" target="_blank" class="inline-flex items-center w-max gap-3 btn-primary mt-6 group">
            {{ t("learnMore") }}
            <i class="bxr bx-arrow-right-stroke group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>

      <div
        class="bg-white/90 dark:bg-[#112830]/90 backdrop-blur-sm rounded-3xl shadow-xl flex flex-col lg:flex-row p-5 gap-6 hover-card transition-colors duration-300"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div class="lg:w-1/2 flex flex-col justify-between py-2">
          <div>
            <h4 class="text-2xl subtitle text-gray-800 dark:text-white uppercase mb-4 font-bold">
              {{ t("evaluation") }}
            </h4>
            <p class="content text-gray-600 dark:text-gray-300">
              {{ t("evolutionText") }}
            </p>
          </div>

          <button @click="scrollTo('mrv')" class="inline-flex items-center w-max gap-3 btn-primary mt-6 group bg-gray-100 text-[#112830]">
            {{ t("explore") }}
            <i class="bxr bx-arrow-right-stroke group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
        <div
          class="lg:w-1/2 min-h-[200px] rounded-2xl bg-center bg-cover shadow-inner"
          style="background-image: url('monitoring.jpeg')"
        ></div>
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

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.float-animation {
  animation: float 4s ease-in-out infinite;
}
</style>
