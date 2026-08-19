<template>
  <div class="min-h-screen bg-[#fafaf9] dark:bg-[#0a0a0a] text-[#112830] dark:text-white transition-colors duration-300 flex flex-col">
    
    <!-- Hero / Header de la page Contact -->
    <header class="relative pt-28 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-gray-200/60 dark:border-white/10">
      <!-- Éléments décoratifs flous en arrière-plan -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#10b481]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto relative z-10 text-center">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b481]/10 text-[#10b481] text-xs font-bold uppercase tracking-widest mb-4 border border-[#10b481]/20" data-aos="fade-down">
          <i class="bx bx-message-square-dots text-sm"></i>
          {{ t("contactBadge") }}
        </span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-manropeExtra text-[#112830] dark:text-white mb-6 tracking-tight" data-aos="fade-up">
          {{ t("contact") }}
        </h1>
        <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-inter max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          {{ t("subtitle") }}
        </p>
      </div>
    </header>

    <!-- Contenu Principal -->
    <main class="flex-grow py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <!-- Glow Decoratif Fond -->
      <div class="absolute top-1/3 left-0 w-96 h-96 bg-[#10b481]/10 rounded-full blur-3xl -ml-48 pointer-events-none"></div>
      <div class="absolute bottom-10 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Formulaire de Contact (7 colonnes) -->
          <div 
            class="lg:col-span-7 bg-white dark:bg-[#112830]/40 backdrop-blur-md border border-gray-200/80 dark:border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-black/5"
            data-aos="fade-right"
          >
            <form @submit.prevent="submitForm" class="space-y-6">
              
              <!-- Nom & Entreprise -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    {{ t("name") }} <span class="text-[#10b481]">*</span>
                  </label>
                  <div class="relative">
                    <i class="bx bx-user absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="John Doe"
                      class="w-full pl-12 pr-4 py-3.5 font-inter text-sm rounded-xl bg-gray-50 dark:bg-white/5 text-[#112830] dark:text-white border border-gray-200 dark:border-white/10 focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    {{ t("company") }}
                  </label>
                  <div class="relative">
                    <i class="bx bx-buildings absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                    <input
                      v-model="form.company"
                      type="text"
                      placeholder="SmartSaha Inc."
                      class="w-full pl-12 pr-4 py-3.5 font-inter text-sm rounded-xl bg-gray-50 dark:bg-white/5 text-[#112830] dark:text-white border border-gray-200 dark:border-white/10 focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Email & Téléphone -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    {{ t("email") }} <span class="text-[#10b481]">*</span>
                  </label>
                  <div class="relative">
                    <i class="bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      class="w-full pl-12 pr-4 py-3.5 font-inter text-sm rounded-xl bg-gray-50 dark:bg-white/5 text-[#112830] dark:text-white border border-gray-200 dark:border-white/10 focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    {{ t("mobile") }}
                  </label>
                  <div class="relative">
                    <i class="bx bx-phone absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                    <input
                      v-model="form.mobile"
                      type="tel"
                      placeholder="+261 34 00 000 00"
                      class="w-full pl-12 pr-4 py-3.5 font-inter text-sm rounded-xl bg-gray-50 dark:bg-white/5 text-[#112830] dark:text-white border border-gray-200 dark:border-white/10 focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Choix des Intérêts (Badges Interactifs) -->
              <div class="space-y-3">
                <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  {{ t("interest") }}
                </label>
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="interest in interestOptions"
                    :key="interest"
                    type="button"
                    @click="toggleInterest(interest)"
                    :class="[
                      'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 border cursor-pointer',
                      form.interests.includes(interest)
                        ? 'bg-[#10b481] text-white border-[#10b481] shadow-md shadow-[#10b481]/20'
                        : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#10b481]/40'
                    ]"
                  >
                    <i :class="form.interests.includes(interest) ? 'bx bx-check-circle text-sm' : 'bx bx-plus text-sm'"></i>
                    {{ interest }}
                  </button>
                </div>
              </div>

              <!-- Message -->
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  {{ t("message") }}
                </label>
                <textarea
                  v-model="form.comments"
                  rows="4"
                  placeholder="Ex: Nous souhaitons cartographier 500 hectares de parcelles..."
                  class="w-full p-4 font-inter text-sm rounded-xl bg-gray-50 dark:bg-white/5 text-[#112830] dark:text-white border border-gray-200 dark:border-white/10 focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 transition-all outline-none resize-none"
                ></textarea>
              </div>

              <!-- Bouton d'Envoi -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-[#10b481] hover:bg-[#0e9a6e] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#10b481]/25 hover:shadow-xl hover:shadow-[#10b481]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span v-if="!isSubmitting">{{ t("sendMessage") }}</span>
                <span v-else>{{ t("sendingInProgress") }}</span>
                <i v-if="!isSubmitting" class="bx bx-paper-plane text-xl"></i>
                <i v-else class="bx bx-loader-alt animate-spin text-xl"></i>
              </button>
            </form>
          </div>

          <!-- Sidebar Informations de Contact (5 colonnes) -->
          <div class="lg:col-span-5 space-y-6" data-aos="fade-left">
            
            <!-- Carte Principale Sombre -->
            <div class="bg-[#112830] text-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-white/10">
              <div class="absolute -top-12 -right-12 w-48 h-48 bg-[#10b481]/20 rounded-full blur-2xl pointer-events-none"></div>

              <!-- Grille des contacts -->
              <div class="space-y-4 relative z-10">
                <component
                  v-for="info in contactInfos"
                  :key="info.label"
                  :is="info.href ? 'a' : 'div'"
                  :href="info.href"
                  :target="info.href?.startsWith('http') ? '_blank' : undefined"
                  :rel="info.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
                  class="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#10b481]/30 transition-all duration-300 flex items-center gap-4 cursor-pointer"
                >
                  <div class="w-12 h-12 rounded-xl bg-[#10b481]/20 text-[#10b481] group-hover:bg-[#10b481] group-hover:text-white flex items-center justify-center text-2xl shrink-0 transition-colors duration-300">
                    <i :class="info.icon"></i>
                  </div>
                  <div class="overflow-hidden">
                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">{{ info.label }}</p>
                    <p class="text-sm font-medium text-white truncate group-hover:text-[#10b481] transition-colors">
                      {{ info.value }}
                    </p>
                  </div>
                </component>
              </div>
            </div>

            <!-- Carte Siège Social -->
            <div class="bg-white dark:bg-[#112830]/40 border border-gray-200/80 dark:border-white/10 rounded-[2rem] p-6 flex items-center gap-4 shadow-lg">
              <div class="w-12 h-12 rounded-xl bg-[#10b481]/20 text-[#10b481] flex items-center justify-center text-2xl shrink-0">
                <i class="bx bx-buildings"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-[#112830] dark:text-white">{{ t("headquartersTitle") }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-inter">{{ t("headquartersAddress") }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm backdrop-blur-md"
        :class="toast.type === 'success' ? 'bg-[#10b481]' : 'bg-red-500'"
      >
        <i :class="toast.type === 'success' ? 'bx bx-check-circle text-2xl' : 'bx bx-error-circle text-2xl'"></i>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { t } = useI18n();
const localePath = useLocalePath();

// SEO Natif Nuxt 3 — réactif à la langue active
useSeoMeta({
  title: () => t("contact"),
  ogTitle: () => t("contact"),
  description: () => t("contactMetaDescription"),
  ogDescription: () => t("contactMetaDescription"),
});

const isSubmitting = ref(false);
let toastTimer: NodeJS.Timeout | null = null;

const form = ref({
  name: "",
  company: "",
  email: "",
  mobile: "",
  interests: [] as string[],
  comments: "",
});

// Réutilise les clés existantes invest/work/platform/tailor au lieu de texte anglais figé
const interestOptions = computed(() => [
  t("invest"),
  t("work"),
  t("platform"),
  t("tailor"),
]);

const toggleInterest = (interest: string) => {
  const index = form.value.interests.indexOf(interest);
  if (index === -1) {
    form.value.interests.push(interest);
  } else {
    form.value.interests.splice(index, 1);
  }
};

const toast = ref({
  show: false,
  message: "",
  type: "success" as "success" | "error",
});

const contactInfos = computed(() => [
  { icon: 'bx bx-envelope', label: t("general"), value: 'contact@smart-saha.com', href: 'mailto:contact@smart-saha.com' },
  { icon: 'bx bx-briefcase', label: t("sales"), value: 'cto@smart-saha.com', href: 'mailto:cto@smart-saha.com' },
  { icon: 'bx bx-user', label: t("ceo"), value: 'ceo@smart-saha.com', href: 'mailto:ceo@smart-saha.com' },
  { icon: 'bx bxl-whatsapp', label: t("whatsapp"), value: '+261 32 78 746 17', href: 'https://wa.me/261327874617' },
]);

const showToast = (message: string, type: "success" | "error" = "success") => {
  if (toastTimer) clearTimeout(toastTimer);
  toast.value = { show: true, message, type };
  toastTimer = setTimeout(() => {
    toast.value.show = false;
  }, 3500);
};

const submitForm = async () => {
  isSubmitting.value = true;
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });
    
    if (!res.ok) {
      showToast(t("contactErrorApi"), "error");
      return;
    }
    
    showToast(t("contactSuccess"), "success");
    form.value = {
      name: "",
      company: "",
      email: "",
      mobile: "",
      interests: [],
      comments: "",
    };
  } catch (err) {
    console.error(err);
    showToast(t("contactErrorGeneric"), "error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>