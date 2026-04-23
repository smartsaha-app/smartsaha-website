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
definePageMeta({
  layout: "default",
});
</script>

<style scoped></style>
