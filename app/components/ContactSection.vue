<template>
  <section id="contact" class="relative bg-[#fafaf9] dark:bg-[#0b1a1f] py-32 px-4 sm:px-6 lg:px-24 overflow-hidden transition-colors duration-300">
    <!-- Decorative background -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[#10b481]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="max-w-3xl mb-20" data-aos="fade-right">
        <h5 class="uppercase text-sm tracking-[0.2em] font-bold text-[#10b481] mb-4">
          Connect with us
        </h5>
        <h2 class="text-4xl sm:text-5xl font-manropeExtra text-[#112830] dark:text-white leading-tight mb-6">
          {{ t("contact") }}
        </h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 font-inter leading-relaxed">
          {{ t("subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-500" data-aos="fade-up">
          <form @submit.prevent="submitForm" class="space-y-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">{{ t("name") }} *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full px-6 py-4 font-inter rounded-2xl border-0 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-[#10b481] transition-all outline-none"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">{{ t("company") }}</label>
                <input
                  v-model="form.company"
                  type="text"
                  placeholder="SmartSaha Inc."
                  class="w-full px-6 py-4 font-inter rounded-2xl border-0 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-[#10b481] transition-all outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">{{ t("email") }} *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  class="w-full px-6 py-4 font-inter rounded-2xl border-0 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-[#10b481] transition-all outline-none"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">{{ t("mobile") }}</label>
                <input
                  v-model="form.mobile"
                  type="tel"
                  placeholder="+261 34 00 000 00"
                  class="w-full px-6 py-4 font-inter rounded-2xl border-0 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-[#10b481] transition-all outline-none"
                />
              </div>
            </div>

            <div class="space-y-4">
              <label class="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">
                {{ t("interest") }}
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label v-for="interest in ['Investing', 'Work with us', 'Test platform', 'Tailored services']" :key="interest" class="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/10 hover:border-[#10b481]/30 hover:bg-[#10b481]/5 transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    v-model="form.interests"
                    :value="interest"
                    class="w-5 h-5 accent-[#10b481] border-gray-300 dark:border-white/20 rounded"
                  />
                  <span class="text-sm text-gray-600 dark:text-gray-400 font-medium group-hover:text-[#112830] dark:group-hover:text-white transition-colors">{{ interest }}</span>
                </label>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">
                {{ t("message") }}
              </label>
              <textarea
                v-model="form.comments"
                rows="5"
                placeholder="How can we help you?"
                class="w-full px-6 py-4 font-inter rounded-2xl border-0 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 focus:ring-2 focus:ring-[#10b481] transition-all outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#10b481] text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-[#0e946f] hover:shadow-xl hover:shadow-[#10b481]/20 transition-all active:scale-95 group"
            >
              {{ t("sendMessage") }}
              <i class="bx bx-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </button>
          </form>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="space-y-8" data-aos="fade-left">
          <div class="bg-[#112830] text-white rounded-[2.5rem] p-10 shadow-xl space-y-10 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-8 opacity-5">
              <i class="bx bx-buildings text-9xl"></i>
            </div>

            <h3 class="text-2xl font-manropeSemi relative z-10">
              {{ t("contactInfo") }}
            </h3>

            <div class="space-y-8 relative z-10">
              <div v-for="info in contactInfos" :key="info.label" class="flex gap-6 group">
                <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/10 text-[#10b481] group-hover:bg-[#10b481] group-hover:text-white transition-all">
                  <i :class="info.icon" class="text-2xl"></i>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{{ info.label }}</p>
                  <p class="text-white font-medium hover:text-[#10b481] transition-colors cursor-pointer">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Success/Error -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-10 right-10 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold"
        :class="toast.type === 'success' ? 'bg-[#10b481]' : 'bg-red-500'"
      >
        <i :class="toast.type === 'success' ? 'bx bx-check-circle text-2xl' : 'bx bx-error-circle text-2xl'"></i>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

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

const contactInfos = computed(() => [
  { icon: 'bx bx-envelope', label: t("general"), value: 'contact@smartsaha.com' },
  { icon: 'bx bx-briefcase', label: t("sales"), value: 'sales@smartsaha.com' },
  { icon: 'bx bx-user', label: t("ceo"), value: 'ceo@smartsaha.com' },
  { icon: 'bx bxl-whatsapp', label: t("whatsapp"), value: '+261 34 45 999 60' },
  { icon: 'bx bx-location-plus', label: t("address"), value: 'Antananarivo, Madagascar' }
]);

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
      return;
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
    showToast("Something went wrong.", "error");
  }
};
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
