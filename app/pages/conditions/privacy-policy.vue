<template>
  <div
    class="bg-[#fafaf9] dark:bg-[#0b1a1f] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-24 transition-colors duration-300"
  >
    <div class="max-w-5xl mx-auto">

      <!-- Header Section -->
      <div class="mb-16 text-center" data-aos="fade-up">
        <h5
          class="uppercase text-sm tracking-widest text-[#10b481] font-bold mb-4"
        >
          {{ t("legalInfoBadge") }}
        </h5>

        <h1
          class="text-4xl sm:text-5xl font-manropeExtra text-[#112830] dark:text-white mb-6"
        >
          {{ t("title") }}
        </h1>

        <div class="w-24 h-1 bg-[#10b481] mx-auto rounded-full mb-8"></div>

        <p
          class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed italic"
        >
          {{ t("intro") }}
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">

        <!-- Sticky Navigation -->
        <aside class="lg:w-1/4 hidden lg:block">
          <div
            class="sticky top-32 space-y-4 border-l-2 border-gray-100 dark:border-white/10 pl-6"
          >
            <a
              v-for="i in 8"
              :key="i"
              :href="'#section' + i"
              class="block text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#10b481] transition-colors py-1"
            >
              {{ t("section" + i + "_title") }}
            </a>
          </div>
        </aside>

        <!-- Main Content -->
        <main
          class="lg:w-3/4 bg-white dark:bg-white/5 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-white/10 transition-colors"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="prose prose-green max-w-none space-y-12">

            <!-- SECTION 1 -->
            <section id="section1" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  01
                </span>

                {{ t("section1_title") }}
              </h2>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
              >
                {{ t("section1_text") }}
              </p>

              <ul class="space-y-3">
                <li
                  v-for="(item, index) in tm('section1_list')"
                  :key="index"
                  class="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <i
                    class="bx bx-check-circle text-[#10b481] mt-1"
                  ></i>

                  <span>{{ rt(item) }}</span>
                </li>
              </ul>
            </section>

            <!-- SECTION 2 -->
            <section id="section2" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  02
                </span>

                {{ t("section2_title") }}
              </h2>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
              >
                {{ t("section2_text") }}
              </p>

              <ul class="space-y-3">
                <li
                  v-for="(item, index) in tm('section2_list')"
                  :key="index"
                  class="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <i
                    class="bx bx-check-circle text-[#10b481] mt-1"
                  ></i>

                  <span>{{ rt(item) }}</span>
                </li>
              </ul>
            </section>

            <!-- SECTION 3 -->
            <section id="section3" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  03
                </span>

                {{ t("section3_title") }}
              </h2>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
              >
                {{ t("section3_text") }}
              </p>

              <ul class="space-y-3">
                <li
                  v-for="(item, index) in tm('section3_list')"
                  :key="index"
                  class="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <i
                    class="bx bx-check-circle text-[#10b481] mt-1"
                  ></i>

                  <span>{{ rt(item) }}</span>
                </li>
              </ul>
            </section>

            <!-- SECTION 4 -->
            <section id="section4" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  04
                </span>

                {{ t("section4_title") }}
              </h2>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {{ t("section4_text") }}
              </p>
            </section>

            <!-- SECTION 5 -->
            <section id="section5" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  05
                </span>

                {{ t("section5_title") }}
              </h2>

              <div
                class="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10"
              >
                <p
                  class="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {{ t("section5_text") }}

                  <a
                    :href="'mailto:' + t('contact_email')"
                    class="text-[#10b481] font-bold hover:underline ml-1"
                  >
                    smartsahaapp@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <!-- SECTION 6 -->
            <section id="section6" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  06
                </span>

                {{ t("section6_title") }}
              </h2>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {{ t("section6_text") }}
              </p>
            </section>

            <!-- SECTION 7 -->
            <section id="section7" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  07
                </span>

                {{ t("section7_title") }}
              </h2>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {{ t("section7_text") }}
              </p>
            </section>

            <!-- SECTION 8 -->
            <section id="section8" class="scroll-mt-32">
              <h2
                class="text-2xl font-manropeSemi text-[#112830] dark:text-white mb-4 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 flex items-center justify-center bg-[#10b481]/10 text-[#10b481] rounded-lg text-sm font-bold"
                >
                  08
                </span>

                {{ t("section8_title") }}
              </h2>

              <div
                class="bg-[#10b481]/5 p-6 rounded-2xl border border-[#10b481]/20"
              >
                <p
                  class="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {{ t("section8_text") }}

                  <a
                    :href="'mailto:' + t('contact_email')"
                    class="text-[#10b481] font-bold hover:underline ml-1"
                  >
                    smartsahaapp@gmail.com
                  </a>
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n();

useSeoMeta({
  title: () => t("title"),
  description: () => t("privacyMetaDescription"),
  robots: "noindex, follow",
});
</script>

<style scoped>
.prose h2 {
  scroll-margin-top: 100px;
}
</style>