<template>
    <section class="max-w-6xl mx-auto px-6 py-16 text-gray-800">
      <h1 class="text-3xl font-bold text-[#10b481] mb-8">{{ t('termstitle') }}</h1>
  
      <p class="mb-6">{{ t('termsintro') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection1_title') }}</h2>
      <p class="mb-6">{{ t('termssection1_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection2_title') }}</h2>
      <ul class="list-disc ml-6 mb-6 space-y-2">
        <li v-for="item in t('termssection2_list')" :key="item">{{ item }}</li>
      </ul>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection3_title') }}</h2>
      <p class="mb-6">{{ t('termssection3_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection4_title') }}</h2>
      <p class="mb-6">{{ t('termssection4_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection5_title') }}</h2>
      <p class="mb-6">{{ t('termssection5_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection6_title') }}</h2>
      <p class="mb-6">{{ t('termssection6_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection7_title') }}</h2>
      <p class="mb-6">{{ t('termssection7_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection8_title') }}</h2>
      <p class="mb-6">{{ t('termssection8_text') }}</p>
  
      <h2 class="text-2xl font-semibold mt-8 mb-4">{{ t('termssection9_title') }}</h2>
      <p>
        {{ t('termssection9_text') }}
        <a href="mailto:smartsaapp@gmail.com" class="text-[#10b481] underline">smartsaapp@gmail.com</a>.
      </p>
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
  