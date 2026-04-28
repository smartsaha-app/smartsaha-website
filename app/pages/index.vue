<template>
  <Hero />
  <section id="about">
    <About />
  </section>
  <section id="services">
    <Service />
  </section>
  <Precision />
  <Mrv />
  <Demo />
  <section id="team">
    <Team />
  </section>
  <Cta />
  <ContactSection />
</template>

<script setup lang="ts">
import Hero from "~/components/Hero.vue";
import About from "~/components/About.vue";
import Service from "~/components/Service.vue";
import Precision from "~/components/Precision.vue";
import Mrv from "~/components/Mrv.vue";
import Demo from "~/components/Demo.vue";
import Team from "~/components/Team.vue";
import Cta from "~/components/Cta.vue";
import ContactSection from "~/components/ContactSection.vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "SmartSaha - Digital Agriculture & Smart Farming Platform",
  ogTitle: "SmartSaha - Transforming Agriculture with AI & Data",
  description: "SmartSaha empowers farmers with AI, predictive weather, and geospatial insights for sustainable agriculture.",
  ogDescription: "Join the digital revolution in agriculture. SmartSaha provides smart tools for farmers, agribusinesses, and cooperatives.",
});
</script>


<style scoped></style>
