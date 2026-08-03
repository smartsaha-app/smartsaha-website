<template>
  <header class="bg-[#fafaf9] dark:bg-[#112830] border-b border-transparent dark:border-white/5 fixed w-full z-50 py-2 mb-12 transition-colors duration-300">
    
    <div class="mx-auto px-1 py-1 sm:px-6">
      <div class="flex justify-between items-center">
        
        <!-- Logo et Identité -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2 dark:text-white">
            <img
              src="/logo.png"
              alt="Logo"
              class="rounded-full object-cover border-2 border-[#10b481] size-12 dark:size-14 flex-shrink-0"
            />
            <div class="leading-6">
              <h1 class="text-[24px] capitalize text-header font-bold text-gray-700 dark:text-white">SmartSaha</h1>
              <p class="text-[13px] dark:text-gray-400">
                {{ t("tagline") }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center gap-6">
          <nav class="flex items-center gap-2">
            <!-- Navigation page par page via NuxtLink avec indicateur visuel -->
            <NuxtLink
              v-for="item in menuItems"
              :key="item.name"
              :to="localePath(item.path)"
              class="relative px-3 py-2 menu-item text-menu-bar font-medium transition-colors duration-300 text-gray-700 dark:text-gray-300 hover:text-[#10b481] dark:hover:text-[#10b481]"
              :exact="item.path === '/'"
              active-class="text-[#10b481] dark:text-[#10b481] font-bold active-link-indicator"
            >
              {{ item.name }}
            </NuxtLink>
          </nav>

          <!-- Selecteur de Thème -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-[#10b481]/10 text-gray-700 dark:text-gray-300 transition-all active:scale-90"
            :title="colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode'"
          >
            <i :class="colorMode.preference === 'dark' ? 'bx bx-sun text-2xl' : 'bx bx-moon text-2xl'"></i>
          </button>

          <!-- Selecteur de Langue -->
          <div class="relative">
            <button
              @click="open = !open"
              class="flex items-center justify-center gap-3 py-1.5 px-3 rounded hover:border-[#10b481] transition text-gray-700 dark:text-gray-300"
            >
              <img :src="currentLocale.flag" class="w-5 h-5 rounded-full" />
              <span class="content dark:text-gray-300">{{ currentLocale.name }}</span>
              <i class="bx bx-chevron-down"></i>
            </button>

            <transition name="fade">
              <ul
                v-if="open"
                class="absolute mt-2 w-40 bg-white dark:bg-[#112830] border border-gray-100 dark:border-white/10 rounded shadow-md overflow-hidden z-50"
              >
                <li
                  v-for="loc in locales"
                  :key="loc.code"
                  @click="selectLocale(loc.code)"
                  class="flex items-center gap-2 px-3 py-2 hover:bg-[#10b481]/10 cursor-pointer dark:hover:bg-white/5"
                >
                  <img :src="loc.flag" class="w-5 h-5 rounded-full" />
                  <span class="content dark:text-gray-300">{{ loc.name }}</span>
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <!-- Bouton Menu Mobile & Thème -->
        <div class="md:hidden flex items-center gap-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-full text-gray-700 dark:text-gray-300"
          >
            <i :class="colorMode.preference === 'dark' ? 'bx bx-sun text-2xl' : 'bx bx-moon text-2xl'"></i>
          </button>
          
          <button
            @click="isOpen = !isOpen"
            class="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg
              v-if="!isOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Tiroir de Navigation Mobile -->
    <transition name="slide-left">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 h-screen w-3/4 bg-white/95 dark:bg-[#112830]/95 backdrop-blur-xl shadow-2xl z-50 p-6 flex flex-col border-r border-gray-100 dark:border-white/5"
      >
        <div class="flex-shrink-0 flex items-center gap-2 mb-6">
          <NuxtLink
            :to="localePath('/')"
            @click="isOpen = false"
            class="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white"
          >
            <img class="h-12 w-auto" src="/logo.png" alt="SmartSaha Logo" />
            <p>SmartSaha</p>
          </NuxtLink>
        </div>

        <!-- Selecteur de Langue Mobile -->
        <div class="relative mb-6 z-50">
          <button
            @click="open = !open"
            class="flex items-center gap-2 py-2 px-3 rounded border dark:border-white/10 hover:border-[#10b481] transition w-full text-gray-700 dark:text-gray-300"
          >
            <img :src="currentLocale.flag" class="w-5 h-5 rounded-full" />
            <span class="font-medium">{{ currentLocale.name }}</span>
            <i class="bx bx-chevron-down text-sm"></i>
          </button>

          <transition name="fade">
            <ul
              v-if="open"
              class="absolute mt-2 w-40 bg-white dark:bg-[#112830] border border-gray-100 dark:border-white/10 rounded shadow-md overflow-hidden"
            >
              <li
                v-for="loc in locales"
                :key="loc.code"
                @click="selectLocale(loc.code)"
                class="flex items-center gap-2 px-3 py-2 hover:bg-[#10b481]/10 dark:hover:bg-white/5 cursor-pointer"
              >
                <img :src="loc.flag" class="w-5 h-5 rounded-full" />
                <span class="text-sm font-medium dark:text-gray-300">{{ loc.name }}</span>
              </li>
            </ul>
          </transition>
        </div>

        <!-- Navigation Mobile avec indicateur visuel latéral -->
        <nav class="flex flex-col gap-2 mb-6">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="localePath(item.path)"
            @click="isOpen = false"
            class="w-full text-left px-4 py-2.5 rounded-r-lg font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-[#10b481] dark:hover:text-[#10b481]"
            :exact="item.path === '/'"
            active-class="bg-[#10b481]/10 text-[#10b481] dark:text-[#10b481] font-bold border-l-4 border-[#10b481]"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <div class="flex flex-col gap-3 mt-auto">
          <a
            href="https://agriculture.smart-saha.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full text-menu-bar flex items-center justify-center btn-primary"
          >
            {{ t("getStarted") }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

// Gestion du Dark/Light Mode
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

// États réactifs du menu et des menus déroulants
const scrollProgress = ref(0);
const open = ref(false); // Menu déroulant langue
const isOpen = ref(false); // Menu mobile (tiroir)

// Utilitaires I18n / Routage
const languageStore = useLanguageStore();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

// Traduction personnalisée
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

// Liste des langues supportées
const locales = [
  { code: "en", name: "English", flag: "/flags/en.png" },
  { code: "fr", name: "Français", flag: "/flags/fr.png" },
  { code: "mg", name: "Malagasy", flag: "/flags/mg.png" },
];

const currentLocale = computed(
  () => locales.find((l) => l.code === languageStore.lang) || locales[0]
);

// Configuration des liens de navigation page par page
const menuItems = computed(() => [
  { name: t("about"), path: "/" },
  { name: t("services"), path: "/services" },
  { name: t("blogs"), path: "/blogs" },
  { name: t("portfolio"), path: "/portfolio" },
  { name: t("contact"), path: "/contact" },
]);

// Changement de langue
const selectLocale = (code: string) => {
  open.value = false;
  const path = switchLocalePath(code);
  navigateTo(path);
};

// Calcul de la progression du défilement de la page active
const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.value = height > 0 ? (winScroll / height) * 100 : 0;
};

// Gestion des écouteurs d'événements
onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<style scoped>
/* Indicateur visuel sous le lien actif (Desktop) */
.active-link-indicator::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background-color: #10b481;
  border-radius: 9999px;
}

/* Animations de transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-left-leave-active {
  transition: transform 0.3s ease-in;
}
.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-enter-to {
  transform: translateX(0%);
}
.slide-left-leave-from {
  transform: translateX(0%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>