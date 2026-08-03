<template>
  <section id="blog" class="relative bg-[#fafaf9] dark:bg-[#0a0a0a] py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-300 overflow-hidden">
    <!-- Éléments décoratifs en arrière-plan -->
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <!-- En-tête de section -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up">
        <div>
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-4 border border-[#10b481]/20">
            <i class="bx bx-news text-sm"></i>
            {{ t("blogBadge") || "Actualités & Insights" }}
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight">
            {{ t("blogTitle") || "Dernières publications" }}
          </h2>
        </div>
        
        <NuxtLink 
          to="/blogs" 
          class="inline-flex items-center gap-2 text-[#10b481] font-bold text-sm hover:text-[#0e9a6e] transition-colors group shrink-0"
        >
          <span>{{ t("blogViewAll") || "Voir tous les articles" }}</span>
          <i class="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
        </NuxtLink>
      </div>

      <!-- Layout Style Magazine (1 Grande carte à gauche + 3 Cartes horizontales à droite) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- ARTICLE A LA UNE (Featured - Gauche, 7 Colonnes) -->
        <article
          v-if="featuredPost"
          class="lg:col-span-7 group relative rounded-3xl overflow-hidden shadow-xl flex flex-col justify-end min-h-[420px] sm:min-h-[500px] border border-gray-200/50 dark:border-white/10"
          data-aos="fade-right"
        >
          <!-- Image de fond avec Zoom au survol -->
          <img
            :src="featuredPost.image"
            :alt="featuredPost.title"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <!-- Overlay Sombre (Dégradé progressif de bas en haut) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          <!-- Badge de Catégorie en haut -->
          <div class="absolute top-6 left-6 z-10">
            <span class="px-3.5 py-1.5 rounded-full bg-[#10b481] text-white text-xs font-semibold shadow-md">
              {{ featuredPost.category }}
            </span>
          </div>

          <!-- Contenu Superposé en bas -->
          <div class="relative z-10 p-6 sm:p-10 text-white">
            <NuxtLink :to="'/blog/' + featuredPost.slug">
              <h3 class="text-2xl sm:text-3xl font-manropeSemi text-white mb-3 group-hover:text-[#10b481] transition-colors leading-snug">
                {{ featuredPost.title }}
              </h3>
            </NuxtLink>

            <!-- Date & Temps de lecture -->
            <div class="flex items-center gap-4 text-xs text-gray-300 font-inter mb-4">
              <span class="flex items-center gap-1.5">
                <i class="bx bx-time-five text-sm"></i>
                {{ featuredPost.date }}
              </span>
              <span>•</span>
              <span>{{ featuredPost.readTime }}</span>
            </div>

            <!-- Extrait du texte -->
            <p class="text-sm text-gray-300 font-inter leading-relaxed line-clamp-2 max-w-2xl">
              {{ featuredPost.excerpt }}
            </p>
          </div>
        </article>

        <!-- LISTE DES 3 ARTICLES RÉCENTS (Droite, 5 Colonnes) -->
        <div class="lg:col-span-5 flex flex-col justify-between gap-4" data-aos="fade-left">
          
          <article
            v-for="(post, index) in sidePosts"
            :key="post.id"
            class="group bg-white dark:bg-[#112830]/40 rounded-2xl p-4 sm:p-5 border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-4 sm:gap-5 items-center"
          >
            <!-- Image à gauche -->
            <div class="relative w-28 h-28 sm:w-36 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>

            <!-- Contenu à droite -->
            <div class="flex flex-col justify-between h-full py-1 min-w-0">
              <div>
                <NuxtLink :to="'/blog/' + post.slug">
                  <h4 class="text-sm sm:text-base font-manropeSemi text-[#112830] dark:text-white group-hover:text-[#10b481] transition-colors line-clamp-2 leading-snug mb-2">
                    {{ post.title }}
                  </h4>
                </NuxtLink>

                <div class="flex items-center gap-1.5 text-xs text-gray-400 font-inter mb-3">
                  <i class="bx bx-time-five text-gray-400"></i>
                  <span>{{ post.date }}</span>
                </div>
              </div>

              <!-- Lien Read More -->
              <NuxtLink
                :to="'/blogs' + post.slug"
                class="inline-flex items-center gap-1.5 text-xs font-bold text-[#112830] dark:text-white group-hover:text-[#10b481] transition-colors"
              >
                <span>{{ t("readMore") || "Read More" }}</span>
                <i class="bx bx-right-arrow-alt text-base group-hover:translate-x-1 transition-transform"></i>
              </NuxtLink>
            </div>
          </article>

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

// Ensemble des articles
const allPosts = computed(() => [
  {
    id: 1,
    slug: "imagerie-satellite-agriculture-precision",
    title: t("blogPost1Title") || "Exploring Future Agricultural Satellite Innovations",
    excerpt: t("blogPost1Excerpt") || "Embark on a journey with us as we delve into the realms of innovation, share insights, and explore the transformative power of satellite technology...",
    category: "AgTech",
    date: "December 11, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    slug: "certification-projets-carbone-mrv",
    title: t("blogPost2Title") || "From Ideas to Impact in a Carbon Project Journey",
    excerpt: t("blogPost2Excerpt") || "Understanding MRV methodology in evaluating agricultural carbon sinks.",
    category: "Carbone & MRV",
    date: "November 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    slug: "ia-et-cartographie-parcellaire",
    title: t("blogPost3Title") || "Navigating the Tech Landscape with AI Insights",
    excerpt: t("blogPost3Excerpt") || "Automated parcel boundary mapping using high resolution satellite imagery.",
    category: "Innovation IA",
    date: "November 20, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    slug: "impact-changement-climatique-agroforesterie",
    title: t("blogPost4Title") || "Behind the Scenes of Crafting Our Agro-Platform",
    excerpt: t("blogPost4Excerpt") || "Sustainable land management practices in the Indian Ocean region.",
    category: "Développement Durable",
    date: "November 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=500&auto=format&fit=crop"
  }
]);

// Premier article mis en avant à gauche
const featuredPost = computed(() => allPosts.value[0]);

// Les 3 suivants pour le côté droit
const sidePosts = computed(() => allPosts.value.slice(1, 4));
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>