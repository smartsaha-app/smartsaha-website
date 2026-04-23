<template>
  <header class="bg-[#fafaf9] fixed w-full z-50 py-2 mb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0 flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="Logo"
              class="w-12 h-12 object-contain flex-shrink-0 rounded-xl"
            />

            <div v-if="!isMobile" class="leading-tight">
              <h1 class="text-xl logo font-bold text-gray-700">SmartSaha</h1>
              <p class="sous-logo tracking-wide">
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
              class="px-3 py-2 text-gray-700 menu-item font-medium relative z-10"
            >
              {{ item.name }}
            </button>

            <span
              class="absolute left-0 bottom-0 h-0.5 w-0 bg-[#10b481] transition-all duration-300 group-hover:w-full"
            ></span>
          </div>

          <NuxtLink
            to="/contact"
            class="ml-4 inline-flex items-center menu-item justify-center text-gray-700 transition px-4 py-2 group"
          >
            {{ t("contact") }}
            <i
              class="bxr bx-arrow-up-right-stroke text-[#10b481] text-xl ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            ></i>
          </NuxtLink>



          <div class="relative">
            <button
              @click="open = !open"
              class="flex items-center justify-center gap-3 py-1.5 px-3 rounded hover:border-[#10b481] transition text-gray-700"
            >
              <img :src="currentLocale.flag" class="w-5 h-5 rounded-full" />
              <span class="content">{{
                currentLocale.name
              }}</span>
              <i class="bx bx-chevron-down"></i>
            </button>

            <transition name="fade">
              <ul
                v-if="open"
                class="absolute mt-2 w-40 bg-white border border-gray-100 rounded shadow-md overflow-hidden"
              >
                <li
                  v-for="loc in locales"
                  :key="loc.code"
                  @click="selectLocale(loc.code)"
                  class="flex items-center gap-2 px-3 py-2 hover:bg-[#10b481]/10 cursor-pointer"
                >
                  <img :src="loc.flag" class="w-5 h-5 rounded-full" />
                  <span class="content">{{
                    loc.name
                  }}</span>
                </li>
              </ul>
            </transition>
          </div>
          <a
            href="https://app.smart-saha.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center btn-primary"
          >
            {{ t("getStarted") }}
          </a>
        </div>

        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            class="text-gray-700 focus:outline-none"
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
        class="fixed top-0 left-0 h-screen w-3/4 bg-gray-50 shadow-lg z-50 p-6 flex flex-col"
      >
        <div class="flex-shrink-0 flex items-center gap-2 mb-6">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 font-bold text-xl text-gray-800"
          >
            <img class="h-12 w-auto" src="/logo.png" alt="SmartSaha Logo" />
            <p class="text-[#112830]">SmartSaha</p>
          </NuxtLink>
        </div>

        <div class="relative mb-6 z-50">
          <button
            @click="open = !open"
            class="flex items-center gap-2 py-2 px-3 rounded border hover:border-[#10b481] transition w-full"
          >
            <img :src="currentLocale.flag" class="w-5 h-5 rounded-full" />
            <span class="font-medium text-gray-700">{{
              currentLocale.name
            }}</span>
            <i class="bx bx-chevron-down text-sm"></i>
          </button>

          <transition name="fade">
            <ul
              v-if="open"
              class="absolute mt-2 w-40 bg-white border border-gray-100 rounded shadow-md overflow-hidden"
            >
              <li
                v-for="loc in locales"
                :key="loc.code"
                @click="selectLocale(loc.code)"
                class="flex items-center gap-2 px-3 py-2 hover:bg-[#10b481]/10 cursor-pointer"
              >
                <img :src="loc.flag" class="w-5 h-5 rounded-full" />
                <span class="text-sm font-medium text-gray-700">{{
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
              class="w-full text-left px-4 py-2 text-gray-700 font-medium"
            >
              {{ item.name }}
            </button>

            <span
              class="absolute left-0 bottom-0 h-0.5 w-0 bg-[#10b481] transition-all duration-300 group-hover:w-full"
            ></span>
          </div>
        </nav>

        <div class="flex flex-col gap-3 mt-auto">
          <NuxtLink
            to="/contact"
            class="w-full flex items-center justify-center text-gray-700 font-semibold transition px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            {{ t("contact") }}
            <i
              class="bxr bx-arrow-up-right-stroke text-[#10b481] text-2xl ml-2"
            ></i>
          </NuxtLink>

          <a
            href="https://app.smart-saha.com"
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
import { ref, computed } from "vue";
import { useLanguageStore } from "~/stores/language";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};
const locales = [
  { code: "en", name: "English", flag: "/flags/en.png" },
  { code: "fr", name: "Français", flag: "/flags/fr.png" },
  { code: "mg", name: "Malagasy", flag: "/flags/mg.png" },
];

const open = ref(false);
const isOpen = ref(false);
const currentLocale = computed(
  () => locales.find((l) => l.code === languageStore.lang) || locales[0]
);

const selectLocale = (code: string) => {
  languageStore.setLang(code);
  open.value = false;
};

const menuItems = computed(() => [
  { name: t("about"), id: "about" },
  { name: t("services"), id: "services" },
  { name: t("team"), id: "team" },
]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
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
