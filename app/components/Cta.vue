<template>
  <div
    class="relative overflow-hidden bg-[#10b481] text-white py-16 px-4 sm:px-6 lg:px-24"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="h2 text-3xl md:text-4xl font-bold mb-6 tet-white" data-aos="fade-up">
        {{ t('ctaTitle') }}
      </h1>
      <p class="light-content mb-8 max-w-3xl mx-auto" data-aos="fade-up">
        {{ t('ctaText') }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://app.smart-saha.com/"
          ><button
            class="bg-white px-4 py-3 text-[#10b481] font-medium text-sm rounded-full transition"
            data-aos="fade-up"
          >
            {{ t('getStarted') }}
          </button></a
        >
        <a href="./contact.html"
          ><button
            class="bg-transparent border border-white px-4 py-3 text-white font-medium text-sm rounded-full transition"
            data-aos="fade-up"
          >
            {{ t('contact') }}
          </button></a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};
</script>
