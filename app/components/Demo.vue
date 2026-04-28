<template>
  <section id="demo" class="relative overflow-hidden bg-[#fafaf9] dark:bg-[#0b1a1f] py-24 px-4 sm:px-6 lg:px-24 transition-colors duration-300">
    <!-- Decorative background accent -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>

    <div class="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto relative z-10">
      
      <!-- Left: MacBook Pro Mockup Container -->
      <div class="w-full lg:w-1/2" data-aos="fade-right">
        <div class="relative mx-auto max-w-[600px] group">
          
          <!-- MacBook Screen Shell -->
          <div class="relative bg-gray-800 dark:bg-black rounded-t-[2rem] p-2 pt-4 shadow-2xl border-x-2 border-t-2 border-gray-700 dark:border-white/10">
            <!-- Screen Notch/Camera area -->
            <div class="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-b-xl z-20"></div>
            
            <!-- Screen Content (Canva) -->
            <div class="relative aspect-[16/10] overflow-hidden rounded-lg bg-black">
               <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.canva.com/design/DAGYzTIDa-c/YRVzquDVeA76WKafhB_Mbg/view?embed"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              
              <!-- Glass reflection effect -->
              <div class="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-50"></div>
            </div>
          </div>
          
          <!-- MacBook Bottom Base -->
          <div class="relative h-4 bg-gray-700 dark:bg-[#112830] rounded-b-xl shadow-xl w-[105%] -left-[2.5%]">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-800 dark:bg-black rounded-b-md"></div>
          </div>

          <!-- Bottom Shadow -->
          <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-[#112830]/10 blur-2xl rounded-full"></div>
        </div>
      </div>

      <!-- Right: Content -->
      <div class="w-full lg:w-1/2 flex flex-col" data-aos="fade-left">
        <div class="mb-10">
          <h5 class="uppercase text-sm tracking-[0.2em] font-bold text-[#10b481] mb-4">
            {{ t("mrvHighlights") }}
          </h5>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-6">
            {{ t("mrvAsk") }}
          </h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 font-inter leading-relaxed">
            {{ t("mrvRes") }}
          </p>
        </div>

        <ul class="space-y-6">
          <li
            v-for="i in 5"
            :key="i"
            class="flex items-start gap-5 group"
            data-aos="fade-up"
            :data-aos-delay="100 * i"
          >
            <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 shadow-sm text-[#10b481] group-hover:bg-[#10b481] group-hover:text-white transition-all duration-300">
              <i class="bx bx-check text-xl font-bold"></i>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 font-inter leading-relaxed group-hover:text-[#112830] dark:group-hover:text-white transition-colors">
                {{ t("mrvRes" + i) }}
              </p>
            </div>
          </li>
        </ul>
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
}
</style>
