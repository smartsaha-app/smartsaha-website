<template>
  <div>
    <!-- Hero -->
    <section
      class="relative bg-cover bg-center bg-white/65 pt-16 sm:pt-20"
      style="background-image: url('/bg-hero-1.jpg')"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#10b481]/50"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col items-start gap-6"
      >
        <div
          class="flex-1 flex flex-col justify-center gap-2 text-white z-10"
          data-aos="fade-up"
        >
          <p
            class="rounded-full w-max bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-5 py-2 uppercase text-xs tracking-[0.2em] font-bold"
          >
            <span
              class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"
            ></span>

            {{ t("blogBadge") }}
          </p>

          <h1
            class="text-hero text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            {{ t("blogHeroTitle") }}
          </h1>

          <p class="text-gray-200 max-w-xl text-lg">
            {{ t("blogHeroSubtitle") }}
          </p>

          <button
            @click="scrollTo('articles')"
            :aria-label="t('browseArticlesAriaLabel')"
            class="inline-flex items-center w-max gap-3 border-2 border-white bg-white text-[#112830] hover:bg-[#10b481] hover:border-[#10b481] hover:text-white px-8 py-3 rounded-full transition-all duration-300 mt-4 font-semibold group shadow-lg cursor-pointer"
          >
            {{ t("readMore") }}

            <i
              class="bx bx-down-arrow-alt text-2xl group-hover:translate-y-1 transition-transform"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section
      id="articles"
      class="py-16 sm:py-24 bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6">

        <!-- Filtres -->
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4 mb-12"
          data-aos="fade-up"
        >
          <div
            class="flex flex-wrap items-center gap-2 w-full md:w-auto"
            role="group"
            :aria-label="t('filterArticlesByCategory')"
          >
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

          <!-- Recherche -->
          <div class="relative w-full md:w-72">
            <label
              for="search-input"
              class="sr-only"
            >
              {{ t("searchArticlesPlaceholder") }}
            </label>

            <input
              id="search-input"
              v-model="searchQuery"
              type="text"
              :placeholder="t('searchArticlesPlaceholder')"
              class="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-[#112830] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:border-[#10b481] transition-colors"
            />

            <i
              class="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
              aria-hidden="true"
            ></i>
          </div>
        </div>

        <!-- Loading -->
        <div
          v-if="pendingPosts || pendingCategories"
          class="text-center py-16"
        >
          <i
            class="bx bx-loader-alt bx-spin text-4xl text-[#10b481]"
            aria-hidden="true"
          ></i>

          <p class="text-gray-500 text-sm mt-2">
            {{ t("loadingArticles") }}
          </p>
        </div>

        <!-- Error -->
        <div
          v-else-if="errorPosts || errorCategories"
          class="text-center py-16 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/5"
        >
          <i
            class="bx bx-error-circle text-5xl text-red-400 mb-3"
            aria-hidden="true"
          ></i>

          <h2 class="text-lg font-bold text-gray-700 dark:text-white mb-1">
            {{ t("blogErrorTitle") }}
          </h2>

          <p class="text-gray-500 text-sm">
            {{ t("tryAgainLater") }}
          </p>
        </div>

        <template v-else>

          <!-- Featured -->
          <article
            v-if="
              featuredPost &&
              activeCategory === 'all' &&
              !searchQuery
            "
            class="mb-14 group bg-white dark:bg-[#112830] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12"
            data-aos="fade-up"
          >
            <div
              class="lg:col-span-7 relative overflow-hidden aspect-video lg:aspect-auto"
            >
              <img
                :src="featuredPost.image"
                :alt="featuredPost.title"
                width="800"
                height="450"
                loading="eager"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <span
                class="absolute top-4 left-4 bg-[#10b481] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow"
              >
                {{ t("featuredBadge") }}
              </span>
            </div>

            <div
              class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
            >
              <div>
                <div
                  class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3"
                >
                  <span class="font-medium text-[#10b481]">
                    {{ featuredPost.categoryName }}
                  </span>

                  <span>•</span>

                  <time :datetime="featuredPost.isoDate">
                    {{ featuredPost.date }}
                  </time>
                </div>

                <h2
                  class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-[#10b481] transition-colors"
                >
                  <NuxtLink
                    :to="localePath(`/blogs/${featuredPost.id}`)"
                  >
                    {{ featuredPost.title }}
                  </NuxtLink>
                </h2>

                <p
                  class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6"
                >
                  {{ featuredPost.content?.slice(0, 250) }}...
                </p>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4"
              >
                <NuxtLink
                  :to="localePath(`/blogs/${featuredPost.id}`)"
                  class="inline-flex items-center gap-2 text-sm font-bold text-[#10b481] hover:translate-x-1 transition-transform"
                  :aria-label="`${t('readMore')} : ${featuredPost.title}`"
                >
                  {{ t("readMore") }}

                  <i
                    class="bx bx-right-arrow-alt text-xl"
                    aria-hidden="true"
                  ></i>
                </NuxtLink>
              </div>
            </div>
          </article>

          <!-- Grille -->
          <div
            v-if="filteredPosts.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <article
              v-for="post in filteredPosts"
              :key="post.id"
              class="group bg-white dark:bg-[#112830] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
              data-aos="fade-up"
            >
              <NuxtLink
                :to="localePath(`/blogs/${post.id}`)"
                class="relative overflow-hidden aspect-video block"
                tabindex="-1"
              >
                <img
                  :src="post.image"
                  :alt="post.title"
                  width="600"
                  height="338"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <span
                  class="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10"
                >
                  {{ post.categoryName }}
                </span>
              </NuxtLink>

              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div
                    class="flex items-center gap-2 text-xs text-gray-400 mb-3"
                  >
                    <i class="bx bx-calendar"></i>

                    <time :datetime="post.isoDate">
                      {{ post.date }}
                    </time>

                    <span>•</span>

                    <i class="bx bx-time-five"></i>

                    <span>
                      {{ post.readTime }}
                    </span>
                  </div>

                  <h3
                    class="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-[#10b481] transition-colors line-clamp-2"
                  >
                    <NuxtLink
                      :to="localePath(`/blogs/${post.id}`)"
                    >
                      {{ post.title }}
                    </NuxtLink>
                  </h3>

                  <p
                    class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6"
                  >
                    {{ post.excerpt }}
                  </p>
                </div>

                <div
                  class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4 mt-auto"
                >
                  <NuxtLink
                    :to="localePath(`/blogs/${post.id}`)"
                    class="text-sm font-semibold text-[#10b481] hover:underline flex items-center gap-1"
                    :aria-label="`${t('read')} : ${post.title}`"
                  >
                    {{ t("read") }}

                    <i
                      class="bx bx-chevron-right"
                      aria-hidden="true"
                    ></i>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <!-- Aucun résultat -->
          <div
            v-else
            class="text-center py-16 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/5"
          >
            <i
              class="bx bx-news text-5xl text-gray-400 mb-3"
              aria-hidden="true"
            ></i>

            <h2
              class="text-lg font-bold text-gray-700 dark:text-white mb-1"
            >
              {{ t("noArticlesFound") }}
            </h2>

            <p class="text-gray-500 text-sm">
              {{ t("adjustSearchFilters") }}
            </p>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const config = useRuntimeConfig();

// =====================================================
// SEO
// =====================================================

const siteUrl = "https://smart-saha.com";

const canonicalUrl = computed(
  () => `${siteUrl}${localePath("/blogs")}`
);

useSeoMeta({
  title: () => t("blogMetaTitle"),
  description: () => t("blogMetaDescription"),

  ogTitle: () => t("blogOgTitle"),
  ogDescription: () => t("blogOgDescription"),

  ogImage: `${siteUrl}/og-blog.jpg`,
  ogType: "website",

  twitterCard: "summary_large_image",
  twitterTitle: () => t("blogOgTitle"),
  twitterDescription: () => t("blogTwitterDescription"),
  twitterImage: `${siteUrl}/og-blog.jpg`,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: canonicalUrl,
    },
  ],
});

