<template>
  <section
    class="relative bg-cover bg-center pt-16 sm:pt-20"
    style="background-image: url('/bg-hero.jpeg')"
  >
    <div
      class="absolute inset-0 bg-gradient-to-t from-[#112830] via-[#112830]/70 to-[#10b481]/50"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-start gap-6"
    >
      <div class="hidden lg:flex flex-col items-center gap-6 mr-1">
        <div class="flex flex-col gap-4">
          <a href="#" class="text-white hover:text-[#10b481] transition"
            ><i class="bx bxl-linkedin text-2xl"></i
          ></a>
          <a href="#" class="text-white hover:text-[#10b481] transition"
            ><i class="bx bxl-facebook text-2xl"></i
          ></a>
        </div>
        <div class="w-px h-24 bg-white/70 mb-10"></div>
        <span class="text-white tracking-widest -rotate-90 small-medium text-sm">{{
          t("followUs")
        }}</span>
      </div>

      <div class="flex-1 flex flex-col justify-center gap-2 text-white z-10">
        <h5 class="uppercase text-sm small tracking-widest font-medium">
          {{ t("titleHero") }}
        </h5>
        <h1
          class="text-hero text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          {{ t("accrocheHero") }}
        </h1>
        <p class="text-gray-200 small max-w-xl">
          {{ t("heroText") }}
        </p>
        <button
          class="inline-flex items-center w-max gap-3 border border-white px-6 py-2 rounded-full transition mt-4"
        >
          {{ t("getStarted") }}
          <i class="bxr bx-arrow-right-stroke text-2xl"></i>
        </button>
      </div>

      <div
        class="flex-1 flex justify-end z-10 mt-24 sm:mt-1 lg:mt-auto sm:mr-4 lg:mr-12"
      >
        <div
          class="relative bg-white/20 backdrop-blur-md rounded-2xl shadow-lg max-w-sm flex flex-col items-center text-center"
        >
          <div
            class="absolute -top-16 bg-white h-32 w-32 flex justify-center items-center rounded-2xl shadow-md"
          >
            <img class="h-20 w-auto" src="/store.png" alt="SmartSaha Logo" />
          </div>

          <div class="p-8 w-full rounded-b-xl mt-16 flex flex-col items-center">
            <h3 class="light-subtitle text-white uppercase">
              {{ t("marketplace") }}
            </h3>
            <p
              class="text-gray-600 text-sm small mb-4 text-center text-white/80"
            >
              {{ t("marketplaceText") }}
            </p>
            <button class="btn-primary">
              {{ t("joinUs") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6 z-10 mb-20"
    >
      <div
        class="bg-white rounded-3xl shadow-lg flex flex-col lg:flex-row p-4 gap-5"
      >
        <div
          class="lg:w-1/2  rounded-2xl bg-center bg-cover"
          style="background-image: url('/precision-agriculture.jpg')"
        ></div>

        <div class="lg:w-1/2 flex flex-col justify-between px-2">
          <div class="">
            <h4 class="text-xl subtitle text-[#10b481] uppercase mb-3">
              {{ t("precisonAgriculture") }}
            </h4>
            <p class="content">
              {{ t("precisionText") }}
            </p>
          </div>

          <button class="inline-flex items-center w-max gap-3 btn-primary mt-4">
            {{ t("learnMore") }}
            <i class="bxr bx-arrow-right-stroke"></i>
          </button>
        </div>
      </div>

      <div
        class="bg-white rounded-3xl shadow-lg flex flex-col lg:flex-row p-4 gap-5"
      >
        <div class="lg:w-1/2 flex flex-col justify-between px-2">
          <div class="">
            <h4 class="text-xl subtitle uppercase mb-3">
              {{ t("evaluation") }}
            </h4>
            <p class="content">
              {{ t("evolutionText") }}
            </p>
          </div>

          <button class="inline-flex items-center w-max gap-3 btn-neutre mt-4">
            {{ t("explore") }}
            <i class="bxr bx-arrow-right-stroke"></i>
          </button>
        </div>
        <div
          class="lg:w-1/2  rounded-2xl bg-center bg-cover"
          style="background-image: url('monitoring.jpeg')"
        ></div>
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
