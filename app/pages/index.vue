<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center bg-[#112830] min-h-[85vh] flex items-center pt-16 sm:pt-20"
      style="background-image: url('/bg-hero-1.jpg')"
    >
      <!-- Overlay Sombre & Green Premium -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/80 to-[#10b481]/40 transition-colors duration-300"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full z-10"
      >
        <!-- Réseaux Sociaux Sidebar (Desktop) -->
        <div class="hidden lg:flex flex-col items-center gap-6 mr-4" data-aos="fade-right">
          <div class="flex flex-col gap-4">
            <a 
              href="https://share.google/xF5gkcyYn6EsR5cPA" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="text-white/80 hover:text-[#10b481] transition-transform duration-300 transform hover:scale-125"
            >
              <i class="bx bxl-linkedin text-2xl"></i>
            </a>
            <a 
              href="https://www.facebook.com/share/1EHaGKpfnD/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="text-white/80 hover:text-[#10b481] transition-transform duration-300 transform hover:scale-125"
            >
              <i class="bx bxl-facebook text-2xl"></i>
            </a>
          </div>
          <div class="w-px h-20 bg-white/30 my-2"></div>
          <span class="text-white/70 tracking-widest -rotate-90 text-xs uppercase font-medium whitespace-nowrap">
            {{ t("followUs") }}
          </span>
        </div>

        <!-- Contenu Central Hero -->
        <div class="flex-1 flex flex-col justify-center items-start gap-4 text-white" data-aos="fade-up" data-aos-delay="100">
          
          <!-- Badge Category -->
          <div class="rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2.5 px-4 py-1.5 uppercase text-xs tracking-[0.2em] font-bold text-white shadow-sm">
            <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
            {{ t("titleHero") || "À propos de nous" }}
          </div>
          
          <!-- Main Heading -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-2 tracking-tight max-w-4xl">
            {{ t("accrocheHero") || "Pionniers de la Digitalisation Agricole à Madagascar" }}
          </h1>

          <!-- Description -->
          <p class="text-gray-200 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
            {{ t("heroText") || "SmartSaha combine géospatial, données agricoles et solutions mobiles pour renforcer la résilience des producteurs et valoriser leurs activités." }}
          </p>

          <!-- CTA Button -->
          <button
            @click="scrollTo('about')"
            class="inline-flex items-center gap-3 border-2 border-white bg-white text-[#112830] hover:bg-[#10b481] hover:border-[#10b481] hover:text-white px-8 py-3.5 rounded-full transition-all duration-300 mt-4 font-semibold group shadow-xl cursor-pointer"
          >
            <span>{{ t("learnMore") || "Découvrir notre histoire" }}</span>
            <i class="bx bx-right-arrow-alt text-2xl group-hover:translate-x-1.5 transition-transform duration-300"></i>
          </button>

        </div>
      </div>
    </section>

    <!-- Section Présentation & Activités -->
    <section id="about" class="py-20 sm:py-28 bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
        
        <!-- Présentation & Mission -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-6" data-aos="fade-right">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest border border-[#10b481]/20">
              <span class="w-2 h-2 rounded-full bg-[#10b481]"></span>
              Qui sommes-nous ?
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#112830] dark:text-white leading-tight">
              Une AgTech malgache engagée pour une agriculture intelligente et durable
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              Créée le <strong class="text-[#10b481]">09 janvier 2025</strong>, <strong>SmartSaha</strong> est née de l'association d'experts passionnés par les chaînes de valeur agricoles, les systèmes d'information géographique (SIG), l'analyse de données et le développement logiciel.
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              Formalisée à Madagascar, l'entreprise se positionne comme un partenaire technologique incontournable pour les producteurs, coopératives, ONG et entreprises du secteur agronomique.
            </p>

            <!-- Box Mission -->
            <div class="p-6 rounded-2xl bg-white dark:bg-[#112830] border-l-4 border-[#10b481] shadow-md dark:shadow-none dark:border-y dark:border-r dark:border-white/10 space-y-2">
              <h3 class="font-bold text-lg text-[#112830] dark:text-white flex items-center gap-2">
                <i class="bx bx-target-lock text-[#10b481] text-2xl"></i> Notre Mission
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Proposer une plateforme numérique intégrée, multilingue et utilisable hors connexion, combinant l'agriculture de précision, la traçabilité et un accompagnement technique sur mesure.
              </p>
            </div>
          </div>

          <!-- Piliers & Fonctionnalités Clés -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5" data-aos="fade-left">
            <div class="p-6 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div class="w-12 h-12 rounded-xl bg-[#10b481]/10 flex items-center justify-center text-[#10b481] text-2xl font-bold">
                <i class="bx bx-map-alt"></i>
              </div>
              <h4 class="font-bold text-[#112830] dark:text-white text-base">Géospatial & SIG</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Cartographie précise des parcelles et suivi par satellite.</p>
            </div>

            <div class="p-6 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div class="w-12 h-12 rounded-xl bg-[#10b481]/10 flex items-center justify-center text-[#10b481] text-2xl font-bold">
                <i class="bx bx-wifi-off"></i>
              </div>
              <h4 class="font-bold text-[#112830] dark:text-white text-base">Mode Hors-Ligne</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Collecte fluide des données même en zones rurales isolées.</p>
            </div>

            <div class="p-6 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div class="w-12 h-12 rounded-xl bg-[#10b481]/10 flex items-center justify-center text-[#10b481] text-2xl font-bold">
                <i class="bx bx-store-alt"></i>
              </div>
              <h4 class="font-bold text-[#112830] dark:text-white text-base">Marketplace</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Mise en relation directe entre producteurs et acheteurs.</p>
            </div>

            <div class="p-6 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div class="w-12 h-12 rounded-xl bg-[#10b481]/10 flex items-center justify-center text-[#10b481] text-2xl font-bold">
                <i class="bx bx-cloud-rain"></i>
              </div>
              <h4 class="font-bold text-[#112830] dark:text-white text-base">Alertes & Climat</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Suivi météorologique et alertes feux de brousse en temps réel.</p>
            </div>
          </div>
        </div>

        <!-- Ce que nous faisons (Activités Clés) -->
        <div class="space-y-12" data-aos="fade-up">
          <div class="text-center max-w-2xl mx-auto space-y-3">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#112830] dark:text-white">
              Ce que fait SmartSaha
            </h2>
            <div class="w-16 h-1 bg-[#10b481] mx-auto rounded-full mb-4"></div>
            <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Nos fonctionnalités et outils numériques répondent directement aux enjeux du terrain pour moderniser le secteur agricole.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div 
              v-for="(activity, idx) in activities" 
              :key="idx"
              class="p-6 bg-white dark:bg-[#112830] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
            >
              <div class="p-3.5 rounded-xl bg-[#10b481]/10 text-[#10b481] text-2xl font-bold shrink-0">
                <i :class="activity.icon"></i>
              </div>
              <div class="space-y-1">
                <h3 class="font-bold text-[#112830] dark:text-white text-base">
                  {{ activity.title }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {{ activity.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Section Équipe (Team / Visionaries) -->
    <section id="team" class="relative bg-white dark:bg-[#071317] py-24 sm:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden transition-colors duration-300 border-t border-gray-200/60 dark:border-white/5">
      <!-- Éléments décoratifs flous en arrière-plan -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto z-10">
        <!-- Section Header -->
        <div class="text-center mb-20" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-4 border border-[#10b481]/20">
            <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
            Our Visionaries
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#112830] dark:text-white mb-4">
            {{ t("teamTitle") || "Notre Équipe Dirigeante" }}
          </h2>
          <div class="w-20 h-1 bg-[#10b481] mx-auto rounded-full"></div>
        </div>

        <!-- Team Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 pt-6">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="group relative pt-10"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
          >
            <!-- 1. Forme colorée en arrière-plan -->
            <div 
              class="absolute inset-0 top-10 rounded-[2.5rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 group-hover:scale-105 opacity-80"
              :class="member.bgAccent"
            ></div>

            <!-- 2. Carte Principale -->
            <div class="relative bg-white dark:bg-[#112830] rounded-[2.5rem] p-8 pt-16 text-center shadow-xl dark:shadow-2xl border border-gray-100 dark:border-white/10 transition-all duration-500 group-hover:-translate-y-2 flex flex-col items-center h-full">
              
              <!-- Photo de Profil Circulaire -->
              <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#112830] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Nom du membre -->
              <h3 class="text-xl sm:text-2xl font-bold text-[#112830] dark:text-white mb-1 group-hover:text-[#10b481] transition-colors">
                {{ member.name }}
              </h3>

              <!-- Poste / Rôle -->
              <p class="text-xs sm:text-sm italic font-medium text-[#10b481] mb-5">
                {{ member.role }}
              </p>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4 mb-8">
                {{ member.description }}
              </p>

              <!-- Liens Réseaux Sociaux -->
              <div class="mt-auto pt-4 flex items-center justify-center gap-3 border-t border-gray-100 dark:border-white/10 w-full">
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

    <!-- Section CTA (Call to Action) Final -->
    <section class="relative py-20 bg-[#112830] text-white overflow-hidden">
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 z-10" data-aos="zoom-in">
        <h2 class="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
          Prêt à moderniser vos activités agricoles ?
        </h2>
        <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Que vous soyez un producteur, une coopérative, une ONG ou un investisseur, découvrez comment nos solutions numériques peuvent propulser vos projets.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <NuxtLink 
            to="/contact" 
            class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#10b481] hover:bg-[#0e9b6f] text-white font-bold transition-all duration-300 shadow-xl hover:scale-105"
          >
            <span>Demander une démonstration</span>
            <i class="bx bx-right-arrow-alt text-2xl"></i>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section FAQ (Foire Aux Questions) -->
    <section class="py-20 sm:py-28 bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300 border-t border-gray-200/60 dark:border-white/5">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-3 border border-[#10b481]/20">
            FAQ
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-[#112830] dark:text-white mb-3">
            {{ t("faqTitle") || "Questions Fréquentes" }}
          </h2>
          <div class="w-16 h-1 bg-[#10b481] mx-auto rounded-full mb-4"></div>
          <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Toutes les réponses à vos questions sur SmartSaha et nos solutions.
          </p>
        </div>

        <div class="space-y-4" data-aos="fade-up" data-aos-delay="100">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white dark:bg-[#112830] rounded-2xl border border-gray-200/80 dark:border-white/10 overflow-hidden shadow-sm transition-all duration-300"
          >
            <button 
              @click="toggleFaq(index)"
              :aria-expanded="activeFaq === index"
              class="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
            >
              <span class="font-bold text-[#112830] dark:text-white text-base sm:text-lg">
                {{ faq.question }}
              </span>
              <div class="w-8 h-8 rounded-full bg-[#10b481]/10 text-[#10b481] flex items-center justify-center shrink-0 transition-transform duration-300" :class="{ 'rotate-180': activeFaq === index }">
                <i class="bx bx-chevron-down text-xl"></i>
              </div>
            </button>
            <div 
              v-show="activeFaq === index"
              class="px-6 pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

// Configuration SEO Nuxt 3
useHead({
  title: "À propos",
  meta: [
    {
      name: "description",
      content:
        "Découvrez l'histoire, la mission et l'équipe de SmartSaha, l'AgTech malgache pionnière dans la digitalisation et la traçabilité agricole.",
    },
  ],
});

// Déclare la page comme site officiel
useSchemaOrg([
  defineWebSite({
    name: 'SmartSaha',
  }),
  defineOrganization({
    name: 'SmartSaha',
    logo: '/logo.png',
    sameAs: [
      'https://www.facebook.com/share/1EHaGKpfnD/',
      'https://share.google/xF5gkcyYn6EsR5cPA'
    ],
  })
]);

const languageStore = useLanguageStore();

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

// Gestion de l'état de la FAQ
const activeFaq = ref<number | null>(0);
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

// Questions fréquentes
const faqs = computed(() => [
  {
    question: "À qui s'adressent les solutions de SmartSaha ?",
    answer: "Nos solutions sont conçues pour l'ensemble des acteurs de la chaîne de valeur agricole à Madagascar : les producteurs individuels, les coopératives, les entreprises agro-industrielles, ainsi que les ONG et projets de développement."
  },
  {
    question: "Comment fonctionne l'application dans les zones sans connexion internet ?",
    answer: "SmartSaha intègre une architecture 'Offline-First'. Vous pouvez effectuer des collectes de données, géolocaliser des parcelles et enregistrer des informations sur le terrain sans réseau. Dès qu'une connexion internet est détectée, les données sont automatiquement synchronisées."
  },
  {
    question: "Quels sont les avantages de la cartographie parcellaire SIG ?",
    answer: "La cartographie SIG permet de calculer la superficie exacte des exploitations, de suivre l'état de santé de la végétation via l'imagerie satellite et de garantir une traçabilité rigoureuse exigée par les marchés locaux et internationaux."
  },
  {
    question: "Comment puis-je bénéficier d'une démonstration de la plateforme ?",
    answer: "Il vous suffit de cliquer sur le bouton 'Demander une démonstration' ou de nous contacter directement via notre formulaire. Notre équipe planifiera une présentation adaptée à vos besoins spécifiques."
  }
]);

// Activités de l'entreprise
const activities = ref([
  {
    icon: "bx bx-data",
    title: "Collecte & Analyse de données",
    description: "Centralisation des données agricoles terrain pour alimenter les indicateurs de performance."
  },
  {
    icon: "bx bx-map",
    title: "Cartographie des parcelles",
    description: "Délimitation précise des périmètres d'exploitation et analyse de la santé végétale."
  },
  {
    icon: "bx bx-line-chart",
    title: "Suivi des exploitations",
    description: "Accompagnement continu des producteurs et coopératives au fil de la campagne agricole."
  },
  {
    icon: "bx bx-qr-scan",
    title: "Traçabilité des cultures",
    description: "Assurance de la provenance et du respect des normes pour chaque récolte."
  },
  {
    icon: "bx bx-file",
    title: "Tableaux de bord & Reporting",
    description: "Génération automatique de rapports de suivi-évaluation pour la prise de décision."
  },
  {
    icon: "bx bx-cloud-light-rain",
    title: "Informations climatiques & Feux",
    description: "Diffusion d'alertes précoces de feux de brousse et prévisions météo localisées."
  }
]);

// Nuances de couleurs pour le fond incliné derrière chaque carte
const teamMembers = computed(() => [
  {
    name: "Michel Raherimenanantsoa",
    role: t("teamJob1") || "Expert Chaînes de Valeur",
    description: t("teamJobDesc1") || "Spécialiste en développement des chaînes de valeur agricoles et investissements à impact.",
    image: "/Michel.jpg",
    bgAccent: "bg-[#099268]",
    linkedin: "https://www.linkedin.com/in/michel-raherimanantsoa-2bab19a9",
    email: "smartsaapp@gmail.com"
  },
  {
    name: "Fitahiana Rahetimazava",
    role: t("teamJob2") || "Responsable Données Géospatiales",
    description: t("teamJobDesc2") || "Expert en télédétection, SIG et traitement d'imagerie satellite pour l'agriculture.",
    image: "/Fitahiana.jpg",
    bgAccent: "bg-[#10b481]",
    linkedin: "https://www.linkedin.com/in/fitahiana-rahetimazava-ramangamihanta-b77758145/",
    email: "smartsaapp@gmail.com"
  },
  {
    name: "Rindra Ranaivosoa",
    role: t("teamJob4") || "Architecte Logiciel & Lead Dev",
    description: t("teamJobDesc4") || "Ingénieur logiciel concevant les architectures système et les applications mobiles hors-ligne.",
    image: "/Rindra.jpg",
    bgAccent: "bg-[#20c997]",
    linkedin: "https://www.linkedin.com/in/g%C3%A9rald-rindra-ranaivosoa-454549202/",
    email: "smartsaapp@gmail.com"
  }
]);
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>