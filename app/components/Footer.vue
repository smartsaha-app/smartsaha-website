<template>
  <footer class="bg-[#112830] text-white pt-16 sm:pt-20 pb-10 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
        
        <!-- Bloc Brand / Présentation -->
        <div class="flex flex-col gap-4">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group w-max" aria-label="SmartSaha - Accueil">
            <img
              src="/logo.png"
              alt="Logo SmartSaha"
              width="64"
              height="64"
              loading="lazy"
              class="rounded-full object-cover border-2 border-[#10b481] size-12 dark:size-14 flex-shrink-0"
            />
            <div class="leading-snug">
              <span class="text-2xl font-bold text-white block">SmartSaha</span>
              <p class="text-xs text-gray-400 font-medium">
                {{ t("tagline") }}
              </p>
            </div>
          </NuxtLink>

          <p class="text-gray-400 text-sm leading-relaxed mt-1">
            {{ t("footerText") }}
          </p>

          <!-- Réseaux Sociaux -->
          <div class="flex items-center gap-3 mt-2" aria-label="Réseaux sociaux">
            <a
              href="https://www.facebook.com/share/1EHaGKpfnD/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez SmartSaha sur Facebook"
              title="Facebook"
              class="size-10 rounded-full bg-white/5 hover:bg-[#10b481] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10b481]"
            >
              <i class="bx bxl-facebook text-xl" aria-hidden="true"></i>
            </a>
            <a
              href="https://share.google/xF5gkcyYn6EsR5cPA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez SmartSaha sur LinkedIn"
              title="LinkedIn"
              class="size-10 rounded-full bg-white/5 hover:bg-[#10b481] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10b481]"
            >
              <i class="bx bxl-linkedin text-xl" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Liens Entreprise -->
        <nav aria-label="Navigation Entreprise">
          <h2 class="text-base font-semibold text-white mb-4 border-b border-gray-700/60 pb-2">
            {{ t("company") }}
          </h2>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink :to="localePath('/')" class="text-gray-400 hover:text-[#10b481] transition-colors duration-200">
                {{ t("aboutUs") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/services')" class="text-gray-400 hover:text-[#10b481] transition-colors duration-200">
                {{ t("services") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/blogs')" class="text-gray-400 hover:text-[#10b481] transition-colors duration-200">
                {{ t("blogs") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/portfolio')" class="text-gray-400 hover:text-[#10b481] transition-colors duration-200">
                {{ t("portfolio") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/contact')" class="text-gray-400 hover:text-[#10b481] transition-colors duration-200">
                {{ t("contact") }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Liens Ressources -->
        <nav aria-label="Navigation Ressources">
          <h2 class="text-base font-semibold text-white mb-4 border-b border-gray-700/60 pb-2">
            {{ t("resources") }}
          </h2>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a
                href="https://agriculture.smart-saha.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-[#10b481] transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                {{ t("precisonAgriculture") }}
                <i class="bx bx-top-right-arrow text-xs text-gray-500" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://sales.smart-saha.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-[#10b481] transition-colors duration-200 inline-flex items-center gap-1.5"
              >
                {{ t("marketplace") }}
                <i class="bx bx-top-right-arrow text-xs text-gray-500" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/conditions/privacy-policy')"
                class="text-gray-400 hover:text-[#10b481] transition-colors duration-200"
              >
                {{ t("policy") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/conditions/terms-of-use')"
                class="text-gray-400 hover:text-[#10b481] transition-colors duration-200"
              >
                {{ t("terms") }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Inscription Newsletter -->
        <div>
          <h2 class="text-base font-semibold text-white mb-4 border-b border-gray-700/60 pb-2">
            {{ t("subscribe") }}
          </h2>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">
            {{ t("subscribeText") }}
          </p>
          <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-2 max-w-md">
            <div class="relative flex-1">
              <label for="footer-email" class="sr-only">Votre adresse e-mail</label>
              <input
                id="footer-email"
                v-model.trim="email"
                type="email"
                placeholder="votre@email.com"
                class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-700 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b481] focus:ring-1 focus:ring-[#10b481] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              aria-label="S'abonner à la newsletter"
              class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#10b481] text-white font-semibold hover:bg-[#0e946f] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer"
            >
              <i v-if="!isLoading" class="bx bx-paper-plane text-xl" aria-hidden="true"></i>
              <i v-else class="bx bx-loader-alt animate-spin text-xl" aria-hidden="true"></i>
            </button>
          </form>
        </div>

      </div>

      <!-- Section Copyright -->
      <div class="mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>&copy; {{ currentYear }} {{ t("copyright") }}</p>
        <p class="text-gray-400">SmartSaha — AgTech & Traçabilité Agricole</p>
      </div>
    </div>

    <!-- Notification Toast -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        role="alert"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-sm font-medium backdrop-blur-md"
        :class="toast.type === 'success' ? 'bg-[#10b481]' : 'bg-red-500'"
      >
        <i
          :class="
            toast.type === 'success'
              ? 'bx bx-check-circle text-2xl'
              : 'bx bx-error-circle text-2xl'
          "
          aria-hidden="true"
        ></i>
        <span>{{ toast.message }}</span>
      </div>
    </Transition>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const localePath = useLocalePath();

const currentYear = computed(() => new Date().getFullYear());

const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang]?.[key] || key;
};

const email = ref("");
const isLoading = ref(false);

const toast = ref({
  show: false,
  message: "",
  type: "success" as "success" | "error",
});

const showToast = (message: string, type: "success" | "error" = "success") => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3500);
};

const subscribe = async () => {
  if (!email.value || isLoading.value) return;

  isLoading.value = true;
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
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
footer a {
  letter-spacing: 0.2px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(1rem) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(1rem) scale(0.95);
}
</style>