import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", {
  state: () => ({
    lang: "en" as string,
  }),
  actions: {
    setLang(newLang: string) {
      this.lang = newLang;
    },
  },
});
