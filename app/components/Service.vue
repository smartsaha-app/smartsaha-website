<template>
  <section class="py-20 bg-light text-dark">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-12" data-aos="fade-up">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#112830]">
          {{ t("ourService") }}
        </h2>
        <p class="mt-4 content max-w-xl mx-auto">
          {{ t("serviceText") }}
        </p>
        <div class="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>

        <div class="flex justify-center mt-4">
          <div class="w-48 h-[3px] bg-[#10b481]"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="bg-[#fafaf9] rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center flex flex-col items-center"
          data-aos="fade-up"
        >
          <div class="text-[#10b481] text-4xl mb-4">
            <i class="fas fa-seedling"></i>
          </div>
          <h3 class="subtitle mb-2">
            {{ t("precisonAgriculture") }}
          </h3>
          <p class="content mb-6">
            {{ t("servicePaText") }}
          </p>
          <a
            href="#precision-agri"
            class="btn-primary"
            >{{ t("learnMore") }}</a
          >
        </div>

        <div
          class="bg-[#fafaf9] rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center flex flex-col items-center"
          data-aos="fade-up"
        >
          <div class="text-[#10b481] text-4xl mb-4">
            <i class="fas fa-tools"></i>
          </div>
          <h3 class="subtitle mb-2">{{ t("agribusiness") }}</h3>
          <p class="content mb-6">
            {{ t("agriText") }}
          </p>
          <a
            href="#mvr"
            class="btn-primary"
            >{{ t("learnMore") }}</a
          >
        </div>

        <div
          class="bg-[#fafaf9] rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center flex flex-col items-center"
          data-aos="fade-up"
        >
          <div class="text-[#10b481] text-4xl mb-4">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3 class="subtitle mb-2">{{ t("mrv") }}</h3>
          <p class="content mb-6">
            {{ t("mrvText") }}
          </p>
          <a
            href="#canva"
            class="btn-primary"
            >{{ t("learnMore") }}</a
          >
        </div>
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

<style scoped>
section {
  position: relative;
  overflow: hidden;
}
</style>
