<template>
  <main class="min-h-screen bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">

    <!-- État de chargement -->
    <div v-if="pending" class="min-h-[70vh] flex items-center justify-center px-4">
      <div class="text-center space-y-3">
        <i class="bx bx-loader-alt bx-spin text-4xl text-[#10b481]"></i>
        <p class="text-gray-500 text-sm">Chargement de l'article...</p>
      </div>
    </div>

    <!-- Cas où l'article existe -->
    <template v-else-if="post">
      <!-- Hero Section immersif -->
      <section class="relative bg-cover bg-center pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div class="absolute inset-0 z-0">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/85 to-[#112830]/60"></div>
        </div>

        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <NuxtLink
            :to="localePath('/blogs')"
            class="inline-flex items-center gap-2 text-white/80 hover:text-[#10b481] font-semibold text-sm mb-8 transition-colors group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <i class="bx bx-left-arrow-alt text-xl group-hover:-translate-x-1 transition-transform"></i>
            <span>{{ t("backToBlog") || "Retour aux articles" }}</span>
          </NuxtLink>

          <div class="space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full bg-[#10b481] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
              {{ post.categoryName }}
            </span>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {{ post.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-200">
              <div class="flex items-center gap-3">
                <img :src="post.author.avatar" :alt="post.author.name" class="w-10 h-10 rounded-full object-cover border-2 border-[#10b481]" />
                <div>
                  <p class="font-semibold text-white leading-none">{{ post.author.name }}</p>
                </div>
              </div>

              <span class="text-gray-400">•</span>

              <div class="flex items-center gap-1.5">
                <i class="bx bx-calendar text-[#10b481] text-lg"></i>
                <span>{{ post.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Corps de l'article -->
      <section class="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 pb-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <!-- Contenu Principal -->
          <div class="lg:col-span-8 bg-white dark:bg-[#112830] p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 space-y-8">
            <!-- <p class="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed border-l-4 border-[#10b481] pl-4 italic bg-gray-50 dark:bg-white/5 py-3 rounded-r-lg">
              {{ post.excerpt }}
            </p> -->

            <div class="overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-white/5">
              <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover" />
            </div>

            <div
              class="article-body prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 font-inter leading-relaxed"
              v-html="post.content"
            ></div>

            <div class="border-t border-gray-100 dark:border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <span class="text-sm font-bold text-gray-800 dark:text-white">Partager cet article :</span>
              <div class="flex items-center gap-3">
                <a
                  :href="shareLinks.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Partager sur Facebook"
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#10b481] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
                >
                  <i class="bx bxl-facebook text-xl"></i>
                </a>
                <a
                  :href="shareLinks.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Partager sur LinkedIn"
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#10b481] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
                >
                  <i class="bx bxl-linkedin text-xl"></i>
                </a>
                <a
                  :href="shareLinks.twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Partager sur Twitter"
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#10b481] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
                >
                  <i class="bx bxl-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Barre latérale -->
          <aside class="lg:col-span-4 space-y-6">
            <div class="bg-white dark:bg-[#112830] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg text-center">
              <img :src="post.author.avatar" :alt="post.author.name" class="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-[#10b481]" />
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ post.author.name }}</h3>
              <p class="text-xs text-[#10b481] font-semibold mb-3">{{ post.author.role }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {{ post.author.bio }}
              </p>
            </div>

            <div class="bg-gradient-to-br from-[#112830] to-[#10b481] p-6 rounded-2xl text-white shadow-lg space-y-4">
              <i class="bx bx-bulb text-4xl text-white/80"></i>
              <h3 class="text-xl font-bold">Un projet AgriTech en tête ?</h3>
              <p class="text-xs text-gray-200 leading-relaxed">
                SmartSaha vous accompagne dans la numérisation et l'optimisation de vos exploitations agricoles.
              </p>
              <NuxtLink
                :to="localePath('/contact')"
                class="inline-block w-full text-center py-2.5 px-4 rounded-full bg-white text-[#112830] font-bold text-xs hover:bg-gray-100 transition-colors shadow"
              >
                Contactez nos experts
              </NuxtLink>
            </div>
          </aside>

        </div>

        <!-- Section Articles Connexes -->
        <div v-if="relatedPosts.length > 0" class="mt-20">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-8">Articles similaires</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NuxtLink
              v-for="rel in relatedPosts"
              :key="rel.id"
              :to="localePath(`/blogs/${rel.id}`)"
              class="group bg-white dark:bg-[#112830] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-md hover:shadow-xl transition-all flex flex-col"
            >
              <div class="aspect-video relative overflow-hidden">
                <img :src="rel.image" :alt="rel.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span class="text-xs text-[#10b481] font-bold uppercase">{{ rel.categoryName }}</span>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-white mt-1 group-hover:text-[#10b481] transition-colors line-clamp-2">
                    {{ rel.title }}
                  </h3>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-400 mt-4">
                  <i class="bx bx-calendar"></i>
                  <span>{{ rel.date }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>

    <!-- Erreur si l'article n'existe pas -->
    <div v-else class="min-h-[70vh] flex items-center justify-center px-4">
      <div class="text-center py-20 space-y-4 max-w-md bg-white dark:bg-[#112830] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5">
        <div class="w-16 h-16 mx-auto rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-3xl">
          <i class="bx bx-error-circle"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Article introuvable</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Aucun article ne correspond à cet identifiant ou l'article a été déplacé.
        </p>
        <NuxtLink
          :to="localePath('/blogs')"
          class="inline-block px-6 py-3 bg-[#10b481] text-white font-bold text-sm rounded-full hover:bg-[#0e9a6e] transition-colors shadow-lg"
        >
          Retour au blog
        </NuxtLink>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const localePath = useLocalePath();
const route = useRoute();
const currentUrl = useRequestURL();
const config = useRuntimeConfig();

const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang]?.[key] || key;
};

// 1. Récupération de l'ID depuis l'URL
const postId = Number(route.params.id);

// ---- Helpers (identiques à la page liste) ----
const formatDate = (isoString?: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const estimateReadTime = (content?: string) => {
  if (!content) return "3 min de lecture";
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min de lecture`;
};

const truncateContent = (content?: string, maxLength = 220) => {
  if (!content) return "";
  const clean = content.trim();
  if (clean.length <= maxLength) return clean;
  const truncated = clean.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
};

const mapPost = (p: any) => ({
  id: p.id,
  title: p.title,
  category: p.categorie_id,
  categoryName: p.category?.name ?? "",
  image: p.image ?? "/bg-hero-1.jpg",
  excerpt: truncateContent(p.content, 220),
  content: p.content ?? "",
  date: formatDate(p.createdAt),
  isoDate: p.createdAt ?? "",
  readTime: estimateReadTime(p.content),
  author: {
    name: "Équipe SmartSaha", // pas de nom/role/bio auteur renvoyés par l'API pour l'instant
    role: "Pôle R&D & Agronomie",
    avatar: "/logo.png",
    bio: "Experts en agronomie numérique et digitalisation agricole.",
  },
});

// 2. Récupération de l'article via l'API
const {
  data: dataPost,
  pending: pendingPost,
  error: errorPost,
} = await useFetch(`${config.public.apiBase}/blogs/${postId}`);

// 3. Récupération de la liste complète (pour les articles similaires)
const {
  data: dataAllPosts,
  pending: pendingAll,
} = await useFetch(`${config.public.apiBase}/blogs/list`);

const pending = computed(() => pendingPost.value || pendingAll.value);

const post = computed(() => {
  const raw = dataPost.value?.blog;
  return raw ? mapPost(raw) : null;
});

const allPosts = computed(() => {
  const raw = dataAllPosts.value?.blogs ?? [];
  return raw.map(mapPost);
});

// 4. Liens dynamiques de partage
const shareLinks = computed(() => {
  const url = encodeURIComponent(currentUrl.href);
  const title = encodeURIComponent(post.value?.title || "");
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  };
});

// 5. Méta-balises SEO dynamiques
watchEffect(() => {
  if (post.value) {
    useSeoMeta({
      title: `${post.value.title}`,
      ogTitle: post.value.title,
      description: post.value.excerpt,
      ogDescription: post.value.excerpt,
      ogImage: post.value.image,
      twitterCard: "summary_large_image",
    });
  }
});

// 6. Sélection d'articles connexes (même catégorie, article courant exclu)
const relatedPosts = computed(() => {
  if (!post.value) return [];
  const sameCategory = allPosts.value.filter(
    (p) => p.id !== postId && p.category === post.value!.category
  );
  if (sameCategory.length > 0) return sameCategory.slice(0, 2);
  // Fallback : si pas d'autre article dans la même catégorie, prendre les plus récents
  return allPosts.value.filter((p) => p.id !== postId).slice(0, 2);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-body p {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}
</style>