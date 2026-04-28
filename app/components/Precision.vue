<template>
  <section id="precision" class="relative overflow-hidden bg-white dark:bg-[#0b1a1f] py-24 px-4 sm:px-6 lg:px-24 transition-colors duration-300">
    <!-- Background Accents -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-[#fafaf9] dark:bg-[#112830] rounded-l-[5rem] -z-0 transition-colors"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16 mb-20">
        <!-- Text Content -->
        <div class="lg:w-1/2 flex flex-col" data-aos="fade-right">
          <h5 class="uppercase text-sm tracking-[0.2em] font-bold text-[#10b481] mb-4">
            Advanced Tech
          </h5>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-6">
            {{ t("paTitle") }}
          </h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 font-inter leading-relaxed">
            {{ t("paText") }}
          </p>
        </div>

        <!-- Image with floating effect -->
        <div class="lg:w-1/2" data-aos="zoom-in">
          <div class="relative p-4">
            <div class="absolute inset-0 bg-[#10b481]/10 rounded-[3rem] rotate-3 -z-10 transform scale-105"></div>
            <div class="rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="/satellite.png"
                alt="Satellite"
                class="w-full h-auto transform hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bento-style details -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Description Card -->
        <div
          class="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-xl transition-all duration-500"
          data-aos="fade-up"
        >
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed font-inter italic">
            "{{ t("paDesc") }}"
          </p>
          <button
            @click="scrollTo('contact')"
            class="mt-10 btn-primary px-8 py-3 w-max"
          >
            {{ t("getStarted") }}
          </button>
        </div>

        <!-- Benefits Card (Dark) -->
        <div
          class="bg-[#112830] rounded-[2.5rem] p-10 shadow-xl text-white relative overflow-hidden group"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="bx bx-trending-up text-9xl"></i>
          </div>
          
          <h4 class="text-2xl font-manropeSemi mb-8 relative z-10">
            {{ t("paBenefTitle") }}
          </h4>

          <ul class="space-y-6 relative z-10">
            <li v-for="i in 3" :key="i" class="flex items-center gap-4 group/item">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#10b481] group-hover/item:bg-[#10b481] group-hover/item:text-white transition-all">
                <i class="bx bx-check text-xl"></i>
              </div>
              <span class="font-medium text-gray-300">{{ t("paBenef" + i) }}</span>
            </li>
          </ul>
        </div>

        <!-- Visual Card -->
        <div
          class="rounded-[2.5rem] bg-[#10b481] shadow-xl overflow-hidden relative min-h-[300px] group"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div 
            class="absolute inset-0 bg-center bg-cover transform group-hover:scale-110 transition-transform duration-1000"
            style="background-image: url('/pa.jpeg');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#112830]/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="text-white font-bold text-lg tracking-wide uppercase">Innovation in fields</span>
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

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}
</style>
