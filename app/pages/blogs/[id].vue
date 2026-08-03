<template>
  <main class="min-h-screen bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">
    
    <!-- Cas où l'article existe -->
    <template v-if="post">
      <!-- Hero Section immersif -->
      <section class="relative bg-cover bg-center pt-24 pb-16 sm:pt-32 sm:pb-24">
        <!-- Image de fond avec overlay dégradé sombre -->
        <div class="absolute inset-0 z-0">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/85 to-[#112830]/60"></div>
        </div>

        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <!-- Bouton Retour -->
          <NuxtLink
            :to="localePath('/blogs')"
            class="inline-flex items-center gap-2 text-white/80 hover:text-[#10b481] font-semibold text-sm mb-8 transition-colors group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <i class="bx bx-left-arrow-alt text-xl group-hover:-translate-x-1 transition-transform"></i>
            <span>{{ t("backToBlog") || "Retour aux articles" }}</span>
          </NuxtLink>

          <!-- Métadonnées & Titre -->
          <div class="space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full bg-[#10b481] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
              {{ post.category }}
            </span>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {{ post.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-200">
              <!-- Auteur -->
              <div class="flex items-center gap-3">
                <img :src="post.author.avatar" :alt="post.author.name" class="w-10 h-10 rounded-full object-cover border-2 border-[#10b481]" />
                <div>
                  <p class="font-semibold text-white leading-none">{{ post.author.name }}</p>
                </div>
              </div>

              <span class="text-gray-400">•</span>

              <!-- Date -->
              <div class="flex items-center gap-1.5">
                <i class="bx bx-calendar text-[#10b481] text-lg"></i>
                <span>{{ post.date }}</span>
              </div>

              <span class="text-gray-400">•</span>

              <!-- Temps de lecture -->
              <div class="flex items-center gap-1.5">
                <i class="bx bx-time-five text-[#10b481] text-lg"></i>
                <span>{{ post.readTime }}</span>
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
            <!-- Chapeau / Résumé -->
            <p class="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed border-l-4 border-[#10b481] pl-4 italic bg-gray-50 dark:bg-white/5 py-3 rounded-r-lg">
              {{ post.excerpt }}
            </p>

            <!-- Image mise en avant complémentaire si besoin -->
            <div class="overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-white/5">
              <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover" />
            </div>

            <!-- HTML Content -->
            <div 
              class="article-body prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 font-inter leading-relaxed"
              v-html="post.content"
            ></div>

            <!-- Partage Réseaux Sociaux en bas -->
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

          <!-- Barre latérale / Sidebar -->
          <aside class="lg:col-span-4 space-y-6">
            <!-- Carte Auteur -->
            <div class="bg-white dark:bg-[#112830] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg text-center">
              <img :src="post.author.avatar" :alt="post.author.name" class="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-[#10b481]" />
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ post.author.name }}</h3>
              <p class="text-xs text-[#10b481] font-semibold mb-3">{{ post.author.role }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {{ post.author.bio }}
              </p>
            </div>

            <!-- Encadré Call to Action -->
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
                  <span class="text-xs text-[#10b481] font-bold uppercase">{{ rel.category }}</span>
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

const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang]?.[key] || key;
};

// 1. Récupération de l'ID depuis l'URL
const postId = Number(route.params.id);

