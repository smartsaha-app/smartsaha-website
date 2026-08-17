<template>
  <div class="bg-[#fafaf9] dark:bg-[#0b1a1f] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-24 transition-colors duration-300">
    <div class="max-w-5xl mx-auto">
      <!-- Header Section -->
      <div class="mb-16 text-center" data-aos="fade-up">
        <h5 class="uppercase text-sm tracking-widest text-[#10b481] font-bold mb-4">
          Terms & Conditions
        </h5>
        <h1 class="text-4xl sm:text-5xl font-manropeExtra text-[#112830] dark:text-white mb-6">
          {{ t('termstitle') }}
        </h1>
        <div class="w-24 h-1 bg-[#10b481] mx-auto rounded-full mb-8"></div>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
          {{ t('termsintro') }}
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Sticky Navigation -->
        <aside class="lg:w-1/4 hidden lg:block">
          <div class="sticky top-32 space-y-4 border-l-2 border-gray-100 dark:border-white/10 pl-6">
            <a v-for="i in 9" :key="i" :href="'#terms' + i" class="block text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#10b481] transition-colors py-1">
              {{ t("termssection" + i + "_title") }}
            </a>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:w-3/4 bg-white dark:bg-white/5 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-white/10 transition-colors" data-aos="fade-up" data-aos-delay="200">
          <div class="prose prose-green max-w-none space-y-12">
            
            <section v-for="i in 9" :key="i" :id="'terms' + i" class="scroll-mt-32">
              <h2 class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3">
                <span class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold">
                  {{ i < 10 ? '0' + i : i }}
                </span>
                {{ t("termssection" + i + "_title") }}
              </h2>
              
              <template v-if="i === 2">
                <ul class="space-y-3">
                  <li v-for="item in t('termssection2_list')" :key="item" class="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <i class="bx bx-check-circle text-[#10b481] mt-1"></i>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </template>

              <template v-else-if="i === 9">
                <div class="bg-[#10b481]/5 p-6 rounded-2xl border border-[#10b481]/20">
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ t('termssection9_text') }}
                    <a href="mailto:smartsaapp@gmail.com" class="text-[#10b481] font-bold hover:underline ml-1">
                      smartsaapp@gmail.com
                    </a>.
                  </p>
                </div>
              </template>

              <template v-else>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t("termssection" + i + "_text") }}</p>
              </template>
            </section>

          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

useSeoMeta({
  title: "Terms of Use",
  description: "Read the terms and conditions for using the SmartSaha platform.",
  robots: "noindex, follow",
});
</script>

<style scoped>
section {
  scroll-margin-top: 100px;
}
</style>