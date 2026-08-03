<template>
  <div>
    <!-- Hero Section Blog -->
    <section
      class="relative bg-cover bg-center bg-white/65 pt-16 sm:pt-20"
      style="background-image: url('/bg-hero-1.jpg')"
    >
      <!-- Deep Premium Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#10b481]/50 transition-colors duration-300"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col items-start gap-6"
      >
        <div class="flex-1 flex flex-col justify-center gap-2 text-white z-10" data-aos="fade-up">
          <p class="rounded-full w-max bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-5 py-2 uppercase text-xs tracking-[0.2em] font-bold text-white">
            <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
            {{ t("blogBadge") }}
          </p>
          
          <h1 class="text-hero text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            {{ t("blogHeroTitle") }}
          </h1>
          <p class="text-gray-200 max-w-xl text-lg">
            {{ t("blogHeroSubtitle") }}
          </p>
          <button
            @click="scrollTo('articles')"
            aria-label="Parcourir la liste des articles du blog"
            class="inline-flex items-center w-max gap-3 border-2 border-white bg-white text-[#112830] hover:bg-[#10b481] hover:border-[#10b481] hover:text-white px-8 py-3 rounded-full transition-all duration-300 mt-4 font-semibold group shadow-lg cursor-pointer"
          >
            {{ t("readMore") }}
            <i class="bx bx-down-arrow-alt text-2xl group-hover:translate-y-1 transition-transform" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Section Liste des Articles -->
    <section id="articles" class="py-16 sm:py-24 bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <!-- Barre de recherche & Filtres -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-12" data-aos="fade-up">
          <!-- Filtres par catégories -->
          <div class="flex flex-wrap items-center gap-2 w-full md:w-auto" role="group" aria-label="Filtrer les articles par catégorie">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              :class="
                activeCategory === cat.id
                  ? 'bg-[#10b481] text-white shadow-md shadow-[#10b481]/20 scale-105'
                  : 'bg-white dark:bg-[#112830] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5'
              "
            >
              {{ cat.name }}
            </button>
          </div>

          <!-- Champ de recherche -->
          <div class="relative w-full md:w-72">
            <label for="search-input" class="sr-only">Rechercher un article</label>
            <input
              id="search-input"
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un article..."
              class="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-[#112830] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:border-[#10b481] transition-colors"
            />
            <i class="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" aria-hidden="true"></i>
          </div>
        </div>

        <!-- Article à la une (Featured Article) -->
        <article 
          v-if="featuredPost && activeCategory === 'all' && !searchQuery" 
          class="mb-14 group bg-white dark:bg-[#112830] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12"
          data-aos="fade-up"
        >
          <div class="lg:col-span-7 relative overflow-hidden aspect-video lg:aspect-auto">
            <img 
              :src="featuredPost.image" 
              :alt="`Image d'illustration : ${featuredPost.title}`"
              width="800"
              height="450"
              loading="eager"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <span class="absolute top-4 left-4 bg-[#10b481] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow">
              À la une
            </span>
          </div>
          <div class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span class="font-medium text-[#10b481]">{{ featuredPost.categoryName }}</span>
                <span>•</span>
                <time :datetime="featuredPost.isoDate">{{ featuredPost.date }}</time>
                <span>•</span>
                <span>{{ featuredPost.readTime }}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-[#10b481] transition-colors">
                <NuxtLink :to="localePath(`/blogs/${featuredPost.id}`)">
                  {{ featuredPost.title }}
                </NuxtLink>
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {{ featuredPost.excerpt }}
              </p>
            </div>
            
            <div class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
              <NuxtLink
                :to="localePath(`/blogs/${featuredPost.id}`)"
                class="inline-flex items-center gap-2 text-sm font-bold text-[#10b481] hover:translate-x-1 transition-transform"
                :aria-label="`Lire la suite de l'article : ${featuredPost.title}`"
              >
                Lire la suite
                <i class="bx bx-right-arrow-alt text-xl" aria-hidden="true"></i>
              </NuxtLink>
            </div>
          </div>
        </article>

        <!-- Grille des cartes de blog -->
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="group bg-white dark:bg-[#112830] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
            data-aos="fade-up"
          >
            <!-- Image de couverture -->
            <NuxtLink :to="localePath(`/blogs/${post.id}`)" class="relative overflow-hidden aspect-video block" :tabindex="-1">
              <img
                :src="post.image"
                :alt="`Illustration de l'article : ${post.title}`"
                width="600"
                height="338"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span class="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                {{ post.categoryName }}
              </span>
            </NuxtLink>

            <!-- Contenu de la carte -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <!-- Méta-informations -->
                <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 mb-3">
                  <i class="bx bx-calendar" aria-hidden="true"></i>
                  <time :datetime="post.isoDate">{{ post.date }}</time>
                  <span>•</span>
                  <i class="bx bx-time-five" aria-hidden="true"></i>
                  <span>{{ post.readTime }}</span>
                </div>

                <!-- Titre (Contient H3 pour la hiérarchie) -->
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-[#10b481] transition-colors line-clamp-2">
                  <NuxtLink :to="localePath(`/blogs/${post.id}`)">
                    {{ post.title }}
                  </NuxtLink>
                </h3>

                <!-- Extrait -->
                <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6">
                  {{ post.excerpt }}
                </p>
              </div>

              <!-- Pied de carte -->
              <div class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4 mt-auto">
                <NuxtLink
                  :to="localePath(`/blogs/${post.id}`)"
                  class="text-sm font-semibold text-[#10b481] hover:underline flex items-center gap-1"
                  :aria-label="`Lire l'article : ${post.title}`"
                >
                  Lire
                  <i class="bx bx-chevron-right" aria-hidden="true"></i>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <!-- Message si aucun article ne correspond -->
        <div v-else class="text-center py-16 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/5">
          <i class="bx bx-news text-5xl text-gray-400 mb-3" aria-hidden="true"></i>
          <h2 class="text-lg font-bold text-gray-700 dark:text-white mb-1">Aucun article trouvé</h2>
          <p class="text-gray-500 text-sm">Essayez d'ajuster votre recherche ou vos filtres.</p>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const localePath = useLocalePath();
const route = useRoute();

const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang]?.[key] || key;
};

