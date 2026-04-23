<template>
  <section
    class="relative overflow-hidden bg-[#fafaf9] text-white py-16 px-4 sm:px-6 lg:px-24"
  >
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start justify-between relative z-10"
    >
      <div class="flex-1 flex flex-col space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div
            class="w-full h-[200px] rounded-2xl overflow-hidden"
            data-aos="fade-up"
          >
            <picture>
              <img
                src="/satellite.png"
                alt="Satellite"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>

          <div class="flex flex-col justify-center px-2 sm:px-4">
            <h2
              class="uppercase text-sm tracking-widest small text-[#10b481] font-medium"
              data-aos="fade-up"
            >
              {{ t("precisonAgriculture") }}
            </h2>
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3"
            >
              {{ t("paTitle") }}
            </h2>
            <p class="content">{{ t("paText") }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 texte">
          <div
            class="rounded-2xl transition-all p-6 pl-0 pb-0 duration-300 h-auto min-h-[200px]"
          >
            <p class="leading-relaxed content">
              {{ t("paDesc") }}
            </p>

            <button
              class="inline-flex items-center w-max gap-3 btn-primary mt-6"
            >
              {{ t("getStarted") }}
              <i class="bxr bx-arrow-right-stroke"></i>
            </button>
          </div>

          <div
            class="rounded-2xl bg-[#10b481] p-6 transition-all duration-300 h-auto min-h-[200px] hover:shadow-xl"
          >
            <p class="leading-relaxed light-content mb-6 max-w-sm">
              {{ t("paBenefTitle") }}
            </p>

            <ul class="space-y-4">
              <li class="flex items-start gap-3 text-white">
                <span
                  class="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <i class="bx bx-check text-sm"></i>
                </span>
                <span class="small-medium text-sm">{{ t("paBenef1") }}</span>
              </li>

              <li class="flex items-start gap-3 text-white">
                <span
                  class="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <i class="bx bx-check text-sm"></i>
                </span>
                <span class="small-medium text-sm">{{ t("paBenef2") }}</span>
              </li>

              <li class="flex items-start gap-3 text-white">
                <span
                  class="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <i class="bx bx-check text-sm"></i>
                </span>
                <span class="small-medium text-sm">{{ t("paBenef3") }}</span>
              </li>
            </ul>
          </div>

          <div
            class="rounded-2xl bg-[#10b481] p-6 transition-all duration-300 h-auto min-h-[200px] hover:shadow-xl"
            style="
              background-image: url('/pa.jpeg');
              background-size: cover;
              background-position: center;
            "
          ></div>
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
