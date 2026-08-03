<template>
  <section id="cta" class="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#fafaf9] dark:bg-[#0a0a0a] transition-colors duration-300">
    
    <!-- Conteneur Flottant Style Card Sombre (Inspiré de l'image) -->
    <div class="max-w-7xl mx-auto relative overflow-hidden bg-[#112830] dark:bg-[#112830]/90 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
      
      <!-- Effets de glow en arrière-plan -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-[#10b481]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-[#10b481]/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Structure 2 Colonnes -->
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- COLONNE GAUCHE : Titre + Call to Actions -->
        <div class="lg:col-span-7 flex flex-col items-start" data-aos="fade-right">
          
          <!-- Badge Doré / Émeraude -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b481]/15 text-[#10b481] border border-[#10b481]/30 text-xs font-semibold mb-6">
            <span>{{ t('ctaBadge') }}</span>
          </div>

          <!-- Titre Principal -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-white leading-tight mb-6 tracking-tight text-left">
            {{ t('ctaTitle') }}
          </h2>

          <!-- Description -->
          <p class="text-gray-300 font-inter text-base sm:text-lg leading-relaxed mb-8 max-w-xl text-left">
            {{ t('ctaText') }}
          </p>

          <!-- Groupe de Boutons -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            
            <!-- Bouton Principal avec effet Glow -->
            <a 
              href="https://agriculture.smart-saha.com" 
              target="_blank" 
              class="w-full sm:w-auto"
            >
              <button class="w-full sm:w-auto bg-[#10b481] hover:bg-[#0e9a6e] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#10b481]/25 hover:shadow-xl hover:shadow-[#10b481]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                <span>{{ t('getStarted') }}</span>
                <i class="bx bx-right-arrow-alt text-xl"></i>
              </button>
            </a>

            <!-- Bouton Secondaire Transparent -->
            <button 
              @click="scrollTo('contact')" 
              class="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i class="bx bx-calendar text-xl text-[#10b481]"></i>
              <span>{{ t('contact') }}</span>
            </button>
          </div>
        </div>

        <!-- COLONNE DROITE : Cartes Fonctionnalités / Avantages -->
        <div class="lg:col-span-5 flex flex-col gap-4" data-aos="fade-left">
          
          <div 
            v-for="(feature, idx) in ctaFeatures" 
            :key="idx"
            class="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 group"
          >
            <!-- Icône encadrée -->
            <div class="w-12 h-12 rounded-xl bg-[#10b481]/15 text-[#10b481] group-hover:bg-[#10b481] group-hover:text-white flex items-center justify-center text-2xl shrink-0 transition-colors duration-300">
              <i :class="feature.icon"></i>
            </div>

            <!-- Texte de l'avantage -->
            <div>
              <h4 class="text-white font-manropeSemi text-base mb-0.5">
                {{ feature.title }}
              </h4>
              <p class="text-xs text-gray-400 font-inter leading-relaxed">
                {{ feature.desc }}
              </p>
            </div>
          </div>

        </div>

      </div>

      <!-- LIGNE INFÉRIEURE : Puces de réassurance avec coches vertes -->
      <div class="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-start lg:justify-between gap-6 text-xs sm:text-sm text-gray-300 font-inter">
        
        <div class="flex items-center gap-2">
          <i class="bx bxs-check-circle text-[#10b481] text-lg"></i>
          <span>{{ t('ctaFeature1') || 'Données cartographiques haute précision' }}</span>
        </div>

        <div class="flex items-center gap-2">
          <i class="bx bxs-check-circle text-[#10b481] text-lg"></i>
          <span>{{ t('ctaFeature2') || 'Rapports carbone certifiés MRV' }}</span>
        </div>

        <div class="flex items-center gap-2">
          <i class="bx bxs-check-circle text-[#10b481] text-lg"></i>
          <span>{{ t('ctaFeature3') || 'Accès instantané à la plateforme' }}</span>
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

// Avantages listés dans la colonne de droite (adaptés à SmartSaha)
const ctaFeatures = computed(() => [
  {
    icon: "bx bx-bolt-circle",
    title: t("ctaFeat1Title"),
    desc: t("ctaFeat1Desc")
  },
  {
    icon: "bx bx-[#10b481] bx-shield-quarter",
    title: t("ctaFeat2Title"),
    desc: t("ctaFeat2Desc")
  },
  {
    icon: "bx bx-line-chart",
    title: t("ctaFeat3Title"),
    desc: t("ctaFeat3Desc")
  },
  {
    icon: "bx bx-support",
    title: t("ctaFeat4Title"),
    desc: t("ctaFeat4Desc")
  }
]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
section {
  margin-top: -1px;
}
</style>