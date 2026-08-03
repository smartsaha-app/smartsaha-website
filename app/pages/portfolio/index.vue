<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center bg-white/65 pt-16 sm:pt-20 min-h-[50vh] flex items-center"
      style="background-image: url('/bg-hero-1.jpg')"
    >
      <!-- Deep Premium Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#10b481]/50 transition-colors duration-300"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col items-start gap-6 w-full z-10"
      >
        <div class="flex-1 flex flex-col justify-center gap-2 text-white" data-aos="fade-up">
          <h5 class="rounded-full w-max bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-5 py-2 uppercase text-xs tracking-[0.2em] font-bold text-white shadow-sm">
            <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
            {{ t("portfolio") || "Notre Portfolio" }}
          </h5>
          
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight max-w-4xl">
            {{ t("accrocheHero") || "Nos Réalisations & Projets Impactants" }}
          </h1>
          <p class="text-gray-200 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            {{ t("heroText") || "Découvrez comment nous aidons les acteurs agricoles et environnementaux à digitaliser leurs opérations et valoriser leurs parcelles." }}
          </p>
          <button
            @click="scrollTo('projects')"
            class="inline-flex items-center w-max gap-3 border-2 border-white bg-white text-[#112830] hover:bg-[#10b481] hover:border-[#10b481] hover:text-white px-8 py-3.5 rounded-full transition-all duration-300 mt-4 font-semibold group shadow-lg cursor-pointer"
          >
            <span>Découvrir les projets</span>
            <i class="bx bx-down-arrow-alt text-2xl group-hover:translate-y-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Section Projets / Portfolio -->
    <section id="projects" class="py-16 sm:py-24 bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <!-- En-tête de section -->
        <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <span class="text-[#10b481] font-bold text-xs sm:text-sm uppercase tracking-widest bg-[#10b481]/10 px-4 py-1.5 rounded-full border border-[#10b481]/20">
            Projets Clés
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mt-4 mb-4">
            L'innovation technologique au service du terrain
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Un aperçu de nos déploiements récents alliant cartographie satellite, capteurs connectés et plateformes d'analyse de données.
          </p>
        </div>

        <!-- Grille des cartes de projets -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="project in projects"
            :key="project.id"
            class="group bg-white dark:bg-[#112830] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
            data-aos="fade-up"
          >
            <!-- Image du projet avec redirection vers la page détails -->
            <NuxtLink 
              :to="localePath(`/portfolio/${project.id}`)" 
              class="relative overflow-hidden aspect-video cursor-pointer block"
              :aria-label="'Voir les détails du projet ' + project.title"
            >
              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#112830] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              <!-- Badge Catégorie sur Image -->
              <div class="absolute top-4 left-4 z-10">
                <span class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#112830]/80 backdrop-blur-md text-[#10b481] border border-[#10b481]/30">
                  {{ project.categoryName }}
                </span>
              </div>

              <!-- Icône Action au survol -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="p-3 bg-white/20 backdrop-blur-md text-white rounded-full text-2xl hover:scale-110 transition-transform shadow-lg">
                  <i class="bx bx-right-arrow-alt"></i>
                </span>
              </div>
            </NuxtLink>

            <!-- Contenu de la Card -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <NuxtLink :to="localePath(`/portfolio/${project.id}`)">
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-[#10b481] transition-colors leading-snug">
                    {{ project.title }}
                  </h3>
                </NuxtLink>
                <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Pied de Carte / Lien de navigation -->
              <div class="border-t border-gray-100 dark:border-white/10 pt-4 mt-auto flex items-center justify-between">
                <NuxtLink
                  :to="localePath(`/portfolio/${project.id}`)"
                  class="text-sm font-semibold text-[#10b481] hover:underline inline-flex items-center gap-1 cursor-pointer group/link"
                >
                  <span>En savoir plus</span>
                  <i class="bx bx-chevron-right text-lg group-hover/link:translate-x-1 transition-transform"></i>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

// Configuration SEO Nuxt 3
useHead({
  title: "Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Découvrez nos projets et réalisations dans le domaine de SmartSaha, l'AgTech malgache pionnière dans la digitalisation et la traçabilité agricole.",
    },
  ],
});

// Structuration Schema.org pour le référencement du Portfolio
useSchemaOrg([
  defineWebPage({
    name: "Portfolio - SmartSaha",
  }),
]);

const languageStore = useLanguageStore();
const localePath = useLocalePath();

const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang]?.[key] || key;
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

// --- Données des projets SmartSaha ---
const projects = ref([
  {
    id: 1,
    title: "Plateforme MRV Carbone Forestier",
    image: "/bg-hero-1.jpg",
    description: "Système de Mesure, Notification et Vérification pour le suivi de la séquestration de carbone."
  },
  {
    id: 2,
    title: "Gestion d'Irrigation connectée (IoT)",
    image: "/bg-hero-1.jpg",
    description: "Monitoring en temps réel de l'humidité des sols et automatisation de l'arrosage."
  },
  {
    id: 3,
    title: "SmartSaha Agro-Dashboard",
    image: "/bg-hero-1.jpg",
    description: "Tableau de bord décisionnel pour les coopératives et exploitants agricoles."
  }
]);
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>