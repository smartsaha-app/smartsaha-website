<template>
  <div>
    <!-- Bouton flottant (en bas à gauche, les toasts existants sont en bas à droite) -->
    <button
      type="button"
      @click="open"
      :aria-label="t('complaintButton')"
      class="group fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-[#112830] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#10b481] dark:border dark:border-white/10"
    >
      <i class="bx bx-error-circle text-xl"></i>
      <span class="hidden sm:inline">{{ t("complaintButton") }}</span>
    </button>

    <!-- Modale -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
        @click.self="close"
        @keydown.esc="close"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="complaint-title"
          class="w-full max-w-lg rounded-3xl border border-gray-200/80 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#112830] sm:p-8"
        >
          <!-- Succès -->
          <div v-if="status === 'success'" class="py-6 text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#10b481]/15 text-[#10b481]">
              <i class="bx bx-check text-4xl"></i>
            </div>
            <p class="font-inter text-base text-[#112830] dark:text-white">{{ t("complaintSuccess") }}</p>
            <button
              type="button"
              @click="close"
              class="mt-6 rounded-xl bg-[#10b481] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0e9a6e]"
            >
              OK
            </button>
          </div>

          <!-- Formulaire -->
          <form v-else @submit.prevent="submit" class="space-y-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 id="complaint-title" class="font-manropeExtra text-xl text-[#112830] dark:text-white">
                  {{ t("complaintModalTitle") }}
                </h2>
                <p class="mt-1 font-inter text-sm text-gray-500 dark:text-gray-400">
                  {{ t("complaintModalSubtitle") }}
                </p>
              </div>
              <button
                type="button"
                @click="close"
                :aria-label="t('complaintCancel')"
                class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <i class="bx bx-x text-2xl"></i>
              </button>
            </div>

            <div class="space-y-2">
              <label for="complaint-field-title" class="ml-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {{ t("complaintFieldTitle") }} <span class="text-[#10b481]">*</span>
              </label>
              <input
                id="complaint-field-title"
                ref="titleInput"
                v-model="form.title"
                type="text"
                required
                maxlength="200"
                :placeholder="t('complaintFieldTitlePlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-inter text-sm text-[#112830] outline-none transition-all focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div class="space-y-2">
              <label for="complaint-field-description" class="ml-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {{ t("complaintFieldDescription") }}
              </label>
              <textarea
                id="complaint-field-description"
                v-model="form.description"
                rows="4"
                maxlength="5000"
                :placeholder="t('complaintFieldDescriptionPlaceholder')"
                class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 font-inter text-sm text-[#112830] outline-none transition-all focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label for="complaint-field-page" class="ml-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {{ t("complaintFieldPage") }}
              </label>
              <input
                id="complaint-field-page"
                v-model="form.page"
                type="text"
                maxlength="255"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-inter text-sm text-[#112830] outline-none transition-all focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <p v-if="status === 'error'" class="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
              <i class="bx bx-error-circle text-lg"></i>
              {{ errorMessage || t("complaintError") }}
            </p>

            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                @click="close"
                class="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
              >
                {{ t("complaintCancel") }}
              </button>
              <button
                type="submit"
                :disabled="status === 'sending' || !form.title.trim()"
                class="flex items-center justify-center gap-2 rounded-xl bg-[#10b481] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#10b481]/25 transition hover:bg-[#0e9a6e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i v-if="status === 'sending'" class="bx bx-loader-alt animate-spin text-lg"></i>
                <i v-else class="bx bx-paper-plane text-lg"></i>
                {{ status === "sending" ? t("complaintSending") : t("complaintSubmit") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";

const { t } = useI18n();
const route = useRoute();
const config = useRuntimeConfig();

type Status = "idle" | "sending" | "success" | "error";

const isOpen = ref(false);
const status = ref<Status>("idle");
const errorMessage = ref("");
const titleInput = ref<HTMLInputElement | null>(null);

const form = reactive({
  title: "",
  description: "",
  page: "",
});

const open = async () => {
  // Pré-remplit la page sur laquelle se trouve le visiteur
  form.page = route.path;
  status.value = "idle";
  errorMessage.value = "";
  isOpen.value = true;
  await nextTick();
  titleInput.value?.focus();
};

const close = () => {
  if (status.value === "sending") return;
  isOpen.value = false;
  if (status.value === "success") {
    form.title = "";
    form.description = "";
  }
  status.value = "idle";
};

const submit = async () => {
  if (!form.title.trim()) return;

  status.value = "sending";
  errorMessage.value = "";

  try {
    // Envoi vers l'API du backend admin (route publique POST /complaints)
    await $fetch(`${config.public.apiBase}/complaints`, {
      method: "POST",
      body: {
        title: form.title.trim(),
        description: form.description.trim() || null,
        page: form.page.trim() || null,
      },
    });
    status.value = "success";
  } catch (err: any) {
    console.error("Erreur lors de l'envoi de la plainte :", err);
    // Message du backend s'il y en a un (ex : validation), sinon message traduit
    errorMessage.value = err?.status === 400 ? err?.data?.message || "" : "";
    status.value = "error";
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
