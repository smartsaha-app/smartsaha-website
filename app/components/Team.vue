<template>
  <section id="team" class="relative bg-[#fafaf9] dark:bg-[#0a0a0a] py-28 px-4 sm:px-6 lg:px-12 overflow-hidden transition-colors duration-300">
    <!-- Éléments décoratifs flous en arrière-plan -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto z-10">
      <!-- Section Header -->
      <div class="text-center mb-24" data-aos="fade-up">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-4 border border-[#10b481]/20">
          <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
          Our Visionaries
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white mb-6">
          {{ t("teamTitle") }}
        </h2>
        <div class="w-20 h-1 bg-[#10b481] mx-auto rounded-full"></div>
      </div>

      <!-- Team Grid avec le style de la capture d'écran -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10 pt-8">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="group relative pt-12"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <!-- 1. Forme colorée en arrière-plan (Fond incliné comme sur l'image) -->
          <div 
            class="absolute inset-0 top-12 rounded-[2.5rem] transform -rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
            :class="member.bgAccent"
          ></div>

          <!-- 2. Carte Principale (Blanche / Dark) -->
          <div class="relative bg-white dark:bg-[#161616] rounded-[2.5rem] p-8 pt-16 text-center shadow-xl border border-gray-100/80 dark:border-white/10 transition-transform duration-500 group-hover:-translate-y-2 flex flex-col items-center h-full">
            
            <!-- Photo de Profil Circulaire (Acheval sur le haut de la carte) -->
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#161616] shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Nom du membre -->
            <h3 class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-1 group-hover:text-[#10b481] transition-colors">
              {{ member.name }}
            </h3>

            <!-- Poste / Rôle (en italique) -->
            <p class="text-sm italic text-gray-500 dark:text-gray-400 font-inter mb-6">
              {{ member.role }}
            </p>

            <!-- Description -->
            <p class="text-sm text-gray-500 dark:text-gray-400 font-inter leading-relaxed line-clamp-4 mb-8">
              {{ member.description }}
            </p>

            <!-- Liens Réseaux Sociaux (Subtils en bas de carte) -->
            <div class="mt-auto pt-4 flex items-center justify-center gap-3 border-t border-gray-100 dark:border-white/5 w-full">
              <a
                :href="member.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-[#10b481] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <i class="bx bxl-linkedin text-lg"></i>
              </a>
              <a
                :href="'mailto:' + member.email"
                class="w-9 h-9 rounded-full bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-[#10b481] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Email"
              >
                <i class="bx bx-envelope text-lg"></i>
              </a>
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

// Ajout de nuances de couleurs pour le fond incliné derrière chaque carte
const teamMembers = computed(() => [
  {
    name: "Michel Raherimenanantsoa",
    role: t("teamJob1"),
    description: t("teamJobDesc1"),
    image: "/Michel.jpg",
    bgAccent: "bg-[#099268]", // Vert émeraude profond
    linkedin: "https://www.linkedin.com/in/michel-raherimanantsoa-2bab19a9",
    email: "smartsaapp@gmail.com"
  },
  {
    name: "Fitahiana Rahetimazava",
    role: t("teamJob2"),
    description: t("teamJobDesc2"),
    image: "/Fitahiana.jpg",
    bgAccent: "bg-[#10b481]", // Vert principal SmartSaha
    linkedin: "https://www.linkedin.com/in/fitahiana-rahetimazava-ramangamihanta-b77758145/",
    email: "smartsaapp@gmail.com"
  },
  {
    name: "Rindra Ranaivosoa",
    role: t("teamJob4"),
    description: t("teamJobDesc4"),
    image: "/Rindra.jpg",
    bgAccent: "bg-[#20c997]", // Vert menthe dynamique
    linkedin: "https://www.linkedin.com/in/g%C3%A9rald-rindra-ranaivosoa-454549202/",
    email: "smartsaapp@gmail.com"
  }
]);
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>