// =====================================================
// SCROLL
// =====================================================

const scrollTo = (id: string) => {

  if (import.meta.client) {

    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
};

// =====================================================
// CATÉGORIES
// =====================================================

const {
  data: dataCategory,
  pending: pendingCategories,
  error: errorCategories,
} = await useFetch(
  `${config.public.apiBase}/categories/list`,
  {
    key: () => `categories-${locale.value}`,

    query: () => ({
      locale: locale.value,
    }),

    watch: [locale],

    server: true,
  }
);

// =====================================================
// BLOGS
// =====================================================

const {
  data: dataPosts,
  pending: pendingPosts,
  error: errorPosts,
} = await useFetch(`${config.public.apiBase}/blogs/list`, {
  query: computed(() => ({
    locale: locale.value,
  })),
  watch: [locale],
});

// =====================================================
// FILTRES
// =====================================================

const activeCategory = ref<
  number | string
>("all");

const searchQuery = ref("");

// =====================================================
// DATE
// =====================================================

const dateLocaleMap: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  mg: "fr-MG",
};

const formatDate = (
  isoString?: string
) => {

  if (!isoString) {
    return "";
  }

  return new Date(
    isoString
  ).toLocaleDateString(
    dateLocaleMap[locale.value] || "fr-FR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
};

// =====================================================
// TEMPS DE LECTURE
// =====================================================

const estimateReadTime = (
  content?: string
) => {

  if (!content) {
    return `3 ${t("minReadSuffix")}`;
  }

  const words =
    content
      .trim()
      .split(/\s+/)
      .length;

  return `${Math.max(
    1,
    Math.round(words / 200)
  )} ${t("minReadSuffix")}`;
};

// =====================================================
// TRONCATURE
// =====================================================

const truncateContent = (
  content?: string,
  maxLength = 140
) => {

  if (!content) {
    return "";
  }

  const clean =
    content.trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  const truncated =
    clean.slice(0, maxLength);

  const lastSpace =
    truncated.lastIndexOf(" ");

  return `${truncated.slice(
    0,
    lastSpace > 0
      ? lastSpace
      : maxLength
  )}…`;
};

// =====================================================
// CATÉGORIES
// =====================================================

const categories = computed(() => {

  const apiCats =
    dataCategory.value?.categories ?? [];

  return [
    {
      id: "all",
      name: t("allArticles"),
    },

    ...apiCats.map(
      (c: any) => ({
        id: c.id,
        name: c.name,
      })
    ),
  ];
});

// =====================================================
// BLOGS
// =====================================================

const posts = computed(() => {

  const raw =
    dataPosts.value?.blogs ?? [];

  return raw.map(
    (p: any) => ({

      id: p.id,

      // IMPORTANT :
      // Ces champs viennent maintenant
      // directement du backend selon locale
      title: p.title ?? "",

      excerpt:
        p.excerpt
          ? truncateContent(
              p.excerpt,
              140
            )
          : truncateContent(
              p.content,
              140
            ),

      content:
        p.content ?? "",

      category:
        p.categorie_id,

      categoryName:
        p.category?.name ?? "",

      image:
        p.image ??
        "/bg-hero-1.jpg",

      date:
        formatDate(
          p.createdAt
        ),

      isoDate:
        p.createdAt ?? "",

      readTime:
        estimateReadTime(
          p.content
        ),

      author: {
        name:
          t("teamName"),

        avatar:
          "/logo.png",
      },
    })
  );
});

// =====================================================
// ARTICLE À LA UNE
// =====================================================

const featuredPost =
  computed(
    () => posts.value[0] ?? null
  );

// =====================================================
// FILTRAGE
// =====================================================

const filteredPosts =
  computed(() => {

    const search =
      searchQuery.value
        .trim()
        .toLowerCase();

    return posts.value.filter(
      (post) => {

        const isFeatured =
          featuredPost.value &&
          post.id ===
            featuredPost.value.id &&
          activeCategory.value ===
            "all" &&
          !search;

        if (isFeatured) {
          return false;
        }

        const matchesCategory =
          activeCategory.value ===
            "all" ||
          Number(
            activeCategory.value
          ) ===
            Number(post.category);

        const matchesSearch =
          !search ||
          post.title
            .toLowerCase()
            .includes(search) ||
          post.excerpt
            .toLowerCase()
            .includes(search);

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );
  });

// =====================================================
// JSON-LD
// =====================================================

watchEffect(() => {

  if (!posts.value.length) {
    return;
  }

  useHead({
    script: [
      {
        type: "application/ld+json",

        children:
          JSON.stringify({
            "@context":
              "https://schema.org",

            "@type":
              "Blog",

            name:
              t("blogMetaTitle"),

            description:
              t("blogMetaDescription"),

            url:
              canonicalUrl.value,

            blogPost:
              posts.value.map(
                (post) => ({
                  "@type":
                    "BlogPosting",

                  headline:
                    post.title,

                  description:
                    post.excerpt,

                  image:
                    post.image,

                  datePublished:
                    post.isoDate,

                  url:
                    `${siteUrl}${localePath(
                      `/blogs/${post.id}`
                    )}`,

                  inLanguage:
                    locale.value,

                  author: {
                    "@type":
                      "Organization",

                    name:
                      post.author.name,
                  },
                })
              ),
          }),
      },
    ],
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