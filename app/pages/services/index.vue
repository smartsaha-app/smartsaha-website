<template>
  <div>
    <!-- Hero Section Services -->
    <section
      class="relative bg-cover bg-center bg-white/65 pt-16 sm:pt-20 min-h-[50vh] flex items-center"
      style="background-image: url('/bg-hero-1.jpg')"
    >
      <!-- Deep Premium Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#10b481]/50 transition-colors duration-300"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col items-start gap-6 w-full"
      >
        <div class="flex-1 flex flex-col justify-center gap-2 text-white z-10" data-aos="fade-up">
          <h5 class="rounded-full w-max bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-5 py-2 uppercase text-xs tracking-[0.2em] font-bold text-white shadow-sm">
            <span class="w-2 h-2 rounded-full bg-[#10b481] animate-pulse"></span>
            {{ t("service") || "Nos Services" }}
          </h5>
          
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            {{ t("accrocheHero") || "Des solutions technologiques pour l'agriculture" }}
          </h1>
          <p class="text-gray-200 max-w-xl text-base sm:text-lg font-light leading-relaxed">
            {{ t("heroText") || "Innovations géospatiales et intelligence artificielle pour transformer durablement les exploitations agricoles." }}
          </p>
          <button
            @click="scrollTo('services-list')"
            class="inline-flex items-center w-max gap-3 border-2 border-white bg-white text-[#112830] hover:bg-[#10b481] hover:border-[#10b481] hover:text-white px-8 py-3.5 rounded-full transition-all duration-300 mt-4 font-semibold group shadow-lg cursor-pointer"
          >
            <span>{{ t("learnMore") || "Découvrir nos offres" }}</span>
            <i class="bx bx-down-arrow-alt text-2xl group-hover:translate-y-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Liste des Services -->
    <section id="services-list" class="py-16 sm:py-24 bg-gray-50 dark:bg-[#0c1d23] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <!-- En-tête de section -->
        <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <span class="text-[#10b481] font-bold text-xs sm:text-sm uppercase tracking-widest bg-[#10b481]/10 px-4 py-1.5 rounded-full border border-[#10b481]/20">
            Nos Expertises
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mt-4 mb-4">
            Des solutions technologiques adaptées aux défis agricoles modernes
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            SmartSaha combine intelligence artificielle, imagerie satellite et outils nomades pour optimiser la productivité agricole et valoriser la transition écologique.
          </p>
        </div>

        <!-- Grille des cartes de services -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="group bg-white dark:bg-[#112830] rounded-2xl p-8 border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
            data-aos="fade-up"
          >
            <!-- Forme décorative d'arrière-plan au survol -->
            <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-[#10b481]/5 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

            <div>
              <!-- Icône du service -->
              <div class="w-14 h-14 rounded-2xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-3xl mb-6 group-hover:bg-[#10b481] group-hover:text-white transition-colors duration-300 shadow-sm">
                <i :class="service.icon"></i>
              </div>

              <!-- Titre -->
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-[#10b481] transition-colors">
                {{ service.title }}
              </h3>

              <!-- Description courte -->
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {{ service.description }}
              </p>

              <!-- Liste des fonctionnalités clés -->
              <ul class="space-y-2.5 mb-8">
                <li
                  v-for="(feature, idx) in service.features"
                  :key="idx"
                  class="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  <i class="bx bx-check-circle text-[#10b481] text-base shrink-0"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Pied de Carte / Actions -->
            <div class="border-t border-gray-100 dark:border-white/10 pt-4 flex items-center justify-between">
              <button
                @click="openServiceModal(service)"
                class="text-sm font-semibold text-[#10b481] hover:underline inline-flex items-center gap-1 cursor-pointer group/link"
              >
                <span>En savoir plus</span>
                <i class="bx bx-chevron-right text-lg group-hover/link:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Section CTA (Appel à l'action) -->
    <section class="py-16 sm:py-20 bg-[#10b481] text-white text-center relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10" data-aos="fade-up">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
          Prêt à créer votre propre solution AgriTech ?
        </h2>
        <p class="text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed text-white/90">
          Contactez notre équipe d'experts pour une étude de votre projet ou une démonstration personnalisée de nos capacités techniques.
        </p>
        <NuxtLink
          :to="localePath('/contact')"
          class="inline-flex items-center gap-3 bg-[#112830] text-white hover:bg-[#0c1d23] px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer"
        >
          <span>Lancer votre projet avec nous</span>
          <i class="bx bx-right-arrow-alt text-2xl"></i>
        </NuxtLink>
      </div>
    </section>

    <!-- Section Notre Processus de Développement de Projet AgriTech -->
    <section class="py-16 sm:py-24 bg-white dark:bg-[#112830] transition-colors duration-300 border-t border-b border-gray-100 dark:border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <!-- En-tête -->
        <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <span class="text-[#10b481] font-bold text-xs sm:text-sm uppercase tracking-widest bg-[#10b481]/10 px-4 py-1.5 rounded-full border border-[#10b481]/20">
            Déroulement d'un projet
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mt-4 mb-4">
            Comment nous concrétisons votre plateforme AgriTech
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            De l'idée initiale au déploiement sur le terrain, nous vous accompagnons étape par étape dans la création de votre solution digitale sur-mesure.
          </p>
        </div>

        <!-- Grille des étapes projet -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="relative p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-between group hover:border-[#10b481]/50 transition-all duration-300"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
          >
            <div>
              <!-- Numéro d'étape et Icône -->
              <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-[#10b481]/10 text-[#10b481] group-hover:bg-[#10b481] group-hover:text-white flex items-center justify-center font-bold text-xl transition-colors duration-300 shadow-sm">
                  <i :class="step.icon"></i>
                </div>
                <span class="text-3xl font-extrabold text-[#10b481]/20 dark:text-[#10b481]/30">
                  0{{ i + 1 }}
                </span>
              </div>

              <!-- Titre & Phase -->
              <span class="text-[11px] font-bold text-[#10b481] uppercase tracking-wider block mb-1">
                {{ step.phase }}
              </span>
              <h3 class="text-base font-bold text-gray-800 dark:text-white mb-3">
                {{ step.title }}
              </h3>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                {{ step.desc }}
              </p>
            </div>

            <!-- Livrable clé -->
            <div class="pt-3 border-t border-gray-200/60 dark:border-white/10 mt-auto">
              <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase block mb-1">Livrable :</span>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                <i class="bx bx-check-double text-[#10b481] text-base"></i>
                {{ step.deliverable }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Modale de Détails du Service -->
    <transition name="fade">
      <div
        v-if="selectedService"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'modal-title-' + selectedService.id"
        @click.self="closeServiceModal"
      >
        <div class="bg-white dark:bg-[#112830] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-white/10 p-6 sm:p-8 relative">
          
          <!-- Bouton Fermer -->
          <button
            @click="closeServiceModal"
            aria-label="Fermer la fenêtre"
            class="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-[#10b481] hover:text-white transition-colors cursor-pointer"
          >
            <i class="bx bx-x text-2xl"></i>
          </button>

          <!-- Contenu Modale -->
          <div class="flex items-center gap-4 mb-6 pr-8">
            <div class="w-14 h-14 rounded-2xl bg-[#10b481]/10 text-[#10b481] flex items-center justify-center text-3xl shrink-0">
              <i :class="selectedService.icon"></i>
            </div>
            <div>
              <h3 :id="'modal-title-' + selectedService.id" class="text-2xl font-bold text-gray-800 dark:text-white">
                {{ selectedService.title }}
              </h3>
              <span class="text-xs text-[#10b481] font-semibold uppercase tracking-wider">Service SmartSaha</span>
            </div>
          </div>

          <div class="space-y-4 text-gray-600 dark:text-gray-300">
            <h4 class="text-base font-semibold text-gray-800 dark:text-white">Description détaillée</h4>
            <p class="text-sm leading-relaxed">{{ selectedService.fullDescription || selectedService.description }}</p>

            <h4 class="text-base font-semibold text-gray-800 dark:text-white pt-2">Bénéfices clés</h4>
            <ul class="space-y-2">
              <li
                v-for="(benefit, index) in selectedService.benefits"
                :key="index"
                class="flex items-start gap-2 text-xs sm:text-sm"
              >
                <i class="bx bx-check text-[#10b481] text-lg shrink-0 mt-0.5"></i>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-8 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end gap-4">
            <button
              @click="closeServiceModal"
              class="px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-medium transition cursor-pointer"
            >
              Fermer
            </button>
            <NuxtLink
              :to="localePath('/contact')"
              @click="closeServiceModal"
              class="px-6 py-2.5 rounded-full bg-[#10b481] text-white hover:bg-[#0e986d] text-sm font-medium transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Demander un devis</span>
              <i class="bx bx-paper-plane"></i>
            </NuxtLink>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

// Configuration SEO Nuxt 3
useHead({
  title: "Services | SmartSaha",
  meta: [
    {
      name: "description",
      content:
        "Découvrez les services offerts par SmartSaha, l'AgTech malgache pionnière dans la digitalisation et la traçabilité agricole.",
    },
  ],
});

// Structuration Schema.org pour le référencement
useSchemaOrg([
  defineWebPage({
    name: "Services - SmartSaha",
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

// --- Modale Control ---
const selectedService = ref<any>(null);

const openServiceModal = (service: any) => {
  selectedService.value = service;
  if (import.meta.client) {
    document.body.style.overflow = "hidden";
  }
};

const closeServiceModal = () => {
  selectedService.value = null;
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
};

// Fermeture de la modale avec la touche 'Echappement'
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && selectedService.value) {
    closeServiceModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
});

// --- Données des Services SmartSaha ---
const services = ref([
  {
    id: 1,
    title: "Mesure & Validation MRV Carbone",
    icon: "bx bx-line-chart",
    description: "Plateforme complète de Mesure, Notification et Vérification (MRV) de la séquestration de carbone pour vos projets de restauration.",
    fullDescription: "Nous combinons les technologies de télédétection par satellite et l'apprentissage automatique pour quantifier les stocks de carbone dans le sol et la biomasse végétale. Nos rapports sont conformes aux standards d'audit internationaux.",
    features: [
      "Suivi satellite haute résolution",
      "Calcul des stocks de carbone & biomasse",
      "Rapports certifiables pour crédits carbone"
    ],
    benefits: [
      "Transparence totale des données pour les investisseurs",
      "Réduction des coûts d'audit terrain jusqu'à 60%",
      "Mises à jour des métriques en temps réel"
    ]
  },
  {
    id: 2,
    title: "Agriculture de Précision & IA",
    icon: "bx bx-bot",
    description: "Plateforme agro-intelligente avec modèles prédictifs pour optimiser l'utilisation des intrants, détecter les maladies et prévoir les rendements agricoles.",
    fullDescription: "Grâce à l'analyse algorithmique de données multi-sources (météo, sols, images satellites), notre solution vous aide à anticiper les ravageurs et ajuster les apports azotés au strict nécessaire.",
    features: [
      "Détection précoce des maladies végétales",
      "Cartographie de fertilité des sols",
      "Prédiction des rendements à la récolte"
    ],
    benefits: [
      "Augmentation des rendements de 15 à 25%",
      "Diminution de l'usage des produits phytosanitaires",
      "Gestion optimale du calendrier de culture",
      "Alerte sur l'humidité du sol",
      "Alertes météo et gel géolocalisées"
    ]
  },
  {
    id: 3,
    title: "Agro-Analytics",
    icon: "bx bx-data",
    description: "Plateforme décisionnelle centralisée pour coopératives, agrobusiness et organismes environnementaux.",
    fullDescription: "Centralisez l'ensemble de vos données d'exploitation sur un tableau de bord intuitif pour simplifier les prises de décision stratégiques et la traçabilité.",
    features: [
      "Tableaux de bord sur-mesure",
      "Exportation des rapports analytiques",
      "Intégration via API sécurisées"
    ],
    benefits: [
      "Visibilité globale sur toutes les parcelles",
      "Traçabilité complète des récoltes",
      "Archivage conforme aux normes de certification"
    ]
  }
]);

// --- Processus de Réalisation de Projet AgriTech ---
const steps = [
  {
    phase: "Phase 1",
    icon: "bx bx-conversation",
    title: "Cadrage & Besoins",
    desc: "Échange approfondi pour comprendre vos objectifs, vos utilisateurs (agriculteurs, techniciens, investisseurs) et vos contraintes terrain.",
    deliverable: "Cahier des charges & Spécifications"
  },
  {
    phase: "Phase 2",
    icon: "bx bx-paint",
    title: "Design UX/UI & Architecture",
    desc: "Conception des maquettes de la plateforme (web/mobile) et choix de l'architecture technique (IoT, bases de données, APIs satellite).",
    deliverable: "Prototypes interactifs (Figma)"
  },
  {
    phase: "Phase 3",
    icon: "bx bx-code-alt",
    title: "Développement & Intégration",
    desc: "Codage de l'application (Frontend/Backend) et connexion des modules spécifiques (algorithmes d'IA, capteurs terrain, cartographie GIS).",
    deliverable: "Version Bêta fonctionnelle"
  },
  {
    phase: "Phase 4",
    icon: "bx bx-select-multiple",
    title: "Tests & Validation Terrain",
    desc: "Phase de recette rigoureuse et tests d'utilisation en conditions réelles d'exploitation pour ajuster la réactivité et l'ergonomie.",
    deliverable: "Rapport de tests & Validation"
  },
  {
    phase: "Phase 5",
    icon: "bx bx-rocket",
    title: "Déploiement & Suivi",
    desc: "Mise en ligne sécurisée de la plateforme, formation des utilisateurs et maintenance évolutive continue.",
    deliverable: "Plateforme en production & Support"
  }
];
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>