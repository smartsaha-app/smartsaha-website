<template>
  <main class="min-h-screen bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">

    <!-- État de chargement -->
    <div v-if="pending" class="min-h-[70vh] flex items-center justify-center px-4">
      <div class="text-center space-y-3">
        <i class="bx bx-loader-alt bx-spin text-4xl text-[#10b481]"></i>
        <p class="text-gray-500 text-sm">{{ t("loadingProject") }}</p>
      </div>
    </div>

    <!-- Cas où le projet existe -->
    <template v-else-if="project">

      <!-- Hero Section immersif -->
      <section class="relative bg-cover bg-center pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img :src="project.coverImage" :alt="project.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/90 to-[#112830]/70"></div>
        </div>

        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <button
            @click="handleBack"
            class="inline-flex items-center gap-2 text-white/80 hover:text-[#10b481] font-semibold text-sm mb-8 transition-colors group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 cursor-pointer"
          >
            <i class="bx bx-left-arrow-alt text-xl group-hover:-translate-x-1 transition-transform"></i>
            <span>{{ t("back") }}</span>
          </button>

          <div class="space-y-4">
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {{ project.title }}
            </h1>
          </div>
        </div>
      </section>

      <!-- Corps de la page projet (Case Study) -->
      <section class="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 pb-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <!-- Contenu Principal -->
          <div class="lg:col-span-8 bg-white dark:bg-[#112830] p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 space-y-8">

            <p class="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed border-l-4 border-[#10b481] pl-4 italic bg-gray-50 dark:bg-white/5 py-3 rounded-r-lg">
              {{ project.summary }}
            </p>

            <!-- Le Défi Initial -->
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-lg">
                  <i class="bx bx-target-lock"></i>
                </span>
                {{ t("challengeTitle") }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {{ project.challenge }}
              </p>
            </div>

            <hr class="border-gray-100 dark:border-white/10" />

            <!-- La Solution Apportée -->
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-lg">
                  <i class="bx bx-bulb"></i>
                </span>
                {{ t("solutionTitle") }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
                {{ project.solution }}
              </p>

              <!-- Liste des fonctionnalités clés -->
              <template v-if="project.keyFeatures.length > 0">
                <h3 class="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
                  {{ t("keyFeaturesTitle") }}
                </h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <li
                    v-for="(item, idx) in project.keyFeatures"
                    :key="idx"
                    class="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3.5 rounded-xl border border-gray-100 dark:border-white/5"
                  >
                    <i class="bx bx-check-circle text-[#10b481] text-lg mt-0.5 flex-shrink-0"></i>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </template>

              <!-- Impact & Résultats Chiffrés -->
              <div v-if="project.results && project.results.length > 0" class="grid grid-cols-3 gap-4 bg-[#10b481]/5 border border-[#10b481]/20 p-4 sm:p-6 rounded-2xl">
                <div v-for="(res, idx) in project.results" :key="idx" class="text-center">
                  <span class="block text-2xl sm:text-3xl font-extrabold text-[#10b481]">
                    {{ res.value }}
                  </span>
                  <span class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                    {{ res.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Galerie d'images du projet -->
            <div v-if="project.gallery && project.gallery.length > 0">
              <h3 class="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
                {{ t("galleryTitle") }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(img, idx) in project.gallery"
                  :key="idx"
                  class="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 aspect-video shadow-md group"
                >
                  <img
                    :src="img"
                    :alt="`${t('galleryTitle')} ${idx + 1}`"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <!-- Partage Réseaux Sociaux -->
            <div class="border-t border-gray-100 dark:border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <span class="text-sm font-bold text-gray-800 dark:text-white">{{ t("shareProjectLabel") }}</span>
              <div class="flex items-center gap-3">
                <button
                  @click="shareProject('facebook')"
                  :aria-label="`${t('sharePrefix')} Facebook`"
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#10b481] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i class="bx bxl-facebook text-xl"></i>
                </button>
                <button
                  @click="shareProject('linkedin')"
                  :aria-label="`${t('sharePrefix')} LinkedIn`"
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#10b481] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i class="bx bxl-linkedin text-xl"></i>
                </button>
                <button
                  @click="shareProject('twitter')"
                  :aria-label="`${t('sharePrefix')} X (Twitter)`"
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#10b481] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i class="bx bxl-twitter text-xl"></i>
                </button>
              </div>
            </div>

          </div>

          <!-- Barre latérale / Sidebar -->
          <aside class="lg:col-span-4 space-y-6">

            <!-- Carte Résumé Projet -->
            <div v-if="project.technologies.length > 0" class="bg-white dark:bg-[#112830] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg space-y-4">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-3">
                {{ t("missionDetailsTitle") }}
              </h3>

              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-gray-400 block mb-0.5">{{ t("technologiesUsedLabel") }}</span>
                  <div class="flex flex-wrap gap-1.5 mt-1">
                    <span
                      v-for="(tech, idx) in project.technologies"
                      :key="idx"
                      class="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-[11px] font-semibold"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Témoignage Client -->
            <div v-if="project.testimonial" class="bg-white dark:bg-[#112830] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg text-center">
              <img
                :src="project.testimonial.avatar"
                :alt="project.testimonial.author"
                class="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-[#10b481]"
              />
              <p class="text-xs text-gray-600 dark:text-gray-300 italic mb-3 leading-relaxed">
                "{{ project.testimonial.quote }}"
              </p>
              <h4 class="text-sm font-bold text-gray-800 dark:text-white">{{ project.testimonial.author }}</h4>
              <p class="text-xs text-[#10b481] font-semibold">{{ project.testimonial.position }}</p>
            </div>

            <!-- Encadré Call to Action -->
            <div class="bg-gradient-to-br from-[#112830] to-[#10b481] p-6 rounded-2xl text-white shadow-lg space-y-4">
              <i class="bx bx-rocket text-4xl text-white/80"></i>
              <h3 class="text-xl font-bold">{{ t("inspiredTitle") }}</h3>
              <p class="text-xs text-gray-200 leading-relaxed">
                {{ t("inspiredText") }}
              </p>
              <NuxtLink
                :to="localePath('/contact')"
                class="inline-block w-full text-center py-2.5 px-4 rounded-full bg-white text-[#112830] font-bold text-xs hover:bg-gray-100 transition-colors shadow"
              >
                {{ t("discussProject") }}
              </NuxtLink>
            </div>

          </aside>

        </div>

        <!-- Navigation vers le projet suivant -->
        <div v-if="nextProject" class="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex justify-end">
          <NuxtLink
            :to="localePath({ name: 'portfolio-id', params: { id: nextProject.id } })"
            class="group flex items-center gap-4 bg-white dark:bg-[#112830] p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-md hover:shadow-xl transition-all"
          >
            <div class="text-right">
              <span class="text-[11px] text-[#10b481] font-bold uppercase tracking-wider">{{ t("nextProjectLabel") }}</span>
              <h4 class="text-base font-bold text-gray-800 dark:text-white group-hover:text-[#10b481] transition-colors">
                {{ nextProject.title }}
              </h4>
            </div>
            <div class="w-10 h-10 rounded-full bg-[#10b481]/10 text-[#10b481] group-hover:bg-[#10b481] group-hover:text-white flex items-center justify-center transition-colors">
              <i class="bx bx-right-arrow-alt text-2xl"></i>
            </div>
          </NuxtLink>
        </div>

      </section>
    </template>

    <!-- Erreur si le projet n'existe pas -->
    <div v-else class="min-h-[70vh] flex items-center justify-center px-4">
      <div class="text-center py-20 space-y-4 max-w-md bg-white dark:bg-[#112830] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5">
        <div class="w-16 h-16 mx-auto rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-3xl">
          <i class="bx bx-folder-minus"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ t("projectNotFound") }}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ t("projectNotFoundText") }}
        </p>
        <NuxtLink
          :to="localePath('/portfolio')"
          class="inline-block px-6 py-3 bg-[#10b481] text-white font-bold text-sm rounded-full hover:bg-[#0e9a6e] transition-colors shadow-lg"
        >
          {{ t("back") }}
        </NuxtLink>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const { t, locale } = useI18n();
const localePath = useLocalePath();

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();

/* =========================================================
   ID DU PORTFOLIO
========================================================= */

const projectId = Number(route.params.id);

/* =========================================================
   FORMATAGE ANNÉE
========================================================= */

const formatYear = (isoString?: string) => {
  if (!isoString) return "";

  return new Date(isoString)
    .getFullYear()
    .toString();
};

/* =========================================================
   NORMALISATION PORTFOLIO
========================================================= */

const mapPortfolio = (p: any) => ({
  id: p.id,

  /*
   * Champs traduits par le backend
   */
  title: p.title ?? "",
  summary: p.summary ?? "",
  challenge: p.challenge ?? "",
  solution: p.solution ?? "",

  /*
   * Tableaux
   */
  keyFeatures: Array.isArray(p.key_features)
    ? p.key_features
    : [],

  /*
   * Ces champs ne sont pas traduits
   */
  technologies: Array.isArray(p.technologies)
    ? p.technologies
    : [],

  gallery: Array.isArray(p.gallery)
    ? p.gallery
    : [],

  coverImage:
    p.cover_image ?? "/bg-hero-1.jpg",

  year: formatYear(p.createdAt),

  /*
   * Pas encore gérés par ton backend actuel
   */
  results: null,
  testimonial: null,
});

/* =========================================================
   PORTFOLIO COURANT
========================================================= */

const {
  data: dataProject,
  pending: pendingProject,
  error: errorProject,
} = await useFetch(
  `${config.public.apiBase}/portfolios/${projectId}`,
  {
    query: {
      locale,
    },

    /*
     * Recharge lorsque la langue change
     */
    watch: [locale],

    key: `portfolio-${projectId}`,
  }
);

/* =========================================================
   TOUS LES PORTFOLIOS
   Pour "Projet suivant"
========================================================= */

const {
  data: dataAllProjects,
  pending: pendingAll,
} = await useFetch(
  `${config.public.apiBase}/portfolios/list`,
  {
    query: {
      locale,
    },

    watch: [locale],

    key: "portfolios-list-detail",
  }
);

/* =========================================================
   LOADING
========================================================= */

const pending = computed(
  () =>
    pendingProject.value ||
    pendingAll.value
);

/* =========================================================
   PORTFOLIO COURANT
========================================================= */

const project = computed(() => {
  const raw =
    dataProject.value?.portfolio;

  return raw
    ? mapPortfolio(raw)
    : null;
});

/* =========================================================
   TOUS LES PORTFOLIOS
========================================================= */

const allProjects = computed(() => {
  const raw =
    dataAllProjects.value?.portfolios ?? [];

  return raw.map(mapPortfolio);
});

/* =========================================================
   PROJET SUIVANT
========================================================= */

const nextProject = computed(() => {
  const currentIndex =
    allProjects.value.findIndex(
      (p) => p.id === projectId
    );

  if (
    currentIndex !== -1 &&
    currentIndex <
      allProjects.value.length - 1
  ) {
    return allProjects.value[
      currentIndex + 1
    ];
  }

  return null;
});

/* =========================================================
   SEO DYNAMIQUE
========================================================= */

watchEffect(() => {
  if (!project.value) return;

  useSeoMeta({
    title: project.value.title,

    description:
      project.value.summary,

    ogTitle:
      project.value.title,

    ogDescription:
      project.value.summary,

    ogImage:
      project.value.coverImage,

    twitterCard:
      "summary_large_image",
  });
});

/* =========================================================
   RETOUR
========================================================= */

const handleBack = () => {
  if (
    typeof window !== "undefined" &&
    window.history.length > 1
  ) {
    router.back();
  } else {
    router.push(
      localePath("/portfolio")
    );
  }
};

/* =========================================================
   PARTAGE
========================================================= */

const shareProject = (
  platform:
    | "facebook"
    | "linkedin"
    | "twitter"
) => {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  const url = encodeURIComponent(
    window.location.href
  );

  const shareUrls = {
    facebook:
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,

    linkedin:
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,

    twitter:
      `https://twitter.com/intent/tweet?url=${url}`,
  };

  window.open(
    shareUrls[platform],
    "_blank",
    "width=600,height=400"
  );
};
</script>

<style scoped>
section {
  position: relative;
}
</style>