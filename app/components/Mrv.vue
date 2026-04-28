<template>
  <section id="mrv" class="relative overflow-hidden bg-[#fafaf9] dark:bg-[#112830] py-24 px-4 sm:px-6 lg:px-24 transition-colors duration-300">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#112830]/5 dark:bg-white/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20" data-aos="fade-up">
        <h5 class="uppercase text-sm tracking-[0.2em] text-[#10b481] font-bold mb-4">
          Data Integrity
        </h5>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-6">
          {{ t("mrvTitle") }}
        </h2>
        <div class="w-24 h-1 bg-[#10b481] mx-auto rounded-full mb-8"></div>
        <p class="text-lg text-gray-500 dark:text-gray-400 font-inter leading-relaxed max-w-2xl mx-auto">
          {{ t("mrvSectionText") }}
        </p>
      </div>

      <!-- 3-Column Grid with Enhanced Presentation -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in mrvServices"
          :key="index"
          class="group relative bg-white dark:bg-white/5 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Subtle Decorative Background Icon -->
          <div class="absolute -right-4 -bottom-4 text-gray-50 dark:text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <i :class="service.icon" class="text-9xl transform -rotate-12"></i>
          </div>

          <div class="relative z-10">
            <!-- Icon Container -->
            <div class="w-16 h-16 rounded-2xl bg-[#10b481]/10 flex items-center justify-center text-[#10b481] text-3xl mb-8 group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
              <i :class="service.icon"></i>
            </div>

            <!-- Content -->
            <h4 class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 group-hover:text-[#10b481] transition-colors">
              {{ service.title }}
            </h4>
            
            <div class="w-12 h-0.5 bg-gray-100 dark:bg-white/10 mb-6 group-hover:w-20 group-hover:bg-[#10b481] transition-all duration-500"></div>
            
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed font-inter">
              {{ service.text }}
            </p>
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

const mrvServices = computed(() => [
  { icon: "fas fa-chart-line", title: t("dataCollection"), text: t("dataText") },
  { icon: "fas fa-tachometer-alt", title: t("dashboard"), text: t("dashboardText") },
  { icon: "fas fa-database", title: "Cloud Database", text: t("databaseText") },
  { icon: "fas fa-globe-americas", title: t("analysis"), text: t("analysisText") },
  { icon: "fas fa-shield-alt", title: t("protection"), text: t("protectionText") },
  { icon: "fas fa-newspaper", title: t("subbscription"), text: t("subbscriptionText") },
]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
/* No extra scoped styles needed thanks to Tailwind */
</style>
