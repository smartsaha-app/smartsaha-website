<template>
  <section
    class="relative overflow-hidden bg-gray-50 py-16 px-4 sm:px-6 lg:px-24"
  >
    <div
      class="flex flex-col md:flex-row items-stretch gap-12 max-w-7xl mx-auto"
    >
      <div class="w-full md:w-1/2" data-aos="fade-up">
        <div
          class="relative w-full h-full min-h-[380px] rounded-2xl shadow-xl overflow-hidden"
        >
          <iframe
            class="absolute inset-0 w-full h-full"
            src="https://www.canva.com/design/DAGYzTIDa-c/YRVzquDVeA76WKafhB_Mbg/view?embed"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div class="flex-1 w-full md:w-1/2 flex flex-col">
        <!-- <p class="text-gray-700 mb-6 leading-relaxed" data-aos="fade-up"></p> -->

        <div class="flex flex-col px-2 sm:px-4 mb-3">
          <h2 class="uppercase text-sm small tracking-widest text-[#10b481]">
            {{ t("mrvHighlights") }}
          </h2>
          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3"
          >
            {{ t("mrvAsk") }}
          </h2>
          <p class="content">
            {{ t("mrvRes") }}
          </p>
        </div>

        <div class="mt-3 pl-4">
          <ul class="flex flex-col gap-4">
            <li
              class="flex items-start gap-4 group transition-all"
              data-aos="fade-left"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#10b481]/15 group-hover:bg-[#10b481] transition"
              >
                <i
                  class="bx bx-check text-[#10b481] group-hover:text-white text-sm font-bold"
                ></i>
              </div>
              <p
                class="small-medium text-gray-700 text-sm leading-relaxed group-hover:tex-[#10b481]"
              >
                {{ t("mrvRes1") }}
              </p>
            </li>

            <li
              class="flex items-start gap-4 group transition-all"
              data-aos="fade-left"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#10b481]/15 group-hover:bg-[#10b481] transition"
              >
                <i
                  class="bx bx-check text-[#10b481] group-hover:text-white text-sm font-bold"
                ></i>
              </div>
              <p
                class="small-medium text-gray-700 text-sm leading-relaxed group-hover:tex-[#10b481]"
              >
                {{ t("mrvRes2") }}
              </p>
            </li>

            <li
              class="flex items-start gap-4 group transition-all"
              data-aos="fade-left"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#10b481]/15 group-hover:bg-[#10b481] transition"
              >
                <i
                  class="bx bx-check text-[#10b481] group-hover:text-white text-sm font-bold"
                ></i>
              </div>
              <p
                class="small-medium text-gray-700 text-sm leading-relaxed group-hover:tex-[#10b481]"
              >
                {{ t("mrvRes3") }}
              </p>
            </li>

            <li
              class="flex items-start gap-4 group transition-all"
              data-aos="fade-left"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#10b481]/15 group-hover:bg-[#10b481] transition"
              >
                <i
                  class="bx bx-check text-[#10b481] group-hover:text-white text-sm font-bold"
                ></i>
              </div>
              <p
                class="small-medium text-gray-700 text-sm leading-relaxed group-hover:tex-[#10b481]"
              >
                {{ t("mrvRes4") }}
              </p>
            </li>

            <li
              class="flex items-start gap-4 group transition-all"
              data-aos="fade-left"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#10b481]/15 group-hover:bg-[#10b481] transition"
              >
                <i
                  class="bx bx-check text-[#10b481] group-hover:text-white text-sm font-bold"
                ></i>
              </div>
              <p
                class="small-medium text-gray-700 text-sm leading-relaxed group-hover:tex-[#10b481]"
              >
                {{ t("mrvRes5") }}
              </p>
            </li>
          </ul>
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
