<template>
  <section class="relative bg-[#fafaf9] text-gray-800 py-24 px-4 sm:px-6 lg:px-24">
    <div class="max-w-7xl mx-auto mt-6">
      <div class="max-w-2xl mb-14">
        <h2 class="text-2xl sm:text-4xl font-bold mb-4">
          {{ t("contact") }}
        </h2>
        <p class="content">
          {{ t("subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 bg-white border boredr-gray-200 rounded-2xl  p-8 sm:p-10">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-sm small-medium text-gray-700"
                  >{{ t("name") }} *</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Your full name"
                  class="w-full px-4 py-2.5 content rounded-lg border text-sm bg-white text-gray-700 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-[#10b481]/30 focus:border-[#10b481]"
                />
              </div>
              <div>
                <label class="text-sm small-medium text-gray-700">{{
                  t("company")
                }}</label>
                <input
                  v-model="form.company"
                  type="text"
                  placeholder="Company or organization"
                  class="w-full px-4 py-2.5 content rounded-lg border text-sm bg-white text-gray-700 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-[#10b481]/30 focus:border-[#10b481]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-sm small-medium text-gray-700"
                  >{{ t("email") }} *</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  class="w-full px-4 py-2.5 content rounded-lg border text-sm bg-white text-gray-700 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-[#10b481]/30 focus:border-[#10b481]"
                />
              </div>
              <div>
                <label class="text-sm small-medium text-gray-700">{{
                  t("mobile")
                }}</label>
                <input
                  v-model="form.mobile"
                  type="tel"
                  placeholder="+261 xx xxx xx"
                  class="w-full px-4 py-2.5 content rounded-lg border text-sm bg-white text-gray-700 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-[#10b481]/30 focus:border-[#10b481]"
                />
              </div>
            </div>

            <div>
              <p class="text-sm small-medium text-gray-700 mb-3">
                {{ t("interest") }}
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label class="flex items-center gap-4 content">
                  <input
                    type="checkbox"
                    v-model="form.interests"
                    value="Investing"
                    class="accent-[#10b481]"
                  />
                  {{ t("invest") }}
                </label>
                <label class="flex items-center gap-4 content">
                  <input
                    type="checkbox"
                    v-model="form.interests"
                    value="Work with us"
                    class="accent-[#10b481]"
                  />
                  {{ t("work") }}
                </label>
                <label class="flex items-center gap-4 content">
                  <input
                    type="checkbox"
                    v-model="form.interests"
                    value="Test platform"
                    class="accent-[#10b481]"
                  />
                  {{ t("platform") }}
                </label>
                <label class="flex items-center gap-4 content">
                  <input
                    type="checkbox"
                    v-model="form.interests"
                    value="Tailored services"
                    class="accent-[#10b481]"
                  />
                  {{ t("tailor") }}
                </label>
              </div>
            </div>

            <div>
              <label class="text-sm small-medium text-gray-700">
                {{ t("message") }}
              </label>
              <textarea
                v-model="form.comments"
                rows="5"
                placeholder="Tell us more about your project or questions"
                class="w-full px-4 py-2.5 content rounded-lg border text-sm bg-white text-gray-700 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-[#10b481]/30 focus:border-[#10b481] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="inline-flex items-center gap-2 btn-primary"
            >
              {{ t("sendMessage") }}
            </button>
          </form>
        </div>

        <div class="flex-1 bg-white border boredr-gray-200 rounded-2xl p-8 space-y-8 h-fit">
          <h3 class="subtitle">
            {{ t("contactInfo") }}
          </h3>

          <div class="space-y-8 text-gray-600">
            <div class="flex gap-4">
              <i class="bxr bx-envelope text-[#10b481] text-xl"></i>
              <div>
                <p class="label">{{ t("general") }}</p>
                <p class="content">contact@smartsaha.com</p>
              </div>
            </div>

            <div class="flex gap-4">
              <i class="bx bx-briefcase text-[#10b481] text-xl"></i>

              <div>
                <p class="label">{{ t("sales") }}</p>
                <p class="content">sales@smartsaha.com</p>
              </div>
            </div>

            <div class="flex gap-4">
              <i class="bx bx-user text-[#10b481] text-xl"></i>
              <div>
                <p class="label">{{ t("ceo") }}</p>
                <p class="content">ceo@smartsaha.com</p>
              </div>
            </div>

            <div class="flex gap-4">
              <i class="bx bxl-whatsapp text-[#10b481] text-xl"></i>
              <div>
                <p class="label">{{ t("whatsapp") }}</p>
                <p class="content">+261 34 45 99 60</p>
              </div>
            </div>

            <div class="flex gap-4">
              <i class="bxr bx-location-alt-2 text-[#10b481] text-xl"></i>
              <div>
                <p class="label">{{ t("address") }}</p>
                <p class="content">Antananarivo, Madagascar</p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 mb-6 mt-6"></div>

          <div>
            <p class="subtitle mb-6">
              {{ t('followUs') }}
            </p>

            <div class="flex items-center gap-4">
              <a
                href="#"
                target="_blank"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#10b481] hover:bg-[#10b481] hover:text-white transition"
              >
                <i class="bx bxl-linkedin text-xl"></i>
              </a>

              <a
                href="#"
                target="_blank"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#10b481] hover:bg-[#10b481] hover:text-white transition"
              >
                <i class="bx bxl-facebook text-xl"></i>
              </a>

              <a
                href="#"
                target="_blank"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#10b481] hover:bg-[#10b481] hover:text-white transition"
              >
                <i class="bx bxl-twitter text-xl"></i>
              </a>

              <a
                href="#"
                target="_blank"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#10b481] hover:bg-[#10b481] hover:text-white transition"
              >
                <i class="bx bxl-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <transition name="toast">
    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-4 py-3 rounded shadow-xl text-gray-700 text-sm"
      :class="toast.type === 'success' ? 'bg-[#10b481]' : 'bg-red-500'"
    >
      <i
        :class="
          toast.type === 'success'
            ? 'bx bx-check-circle text-xl'
            : 'bx bx-error-circle text-xl'
        "
      ></i>
      <span>{{ toast.message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";
definePageMeta({
  layout: "default",
});

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};
const form = ref({
  name: "",
  company: "",
  email: "",
  mobile: "",
  interests: [] as string[],
  comments: "",
});

const toast = ref({
  show: false,
  message: "",
  type: "success" as "success" | "error",
});

const showToast = (message: string, type: "success" | "error" = "success") => {
  toast.value = { show: true, message, type };

  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const submitForm = async () => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });
    if (!res.ok) {
      showToast("Failed to submit", "error");
    }
    showToast("Message sent successfully!", "success");
    form.value = {
      name: "",
      company: "",
      email: "",
      mobile: "",
      interests: [],
      comments: "",
    };
  } catch (err) {
    console.error(err);
    showToast("Something went wrong. Please try again later.", "error");
  }
};
</script>
