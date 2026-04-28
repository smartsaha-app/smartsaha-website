<template>
    <div class="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
  
      <main class="flex-1 pt-20 sm:pt-0">
        <slot />
      </main>
  
      <Footer v-if="route.path !== '/market/post'" />
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import Header from "~/components/Header.vue";
  import Footer from "~/components/Footer.vue";
  
  const route = useRoute();
  </script>
  
  <style scoped>
  main {
    font-family: "Inter", sans-serif;
  }
  
  html,
  body {
    overflow-x: hidden;
  }
  </style>
  