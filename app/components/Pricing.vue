<template>
  <section id="pricing" class="relative py-24 overflow-hidden bg-white dark:bg-[#112830]">
    <!-- Background Decoration -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#10b481]/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
        <h2 class="text-[#10b481] font-bold tracking-widest uppercase text-sm mb-3">
          {{ t("pricing") }}
        </h2>
        <h3 class="text-4xl sm:text-5xl font-manropeExtra text-gray-900 dark:text-white mb-6 leading-tight">
          {{ t("pricingTitle") }}
        </h3>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ t("pricingSubtitle") }}
        </p>
      </div>

      <!-- Pricing Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <!-- Starter Plan -->
        <div 
          class="relative group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="mb-8">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t("starter") }}</h4>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-manropeExtra text-[#10b481]">{{ t("starterPrice") }}</span>
            </div>
          </div>

          <ul class="space-y-4 mb-10 flex-grow">
            <li v-for="(feature, index) in t('starterFeatures')" :key="index" class="flex items-start gap-3 text-gray-600 dark:text-gray-300">
              <i class="bx bx-check-circle text-[#10b481] text-xl mt-0.5"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <button @click="scrollTo('contact')" class="w-full py-4 px-6 rounded-2xl border-2 border-[#10b481] text-[#10b481] font-bold hover:bg-[#10b481] hover:text-white transition-all duration-300">
            {{ t("choosePlan") }}
          </button>
        </div>

        <!-- Pro Plan (Featured) -->
        <div 
          class="relative group p-8 rounded-[2.5rem] bg-white dark:bg-[#10b481]/10 border-2 border-[#10b481] transition-all duration-500 shadow-xl shadow-[#10b481]/10 hover:shadow-2xl hover:shadow-[#10b481]/20 hover:-translate-y-2 flex flex-col z-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <!-- Badge -->
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#10b481] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider">
            Most Popular
          </div>

          <div class="mb-8">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t("pro") }}</h4>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-manropeExtra text-[#10b481]">{{ t("proPrice") }}</span>
              <span class="text-gray-500 dark:text-gray-400 font-medium">{{ t("proPriceSub") }}</span>
            </div>
          </div>

          <ul class="space-y-4 mb-10 flex-grow">
            <li v-for="(feature, index) in t('proFeatures')" :key="index" class="flex items-start gap-3 text-gray-600 dark:text-gray-300 font-medium">
              <i class="bx bx-check-circle text-[#10b481] text-xl mt-0.5"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <button @click="scrollTo('contact')" class="w-full py-4 px-6 rounded-2xl bg-[#10b481] text-white font-bold hover:bg-[#0e946f] shadow-lg shadow-[#10b481]/30 transition-all duration-300">
            {{ t("choosePlan") }}
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div 
          class="relative group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="mb-8">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t("enterprise") }}</h4>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-manropeExtra text-[#10b481]">{{ t("enterprisePrice") }}</span>
            </div>
          </div>

          <ul class="space-y-4 mb-10 flex-grow">
            <li v-for="(feature, index) in t('enterpriseFeatures')" :key="index" class="flex items-start gap-3 text-gray-600 dark:text-gray-300">
              <i class="bx bx-check-circle text-[#10b481] text-xl mt-0.5"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <button @click="scrollTo('contact')" class="w-full py-4 px-6 rounded-2xl border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-[#112830] transition-all duration-300">
            {{ t("choosePlan") }}
          </button>
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
.font-manropeExtra {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}
</style>
