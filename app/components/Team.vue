<template>
  <div
    class="relative overflow-hidden bg-gray-50 text-white py-16 px-4 sm:px-6 lg:px-24"
  >
    <div class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#112830]">
        {{ t("teamTitle") }}
      </h2>
      <div class="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

      <div class="flex justify-center mt-4">
        <div class="w-48 h-[3px] bg-[#10b481]"></div>
      </div>
    </div>

    <div class="relative">
      <div
        id="team-container"
        class="flex gap-6 overflow-x-auto scroll-smooth px-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 sm:overflow-visible"
      >
        <div
          class="group relative bg-white min-w-[280px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              src="/Michel.jpg"
              alt="Team Member"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#112830]/90 via-[#112830]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center"
            >
              <div
                class="flex gap-4 mb-6 translate-y-6 group-hover:translate-y-0 transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/michel-raherimanantsoa-2bab19a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bxl-linkedin"></i>
                </a>

                <a
                  href="mailto:smartsaapp@gmail.com?subject=Demande%20d'information&body=Bonjour%2C%20je%20souhaite%20..."
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bx-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="p-6 text-center">
            <h3 class="subtitle">Michel Raherimenanantsoa</h3>
            <p class="text-sm small-medium text-[#10b481] font-medium mt-1">
              {{ t("teamJob1") }}
            </p>
            <p class="content text-sm mt-3 leading-relaxed">
              {{ t("teamJobDesc1") }}
            </p>
          </div>
        </div>

        <div
          class="group relative bg-white min-w-[280px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              src="/Fitahiana.jpg"
              alt="Team Member"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#112830]/90 via-[#112830]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center"
            >
              <div
                class="flex gap-4 mb-6 translate-y-6 group-hover:translate-y-0 transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/fitahiana-rahetimazava-ramangamihanta-b77758145/"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bxl-linkedin"></i>
                </a>

                <a
                  href="mailto:smartsaapp@gmail.com?subject=Demande%20d'information&body=Bonjour%2C%20je%20souhaite%20..."
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bx-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="p-6 text-center">
            <h3 class="subtitle">Fitahiana Rahetimazava</h3>
            <p class="text-sm small-medium text-[#10b481] font-medium mt-1">
              {{ t("teamJob2") }}
            </p>
            <p class="content text-sm mt-3 leading-relaxed">
              {{ t("teamJobDesc2") }}
            </p>
          </div>
        </div>

        <div
          class="group relative bg-white min-w-[280px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              src="/Hasina.jpg"
              alt="Team Member"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#112830]/90 via-[#112830]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center"
            >
              <div
                class="flex gap-4 mb-6 translate-y-6 group-hover:translate-y-0 transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/hasina-henintsoa-andriatsitohaina-2b2042a6/"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bxl-linkedin"></i>
                </a>

                <a
                  href="mailto:smartsaapp@gmail.com?subject=Demande%20d'information&body=Bonjour%2C%20je%20souhaite%20..."
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bx-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="p-6 text-center">
            <h3 class="subtitle">Hasina Andriatsitohaina</h3>
            <p class="text-sm small-medium text-[#10b481] font-medium mt-1">
              {{ t("teamJob3") }}
            </p>
            <p class="content text-sm mt-3 leading-relaxed">
              {{ t("teamJobDesc3") }}
            </p>
          </div>
        </div>

        <div
          class="group relative bg-white min-w-[280px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              src="/Rindra.jpg"
              alt="Team Member"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#112830]/90 via-[#112830]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center"
            >
              <div
                class="flex gap-4 mb-6 translate-y-6 group-hover:translate-y-0 transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/g%C3%A9rald-rindra-ranaivosoa-454549202/"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bxl-linkedin"></i>
                </a>

                <a
                  href="mailto:smartsaapp@gmail.com?subject=Demande%20d'information&body=Bonjour%2C%20je%20souhaite%20..."
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[#10b481] hover:bg-white hover:scale-110 transition"
                >
                  <i class="bx bx-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="p-6 text-center">
            <h3 class="subtitle">Rindra Ranaivosoa</h3>
            <p class="text-sm small-medium text-[#10b481] font-medium mt-1">
              {{ t("teamJob4") }}
            </p>
            <p class="content text-sm mt-3 leading-relaxed">
              {{ t("teamJobDesc4") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12" data-aos="fade-up"></div>
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
</script>
