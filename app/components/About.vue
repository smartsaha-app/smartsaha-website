<template>
  <section id="about" class="relative bg-[#fafaf9] dark:bg-[#112830] py-24 px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -ml-48 -mt-48"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <!-- Visual Column -->
        <div class="lg:w-1/2 flex flex-col gap-8" data-aos="fade-right">
          <div class="relative group">
            <div class="absolute inset-0 bg-[#10b481] rounded-[2.5rem] rotate-2 scale-105 opacity-10 group-hover:rotate-0 group-hover:scale-100 transition-all duration-500"></div>
            <div
              class="relative min-h-[300px] sm:min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500"
              style="
                background-image: url('/Agribio.gif');
                background-size: cover;
                background-position: center;
              "
            >
              <div class="absolute inset-0 bg-gradient-to-t from-[#112830]/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-10 text-white">
                <h3 class="text-3xl font-manropeSemi mb-4">{{ t("aboutObject") }}</h3>
                <p class="text-gray-200 leading-relaxed max-w-sm">{{ t("objectText") }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Column -->
        <div class="lg:w-1/2 flex flex-col" data-aos="fade-left">
          <h5 class="uppercase text-sm tracking-[0.2em] font-bold text-[#10b481] mb-4">
            Our Identity
          </h5>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-8">
            {{ t("aboutTitle") }}
          </h2>
          
          <p class="text-lg text-gray-500 dark:text-gray-400 font-inter leading-relaxed mb-10 border-l-4 border-[#10b481] pl-6 py-2 bg-white dark:bg-white/5 rounded-r-2xl shadow-sm">
            {{ t("aboutText") }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow">
              <h4 class="text-xl font-manropeSemi text-[#10b481] mb-3">{{ t("aboutProblem") }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ t("problemText") }}</p>
            </div>
            
            <div class="bg-[#10b481] p-8 rounded-3xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
              <h4 class="text-xl font-manropeSemi mb-3">{{ t("aboutSolution") }}</h4>
              <p class="text-sm text-white/90 leading-relaxed">{{ t("solutionText") }}</p>
            </div>
          </div>
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
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}
</style>
