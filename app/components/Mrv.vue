<template>
  <section
    class="relative overflow-hidden bg-[#fafaf9] text-white py-16 px-4 sm:px-6 lg:px-24"
  >
    <div class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-2xl sm:text-3xl font-bold leading-tight">
        {{ t("mrvTitle") }}
      </h2>
      <p class="mt-4 content max-w-xl mx-auto">
        {{ t("mrvSectionText") }}
      </p>
      <div class="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>

      <div class="flex justify-center mt-4">
        <div class="w-48 h-[3px] bg-[#10b481]"></div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="service-card bg-white p-6 rounded-2xl shadow-md transition duration-300"
        data-aos="fade-up"
      >
        <div class="text-[#10b481] text-3xl mb-4">
          <i class="fas fa-chart-line"></i>
        </div>
        <h4 class="mb-3 subtitle font-medium">{{ t("dataCollection") }}</h4>
        <p class="content">
          {{ t("dataText") }}
        </p>
      </div>
      <div
        class="service-card bg-white p-6 rounded-2xl shadow-md transition duration-300"
        data-aos="fade-up"
      >
        <div class="text-[#10b481] text-3xl mb-4">
          <i class="fas fa-tachometer-alt"></i>
        </div>
        <h4 class="mb-3 subtitle font-medium">{{ t("dashboard") }}</h4>
        <p class="content">
          {{ t("dashboardText") }}
        </p>
      </div>
      <div
        class="service-card bg-white p-6 rounded-2xl shadow-md transition duration-300"
        data-aos="fade-up"
      >
        <div class="text-[#10b481] text-3xl mb-4">
          <i class="fas fa-database"></i>
        </div>
        <h4 class="mb-3 subtitle font-medium">Database</h4>
        <p class="content">
          {{ t("databaseText") }}
        </p>
      </div>
      <div
        class="service-card bg-white p-6 rounded-2xl shadow-md transition duration-300"
        data-aos="fade-up"
      >
        <div class="text-[#10b481] text-3xl mb-4">
          <i class="fas fa-globe-americas"></i>
        </div>
        <h4 class="mb-3 subtitle font-medium">{{ t("analysis") }}</h4>
        <p class="content">
          {{ t("analysisText") }}
        </p>
      </div>
      <div
        class="service-card bg-white p-6 rounded-2xl shadow-md transition duration-300"
        data-aos="fade-up"
      >
        <div class="text-[#10b481] text-3xl mb-4">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h4 class="mb-3 subtitle font-medium">{{ t("protection") }}</h4>
        <p class="content">
          {{ t("protectionText") }}
        </p>
      </div>
      <div
        class="service-card bg-white p-6 rounded-2xl shadow-md transition duration-300"
        data-aos="fade-up"
      >
        <div class="text-[#10b481] text-3xl mb-4">
          <i class="fas fa-newspaper"></i>
        </div>
        <h4 class="mb-3 subtitle font-medium">{{ t("subbscription") }}</h4>
        <p class="content">{{ t("subbscriptionText") }}</p>
      </div>
    </div>
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
