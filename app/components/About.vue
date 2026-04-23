<template>
  <section class="relative bg-gray-50 bg-center py-16 px-4 sm:px-6 lg:px-24">
    <div
      class="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6"
    >
      <div class="flex-1 flex flex-col gap-6">
        <h5
          class="uppercase text-sm tracking-widest text-[#10b481] small -mb-6"
        >
          {{ t("aboutUs") }}
        </h5>

        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2"
        >
          {{ t("aboutTitle") }}
        </h2>

        <div
          class="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[330px] rounded-2xl overflow-hidden shadow-md group cursor-pointer p-6 sm:p-8 flex flex-col justify-end"
          style="
            background-image: url('/Agribio.gif');
            background-size: cover;
            background-position: center;
          "
        >
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#112830]/40"
          ></div>

          <div class="relative z-10 text-white">
            <h3 class="light-subtitle mb-4">
              {{ t("aboutObject") }}
            </h3>
            <p class="light-content">
              {{ t("objectText") }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col gap-8">
        <p class="content max-w-xl sm:mt-14">
          {{ t("aboutText") }}
        </p>

        <div class="flex flex-col gap-6">
          <div class="rounded-2xl shadow-md p-6 sm:p-8 bg-[#10b481]/15">
            <h3 class="subtitle mb-4">
              {{ t("aboutProblem") }}
            </h3>
            <p class="content">
              {{ t("problemText") }}
            </p>
          </div>

          <div class="rounded-2xl shadow-md p-6 sm:p-8 bg-[#10b481] text-white">
            <h3 class="light-subtitle mb-4">
              {{ t("aboutSolution") }}
            </h3>
            <p class="light-content">
              {{ t("solutionText") }}
            </p>
          </div>
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