// 2. Base de données simulée des articles
const allPosts = computed(() => [
  {
    id: 1,
    title: t("blogPost1Title") || "Comment l'IA et l'imagerie satellite révolutionnent la mesure du carbone agricole",
    excerpt: "Découvrez les dernières avancées technologiques permettant de quantifier avec précision le carbone séquestré dans les sols et la biomasse végétale grâce aux données multispectrales.",
    content: `
      <p class="mb-4">L'agriculture fait face à un double défi majeur : augmenter la production alimentaire tout en réduisant son empreinte carbone globale. Heureusement, la convergence entre l'intelligence artificielle et la télédétection spatiale offre de nouvelles opportunités.</p>
      
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">1. La précision des données multispectrales</h3>
      <p class="mb-4">Grâce aux constellations de satellites modernes, il est aujourd'hui possible d'analyser la dynamique de la biomasse végétale avec un niveau de détail inédit. Les bandes spectrales proches de l'infrarouge permettent de calculer des indices de végétation précis (NDVI, EVI) pour estimer la croissance de la matière organique.</p>
      
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">2. Des modèles IA pour prédire la séquestration</h3>
      <p class="mb-4">Les algorithmes d'apprentissage automatique (Machine Learning) entraînés sur des échantillons de sol réels permettent d'extrapoler les quantités de carbone stockées sur des milliers d'hectares avec un taux d'erreur inférieur à 5%.</p>
      
      <blockquote class="my-6 border-l-4 border-[#10b481] pl-4 italic text-gray-600 dark:text-gray-300">
        "L'automatisation du MRV (Mesure, Notification et Vérification) divise par dix le coût de certification des crédits carbone pour les agriculteurs."
      </blockquote>
      
      <p>Cette démocratisation de l'accès aux marchés du carbone constitue un levier financier majeur pour inciter à la transition vers des pratiques d'agriculture régénérative.</p>
    `,
    category: "Carbone & MRV",
    date: "12 Mai 2026",
    readTime: "6 min de lecture",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Équipe SmartSaha",
      role: "Pôle R&D & Agronomie",
      avatar: "/logo.png",
      bio: "Experts en télédétection, agronomie numérique et valorisation des crédits carbone."
    }
  },
  {
    id: 2,
    title: t("blogPost2Title") || "Optimisation de l'irrigation grâce aux capteurs connectés LoRaWAN",
    excerpt: "Comment économiser jusqu'à 40% d'eau en surveillant le potentiel hydrique des sols en temps réel sur vos cultures.",
    content: `
      <p class="mb-4">La gestion de l'eau est devenue la priorité numéro un pour les exploitations agricoles confrontées aux sécheresses répétées. Les réseaux de capteurs IoT basse consommation (LoRaWAN) apportent une réponse concrète.</p>
      <p class="mb-4">En mesurant en continu la tension de l'eau dans le sol à différentes profondeurs, l'agriculteur sait exactement quand déclencher l'irrigation et quelle quantité apporter, évitant ainsi le gaspillage et le lessivage des nutriments.</p>
    `,
    category: "IoT & Capteurs",
    date: "28 Avril 2026",
    readTime: "4 min de lecture",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Jean Marc",
      role: "Ingénieur IoT",
      avatar: "/logo.png",
      bio: "Spécialiste de la conception et du déploiement de réseaux de capteurs environnementaux en milieu rural."
    }
  },
  {
    id: 3,
    title: t("blogPost3Title") || "Les défis du MRV pour les coopératives agricoles",
    excerpt: "Analyse des obstacles techniques et financiers auxquels font face les petites exploitations pour certifier leurs crédits carbone.",
    content: `
      <p class="mb-4">La certification des crédits carbone représente une opportunité de revenus complémentaires pour les coopératives, mais les exigences de preuve et les audits sur le terrain restent souvent prohibitifs.</p>
    `,
    category: "Carbone & MRV",
    date: "15 Avril 2026",
    readTime: "5 min de lecture",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "SmartSaha Research",
      role: "Consultant Carbone",
      avatar: "/logo.png",
      bio: "Accompagnement stratégique des organisations agricoles dans la transition écologique."
    }
  }
]);

// 3. Recherche de l'article courant
const post = computed(() => allPosts.value.find((p) => p.id === postId));

// 4. Liens dynamiques de partage
const shareLinks = computed(() => {
  const url = encodeURIComponent(currentUrl.href);
  const title = encodeURIComponent(post.value?.title || "");
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`
  };
});

// 5. Méta-balises SEO dynamiques
if (post.value) {
  useSeoMeta({
    title: `${post.value.title} - SmartSaha`,
    ogTitle: post.value.title,
    description: post.value.excerpt,
    ogDescription: post.value.excerpt,
    ogImage: post.value.image,
    twitterCard: 'summary_large_image',
  });
}

// 6. Sélection d'articles connexes
const relatedPosts = computed(() => 
  allPosts.value.filter((p) => p.id !== postId).slice(0, 2)
);
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