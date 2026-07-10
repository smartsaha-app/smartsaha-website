<template>
  <section id="team" class="relative bg-[#fafaf9] dark:bg-[#0a0a0a] py-24 px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-[#10b481]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-20" data-aos="fade-up">
        <h5 class="uppercase text-sm tracking-widest text-[#10b481] font-bold mb-4">
          Our Visionaries
        </h5>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-manropeExtra text-[#112830] dark:text-white mb-6">
          {{ t("teamTitle") }}
        </h2>
        <div class="flex justify-center">
          <div class="w-24 h-1 bg-[#10b481] rounded-full"></div>
        </div>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="group relative bg-white dark:bg-[#161616] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-white/10"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Member Image Container -->
          <div class="relative h-80 overflow-hidden">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
            />
            
            <!-- Social Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#112830]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
              <div class="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <a :href="member.linkedin" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-[#10b481] hover:scale-110 transition-all">
                  <i class="bx bxl-linkedin text-2xl"></i>
                </a>
                <a :href="'mailto:' + member.email" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-[#10b481] hover:scale-110 transition-all">
                  <i class="bx bx-envelope text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Member Info -->
          <div class="p-8 text-center bg-white dark:bg-[#161616] relative">
            <!-- Decorative circle behind name -->
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#10b481] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            
            <h3 class="text-xl font-manropeSemi text-[#112830] dark:text-white mb-2 group-hover:text-[#10b481] transition-colors">
              {{ member.name }}
            </h3>
            <p class="text-xs uppercase tracking-widest text-[#10b481] font-bold mb-4 opacity-80">
              {{ member.role }}
            </p>
            <div class="w-8 h-0.5 bg-gray-100 mx-auto mb-4 group-hover:w-16 transition-all duration-500 group-hover:bg-[#10b481]"></div>
            <p class="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {{ member.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

const teamMembers = computed(() => [
  {
    name: "Michel Raherimenanantsoa",
    role: t("teamJob1"),
    description: t("teamJobDesc1"),
    image: "/Michel.jpg",
    linkedin: "https://www.linkedin.com/in/michel-raherimanantsoa-2bab19a9",
    email: "smartsaapp@gmail.com"
  },
  {
    name: "Fitahiana Rahetimazava",
    role: t("teamJob2"),
    description: t("teamJobDesc2"),
    image: "/Fitahiana.jpg",
    linkedin: "https://www.linkedin.com/in/fitahiana-rahetimazava-ramangamihanta-b77758145/",
    email: "smartsaapp@gmail.com"
  },
  {
    name: "Rindra Ranaivosoa",
    role: t("teamJob4"),
    description: t("teamJobDesc4"),
    image: "/Rindra.jpg",
    linkedin: "https://www.linkedin.com/in/g%C3%A9rald-rindra-ranaivosoa-454549202/",
    email: "smartsaapp@gmail.com"
  }
]);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
