<template>
  <footer class="bg-[#112830] text-gray-200 py-16 px-6 sm:px-12 lg:px-24">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="gap-6">
        <NuxtLink to="/" class="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="Logo"
              class="w-12 h-12 object-contain flex-shrink-0 rounded-xl"
            />

            <div class="leading-tight">
              <h1 class="text-xl light-logo font-bold text-gray-700">SmartSaha</h1>
              <p class="light-sous-logo tracking-wide">
                {{ t("tagline") }}
              </p>
            </div>
          </NuxtLink>
        <p class="small text-gray-400 text-sm mt-6">
          {{ t("footerText") }}
        </p>

        <div class="flex items-center gap-4 mt-4">
          <a href="#" class="text-white light-menu-item hover:text-[#10b481] transition">
            <i class="bx bxl-facebook text-2xl"></i>
          </a>
          <a href="#" class="text-white light-menu-item hover:text-[#10b481] transition">
            <i class="bx bxl-linkedin text-2xl"></i>
          </a>
        </div>
      </div>

      <div>
        <h4 class="light-subtitle mb-4 border-b border-gray-700 pb-2">{{ t("company") }}</h4>
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/about" class="light-menu-item hover:text-[#10b481] transition">{{
              t("aboutUs")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/services" class="light-menu-item hover:text-[#10b481] transition">{{
              t("services")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/team" class="light-menu-item hover:text-[#10b481] transition">{{
              t("team")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="light-menu-item hover:text-[#10b481] transition">{{
              t("contact")
            }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="light-subtitle mb-4 border-b border-gray-700 pb-2">{{ t("resources") }}</h4>
        <ul class="space-y-2">
          <li>
            <a
              href="https://app.smart-saha.com"
              target="_blank"
              rel="noopener noreferrer"
              class="light-menu-item hover:text-[#10b481] transition"
            >
              {{ t("precisonAgriculture") }}
            </a>
          </li>
          <li>
            <a
              href="https://sales.smart-saha.com"
              target="_blank"
              rel="noopener noreferrer"
              class="light-menu-item hover:text-[#10b481] transition"
            >
              {{ t("marketplace") }}
            </a>
          </li>
          <li>
            <a
              href="/conditions/privacy-policy-09jg8366r2jn883"
              class="light-menu-item hover:text-[#10b481] transition"
              target="_blank"
              rel="noopener noreferrer"
              >{{ t("policy") }}</a
            >
          </li>
          <li>
            <a
              href="/conditions/terms-of-use-38kd92j2k3l"
              class="light-menu-item hover:text-[#10b481] transition"
              target="_blank"
              rel="noopener noreferrer"
              >{{ t("terms") }}</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="light-subtitle mb-4 border-b border-gray-700 pb-2">{{ t("subscribe") }}</h4>
        <p class="text-gray-400 small text-sm mb-4">
          {{ t("subscribeText") }}
        </p>
        <form
          @submit.prevent="subscribe"
          class="flex flex-col sm:flex-row max-w-md mx-auto"
        >
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-2 small text-sm rounded-l-md border border-gray-700 bg-[#fff]/5 text-white placeholder-gray-400 outline-none transition"
            required
          />

          <button
            type="submit"
            class="flex items-center px-4 py-2 rounded-r-md bg-[#10b481] text-white font-semibold hover:bg-[#0e946f] transition transform shadow-md"
          >
            <i class="bxr bx-paper-plane text-xl"></i>
          </button>
        </form>
      </div>
    </div>

    <div
      class="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 small text-sm"
    >
      &copy; {{ new Date().getFullYear() }} {{ t("copyright") }}
    </div>
  </footer>

  <transition name="toast">
    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded shadow-xl text-white text-sm"
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
import emailjs from "@emailjs/browser";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

import { useFetch } from "#app";

const email = ref("");

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

const subscribe = async () => {
  try {
    const { error } = await useFetch("/api/subscribe", {
      method: "POST",
      body: { email: email.value },
    });

    if (!error.value) {
      showToast("Subscription successful. Thank you!", "success");
      email.value = "";
    } else {
      showToast("Subscription failed. Please try again.", "error");
    }
  } catch (err) {
    console.error(err);
    showToast("Something went wrong. Please try again later.", "error");
  }
};
</script>

<style scoped>
footer a {
  letter-spacing: 0.5px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
