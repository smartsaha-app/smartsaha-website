<template>
  <section class="max-w-6xl mx-auto px-6 py-16 text-gray-800">
    <h1 class="text-3xl font-bold text-[#10b481] mb-8">{{ t("title") }}</h1>
    <p class="mb-6">{{ t("intro") }}</p>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section1_title") }}</h2>
    <p class="mb-4">{{ t("section1_text") }}</p>
    <ul class="list-disc ml-6 mb-6 space-y-2">
      <li v-for="item in t('section1_list')" :key="item">{{ item }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section2_title") }}</h2>
    <p class="mb-4">{{ t("section2_text") }}</p>
    <ul class="list-disc ml-6 mb-6 space-y-2">
      <li v-for="item in t('section2_list')" :key="item">{{ item }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section3_title") }}</h2>
    <p class="mb-4">{{ t("section3_text") }}</p>
    <ul class="list-disc ml-6 mb-6 space-y-2">
      <li v-for="item in t('section3_list')" :key="item">{{ item }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section4_title") }}</h2>
    <p class="mb-4">{{ t("section4_text") }}</p>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section5_title") }}</h2>
    <p class="mb-4">{{ t("section5_text") }} <span class="text-[#10b481] italic">{{ t('contact_email') }}</span></p>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section6_title") }}</h2>
    <p class="mb-4">{{ t("section6_text") }}</p>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section7_title") }}</h2>
    <p class="mb-4">{{ t("section7_text") }}</p>

    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t("section8_title") }}</h2>
    <p class="mb-4">{{ t("section8_text") }} <span class="text-[#10b481] italic">{{ t('contact_email') }}</span></p>
  </section>
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
