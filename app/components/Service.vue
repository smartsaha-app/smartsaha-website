<template>
  <section id="services" class="relative py-24 bg-white dark:bg-[#0b1a1f] px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Decorative background -->
    <div class="absolute top-1/2 left-0 w-72 h-72 bg-[#10b481]/5 rounded-full blur-3xl -translate-y-1/2 -ml-36"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
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
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Card 1 -->
        <div
          class="group bg-[#fafaf9] dark:bg-white/5 rounded-[2.5rem] p-10 text-center flex flex-col items-center transition-all duration-500 hover:bg-white dark:hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-gray-100 dark:hover:border-white/10"
          data-aos="fade-up"
        >
          <div class="w-20 h-20 rounded-3xl bg-white dark:bg-[#112830] shadow-sm flex items-center justify-center text-[#10b481] text-4xl mb-8 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
            <i class="fas fa-seedling"></i>
          </div>
          <h3 class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 group-hover:text-[#10b481] transition-colors">
            {{ t("precisonAgriculture") }}
          </h3>
          <p class="text-gray-500 leading-relaxed font-inter mb-8">
            {{ t("servicePaText") }}
          </p>
          <button
            @click="scrollTo('precision')"
            class="mt-auto inline-flex items-center gap-2 text-[#10b481] font-bold hover:gap-4 transition-all"
          >
            {{ t("learnMore") }}
            <i class="bx bx-right-arrow-alt text-2xl"></i>
          </button>
        </div>

        <!-- Card 2 -->
        <div
          class="group bg-[#fafaf9] dark:bg-white/5 rounded-[2.5rem] p-10 text-center flex flex-col items-center transition-all duration-500 hover:bg-white dark:hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-gray-100 dark:hover:border-white/10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="w-20 h-20 rounded-3xl bg-white dark:bg-[#112830] shadow-sm flex items-center justify-center text-[#10b481] text-4xl mb-8 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
            <i class="fas fa-tools"></i>
          </div>
          <h3 class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 group-hover:text-[#10b481] transition-colors">
            {{ t("agribusiness") }}
          </h3>
          <p class="text-gray-500 leading-relaxed font-inter mb-8">
            {{ t("agriText") }}
          </p>
          <button
            @click="scrollTo('mrv')"
            class="mt-auto inline-flex items-center gap-2 text-[#10b481] font-bold hover:gap-4 transition-all"
          >
            {{ t("learnMore") }}
            <i class="bx bx-right-arrow-alt text-2xl"></i>
          </button>
        </div>

        <!-- Card 3 -->
        <div
          class="group bg-[#fafaf9] dark:bg-white/5 rounded-[2.5rem] p-10 text-center flex flex-col items-center transition-all duration-500 hover:bg-white dark:hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-gray-100 dark:hover:border-white/10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="w-20 h-20 rounded-3xl bg-white dark:bg-[#112830] shadow-sm flex items-center justify-center text-[#10b481] text-4xl mb-8 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3 class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 group-hover:text-[#10b481] transition-colors">
            {{ t("mrv") }}
          </h3>
          <p class="text-gray-500 leading-relaxed font-inter mb-8">
            {{ t("mrvText") }}
          </p>
          <button
            @click="scrollTo('mrv')"
            class="mt-auto inline-flex items-center gap-2 text-[#10b481] font-bold hover:gap-4 transition-all"
          >
            {{ t("learnMore") }}
            <i class="bx bx-right-arrow-alt text-2xl"></i>
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
section {
  position: relative;
  overflow: hidden;
}
</style>
