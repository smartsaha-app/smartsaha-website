<template>
  <section
    id="mrv"
    class="relative overflow-hidden bg-[#fafaf9] dark:bg-[#112830] py-20 lg:py-24 px-4 sm:px-6 lg:px-12 transition-colors duration-300"
  >
    <!-- Éléments décoratifs en arrière-plan -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#112830]/5 dark:bg-white/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <!-- En-tête de Section -->
      <div class="text-center mb-12 lg:mb-20" data-aos="fade-up">
        <!-- Badge Data Integrity -->
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-4 border border-[#10b481]/20">
          <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
          Data Integrity
        </span>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight max-w-3xl mx-auto mb-6 tracking-tight">
          {{ t("mrvTitle") }}
        </h2>

        <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-inter leading-relaxed max-w-2xl mx-auto">
          {{ t("mrvSectionText") }}
        </p>
      </div>

      <!-- 1. VERSION MOBILE & TABLETTE (Timeline Verticale avec Ligne à Gauche) -->
      <div class="block lg:hidden relative pl-6 border-l-2 border-[#10b481]/30 space-y-6 ml-4 sm:ml-6">
        <div
          v-for="(service, index) in mrvServices"
          :key="index"
          class="relative group"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Pastille/Puce temporelle avec Icône (Fond vert, Icône blanche) -->
          <div class="absolute -left-[41px] top-1 w-8 h-8 rounded-full bg-[#10b481] text-white flex items-center justify-center text-xs shadow-md border-2 border-[#fafaf9] dark:border-[#112830] z-10">
            <i :class="service.icon"></i>
          </div>

          <!-- Carte d'étape Mobile -->
          <div class="bg-white dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm transition-all duration-300 hover:border-[#10b481]/40">
            <h4 class="text-base font-manropeSemi text-[#112830] dark:text-white mb-1.5">
              {{ service.title }}
            </h4>
            
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-inter">
              {{ service.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- 2. VERSION DESKTOP (Roadmap Horizontale 5 Colonnes) -->
      <div class="hidden lg:block relative">
        <!-- Ligne horizontale connectrice -->
        <div class="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#10b481] via-[#10b481]/50 to-[#10b481]/10 -z-0"></div>

        <div class="grid grid-cols-5 gap-4 relative z-10">
          <div
            v-for="(service, index) in mrvServices"
            :key="index"
            class="group flex flex-col items-center text-center"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <!-- Pastille centrale avec Icône & Badge Numéroté -->
            <div class="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#10b481] text-white shadow-lg shadow-[#10b481]/20 mb-6 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#112830] dark:group-hover:bg-white dark:group-hover:text-[#112830]">
              <i :class="service.icon" class="text-lg"></i>
              <!-- <span class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white dark:bg-[#112830] text-[#10b481] text-[10px] font-mono font-bold flex items-center justify-center shadow-md border border-[#10b481]/20">
                {{ index + 1 }}
              </span> -->
            </div>

            <!-- Card Desktop -->
            <div class="w-full h-full bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-[#10b481]/50 hover:bg-white dark:hover:bg-white/[0.08] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col">
              <!-- <span class="text-[10px] font-mono font-bold text-[#10b481] uppercase tracking-wider mb-2 block">
                Étape 0{{ index + 1 }}
              </span> -->

              <h4 class="text-lg font-manropeSemi text-[#112830] dark:text-white mb-2 leading-snug group-hover:text-[#10b481] transition-colors">
                {{ service.title }}
              </h4>
              
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-inter mt-auto">
                {{ service.text }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

// Pipeline MRV technique strict (5 étapes)
const mrvServices = computed(() => [
  { icon: "fas fa-chart-line", title: t("dataCollection"), text: t("dataText") },
  { icon: "fas fa-tachometer-alt", title: t("dashboard"), text: t("dashboardText") },
  { icon: "fas fa-database", title: "Cloud Database", text: t("databaseText") },
  { icon: "fas fa-globe-americas", title: t("analysis"), text: t("analysisText") },
  { icon: "fas fa-shield-alt", title: t("protection"), text: t("protectionText") },
]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
/* Les utilitaires Tailwind gèrent 100% de la mise en page et du responsive */
</style>