// URL Canonique dynamique
const siteUrl = "https://smartsaha.com"; // Remplacez par votre domaine
const canonicalUrl = `${siteUrl}${route.path}`;

// 1. Métadonnées SEO Avancées pour Nuxt 3
useSeoMeta({
  title: "Blog & Actualités AgTech, MRV et IoT Agricole | SmartSaha",
  description: "Explorez nos articles d'experts sur la digitalisation agricole, la traçabilité des filières, l'IA agronomique, les capteurs IoT et le carbone MRV.",
  ogTitle: "Blog & Innovation Agricole | SmartSaha",
  ogDescription: "Découvrez comment les technologies numériques et l'IA façonnent l'avenir de l'agriculture durable et la traçabilité des cultures.",
  ogImage: `${siteUrl}/og-blog.jpg`,
  ogUrl: canonicalUrl,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Blog SmartSaha - AgTech & Digitalisation Agricole",
  twitterDescription: "Articles et guides sur la traçabilité, le carbone agricole et les technologies IoT.",
  twitterImage: `${siteUrl}/og-blog.jpg`,
});

// Balise Canonical
useHead({
  link: [
    { rel: "canonical", href: canonicalUrl }
  ]
});

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const activeCategory = ref("all");
const searchQuery = ref("");

const categories = [
  { id: "all", name: "Tous les articles" },
  { id: "agtech", name: "AgTech" },
  { id: "mrv", name: "Carbone & MRV" },
  { id: "iot", name: "IoT & Capteurs" },
  { id: "ai", name: "IA & Agronomie" }
];

// Article à la une
const featuredPost = ref({
  id: 1,
  title: "Comment l'IA et l'imagerie satellite révolutionnent la mesure du carbone agricole",
  category: "mrv",
  categoryName: "Carbone & MRV",
  image: "/bg-hero-1.jpg",
  excerpt: "Découvrez les dernières avancées technologiques permettant de quantifier avec précision le carbone séquestré dans les sols et la biomasse végétale grâce aux données multispectrales.",
  date: "12 Mai 2026",
  isoDate: "2026-05-12",
  readTime: "6 min de lecture",
  author: {
    name: "Équipe SmartSaha",
    avatar: "/logo.png"
  }
});

// Liste des articles
const posts = ref([
  {
    id: 2,
    title: "Optimisation de l'irrigation grâce aux capteurs connectés LoRaWAN",
    category: "iot",
    categoryName: "IoT & Capteurs",
    image: "/bg-hero-1.jpg",
    excerpt: "Comment économiser jusqu'à 40% d'eau en surveillant le potentiel hydrique des sols en temps réel sur vos cultures.",
    date: "28 Avril 2026",
    isoDate: "2026-04-28",
    readTime: "4 min de lecture",
    author: {
      name: "Jean Marc",
      avatar: "/logo.png"
    }
  },
  {
    id: 3,
    title: "Les défis du MRV pour les coopératives agricoles en Afrique",
    category: "mrv",
    categoryName: "Carbone & MRV",
    image: "/bg-hero-1.jpg",
    excerpt: "Analyse des obstacles techniques et financiers auxquels font face les petites exploitations pour certifier leurs crédits carbone.",
    date: "15 Avril 2026",
    isoDate: "2026-04-15",
    readTime: "5 min de lecture",
    author: {
      name: "SmartSaha Research",
      avatar: "/logo.png"
    }
  },
  {
    id: 4,
    title: "Anticiper les attaques de ravageurs grâce aux modèles prédictifs",
    category: "ai",
    categoryName: "IA & Agronomie",
    image: "/bg-hero-1.jpg",
    excerpt: "L'apprentissage automatique au service de la protection intégrée des cultures : prévenir plutôt que traiter.",
    date: "02 Avril 2026",
    isoDate: "2026-04-02",
    readTime: "7 min de lecture",
    author: {
      name: "Sarah L.",
      avatar: "/logo.png"
    }
  },
  {
    id: 5,
    title: "L'avenir de l’agronomie numérique à Madagascar et dans l'Océan Indien",
    category: "agtech",
    categoryName: "AgTech",
    image: "/bg-hero-1.jpg",
    excerpt: "Aperçu de la transformation digitale des chaînes de valeur agricoles locales et des opportunités d'innovation.",
    date: "20 Mars 2026",
    isoDate: "2026-03-20",
    readTime: "5 min de lecture",
    author: {
      name: "Équipe SmartSaha",
      avatar: "/logo.png"
    }
  }
]);

// 2. Génération des données structurées JSON-LD (Schema.org) pour le blog
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog SmartSaha",
        "description": "Articles et ressources sur la digitalisation, le carbone et l'agronomie numérique.",
        "url": canonicalUrl,
        "blogPost": [featuredPost.value, ...posts.value].map((post) => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": `${siteUrl}${post.image}`,
          "datePublished": post.isoDate,
          "url": `${siteUrl}/blogs/${post.id}`,
          "author": {
            "@type": "Organization",
            "name": post.author.name
          }
        }))
      })
    }
  ]
});

// Filtrage dynamique
const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesCategory = activeCategory.value === "all" || post.category === activeCategory.value;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>