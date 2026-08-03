<template>
  <section id="about" class="relative bg-[#fafaf9] dark:bg-[#112830] py-24 px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -ml-48 -mt-48"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <!-- Visual Column
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
        </div> -->

        <!-- Text Column
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
        </div> -->

        <!-- Visual Column avec Masque Continu (Une seule image découpée) -->
        <div class="lg:w-1/2 flex items-center justify-center relative p-4" data-aos="fade-right">
          
          <!-- Fond halo vert discret -->
          <div class="absolute w-72 h-72 bg-[#10b481]/15 rounded-full blur-3xl -z-10"></div>

          <!-- Conteneur d'image avec grille de masques -->
          <div class="relative w-full max-w-md h-[400px] sm:h-[460px] flex gap-3 sm:gap-4 items-center">
            
            <!-- Colonne 1 -->
            <div class="w-1/3 h-[82%] rounded-md overflow-hidden shadow-lg transform translate-y-3">
              <img 
                src="/bg-about-1.jpg" 
                alt="SmartSaha" 
                class="w-[300%] h-full max-w-none object-cover -translate-x-0"
              />
            </div>

            <!-- Colonne 2 (Centrale) -->
            <div class="w-1/3 h-full rounded-md overflow-hidden shadow-2xl">
              <img 
                src="/bg-about-1.jpg" 
                alt="SmartSaha" 
                class="w-[300%] h-full max-w-none object-cover -translate-x-1/3"
              />
            </div>

            <!-- Colonne 3 -->
            <div class="w-1/3 h-[82%] rounded-lg overflow-hidden shadow-lg transform translate-y-3">
              <img 
                src="/bg-about-1.jpg" 
                alt="SmartSaha" 
                class="w-[300%] h-full max-w-none object-cover -translate-x-2/3"
              />
            </div>

          </div>

        </div>

        <!-- Text Column (Style Bento Glassmorphism) -->
        <div class="lg:w-1/2 flex flex-col justify-center" data-aos="fade-left">
          
          <!-- Sub-heading avec Badge Pills -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest w-fit mb-5 border border-[#10b481]/20">
            <span class="w-2 h-2 rounded-full bg-[#10b481]"></span>
            Our Identity
          </div>

          <!-- Titre Principal -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-6 tracking-tight">
            {{ t("aboutTitle") }}
          </h2>
          
          <!-- Text Description Aéré -->
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-inter leading-relaxed mb-8 font-normal">
            {{ t("aboutText") }}
          </p>

          <!-- Grille Problème / Solution harmonisée -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <!-- Carte Problème -->
            <div class="group p-6 rounded-2xl bg-[#10b481]/5 dark:bg-[#10b481]/10 border border-[#10b481]/20 hover:border-[#10b481] transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-[#10b481] text-white flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform shadow-sm shadow-[#10b481]/30">
                01
              </div>
              <h3 class="text-lg font-manropeSemi text-[#112830] dark:text-white mb-2">
                {{ t("aboutProblem") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
                {{ t("problemText") }}
              </p>
            </div>
            
            <!-- Carte Solution -->
            <div class="group p-6 rounded-2xl bg-[#10b481]/5 dark:bg-[#10b481]/10 border border-[#10b481]/20 hover:border-[#10b481] transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-[#10b481] text-white flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform shadow-sm shadow-[#10b481]/30">
                02
              </div>
              <h3 class="text-lg font-manropeSemi text-[#112830] dark:text-white mb-2">
                {{ t("aboutSolution") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 font-inter leading-relaxed">
                {{ t("solutionText") }}
              </p>
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
