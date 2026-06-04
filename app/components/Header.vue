<template>
  <header class="bg-[#fafaf9] dark:bg-[#112830] border-b border-transparent dark:border-white/5 fixed w-full z-50 py-2 mb-12 transition-colors duration-300">
    <div id="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0 flex items-center gap-2">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Logo"
              class="w-12 h-12 object-contain flex-shrink-0 rounded-xl"
            />

            <div class="leading-tight">
              <h1 class="text-xl logo font-bold text-gray-700 dark:text-white">SmartSaha</h1>
              <p class="sous-logo tracking-wide dark:text-gray-400">
                {{ t("tagline") }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <div
            v-for="item in menuItems"
            :key="item.name"
            class="relative group"
          >
            <button
              @click="scrollTo(item.id)"
              class="px-3 py-2 menu-item font-medium relative z-10 transition-colors duration-300"
              :class="activeSection === item.id ? 'text-[#10b481] dark:text-white' : 'text-gray-700 dark:text-gray-300'"
            >
              {{ item.name }}
            </button>

            <span
              class="absolute left-0 bottom-0 h-0.5 bg-[#10b481] transition-all duration-300 group-hover:w-full"
              :class="activeSection === item.id ? 'w-full' : 'w-0'"
            ></span>
          </div>

          <!-- Theme Switcher -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-[#10b481]/10 text-gray-700 dark:text-gray-300 transition-all active:scale-90"
            :title="colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode'"
          >
            <i :class="colorMode.preference === 'dark' ? 'bx bx-sun text-2xl' : 'bx bx-moon text-2xl'"></i>
          </button>

          <div class="relative">
            <button
              @click="open = !open"
              class="flex items-center justify-center gap-3 py-1.5 px-3 rounded hover:border-[#10b481] transition text-gray-700 dark:text-gray-300"
            >
              <img :src="currentLocale.flag" class="w-5 h-5 rounded-full" />
              <span class="content dark:text-gray-300">{{
                currentLocale.name
              }}</span>
              <i class="bx bx-chevron-down"></i>
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
                  class="flex items-center gap-2 px-3 py-2 hover:bg-[#10b481]/10 cursor-pointer dark:hover:bg-white/5"
                >
                  <img :src="loc.flag" class="w-5 h-5 rounded-full" />
                  <span class="content dark:text-gray-300">{{
                    loc.name
                  }}</span>
                </li>
              </ul>
            </transition>
          </div>
          <a
            href="https://agriculture.smart-saha.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center btn-primary"
          >
            {{ t("getStarted") }}
          </a>
        </div>

        <div class="md:hidden flex items-center gap-4">
          <!-- Mobile Theme Switcher -->
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

    <transition name="slide-left">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 h-screen w-3/4 bg-white/95 dark:bg-[#112830]/95 backdrop-blur-xl shadow-2xl z-50 p-6 flex flex-col border-r border-gray-100 dark:border-white/5"
      >
        <div class="flex-shrink-0 flex items-center gap-2 mb-6">
          <NuxtLink
            :to="localePath('/')"
            class="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white"
          >
            <img class="h-12 w-auto" src="/logo.png" alt="SmartSaha Logo" />
            <p>SmartSaha</p>
          </NuxtLink>
        </div>

        <div class="relative mb-6 z-50">
          <button
            @click="open = !open"
            class="flex items-center gap-2 py-2 px-3 rounded border dark:border-white/10 hover:border-[#10b481] transition w-full text-gray-700 dark:text-gray-300"
          >
            <img :src="currentLocale.flag" class="w-5 h-5 rounded-full" />
            <span class="font-medium">{{
              currentLocale.name
            }}</span>
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
                <span class="text-sm font-medium dark:text-gray-300">{{
                  loc.name
                }}</span>
              </li>
            </ul>
          </transition>
        </div>

        <nav class="flex flex-col gap-4 mb-6">
          <div
            v-for="item in menuItems"
            :key="item.name"
            class="relative group"
          >
            <button
              @click="
                scrollTo(item.id);
                isOpen = false;
              "
              class="w-full text-left px-4 py-2 font-medium transition-colors duration-300"
              :class="activeSection === item.id ? 'text-[#10b481]' : 'text-gray-700 dark:text-gray-300'"
            >
              {{ item.name }}
            </button>

            <span
              class="absolute left-0 bottom-0 h-0.5 bg-[#10b481] transition-all duration-300 group-hover:w-full"
              :class="activeSection === item.id ? 'w-full' : 'w-0'"
            ></span>
          </div>
        </nav>

        <div class="flex flex-col gap-3 mt-auto">
          <a
            href="https://agriculture.smart-saha.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center justify-center btn-primary"
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

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const scrollProgress = ref(0);
const activeSection = ref("");
const open = ref(false);
const isOpen = ref(false);

const languageStore = useLanguageStore();
const route = useRoute();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

const locales = [
  { code: "en", name: "English", flag: "/flags/en.png" },
  { code: "fr", name: "Français", flag: "/flags/fr.png" },
  { code: "mg", name: "Malagasy", flag: "/flags/mg.png" },
];

const currentLocale = computed(
  () => locales.find((l) => l.code === languageStore.lang) || locales[0]
);

const menuItems = computed(() => [
  { name: t("about"), id: "about" },
  { name: t("services"), id: "services" },
  { name: "MRV", id: "mrv" },
  { name: t("pricing"), id: "pricing" },
  { name: t("team"), id: "team" },
  { name: t("contact"), id: "contact" },
]);

const selectLocale = (code: string) => {
  open.value = false;
  const path = switchLocalePath(code);
  navigateTo(path);
};

const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.value = (winScroll / height) * 100;
};

const updateActiveSection = () => {
  const sections = ["about", "services", "mrv", "pricing", "team", "contact"];
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const el = document.getElementById(section);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = section;
        return;
      }
    }
  }
  activeSection.value = "";
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
  window.removeEventListener("scroll", updateActiveSection);
});

const scrollTo = (id: string) => {
  const home = localePath("/");
  const currentPath = route.path.replace(/\/$/, "") || "/";
  const homePath = home.replace(/\/$/, "") || "/";
  if (currentPath !== homePath) {
    navigateTo(`${home}#${id}`);
  } else {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

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
