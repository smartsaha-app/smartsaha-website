<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "SmartSaha",
titleTemplate: "%s | SmartSaha",
htmlAttrs: { lang: "en" },

meta: [
  {
    name: "description",
    content: "SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses."
  },
  {
    name: "keywords",
    content: "SmartSaha, agriculture, agritech, digital agriculture, smart farming, data agriculture, farmers, cooperatives, Madagascar agriculture, innovation"
  },
  { name: "robots", content: "index, follow" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },


    { property: "og:title", content: "SmartSaha" },
    { property: "og:description", content: "SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.smart-saha.com" },
    { property: "og:image", content: "/og-image.png" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "SmartSaha" },
    { name: "twitter:description", content: "SmartSaha is a digital platform transforming agriculture through smart technology, data-driven insights, and innovative tools designed to empower farmers, cooperatives, and agribusinesses." },
    { name: "twitter:image", content: "/og-image.png" },

    { name: "author", content: "SmartSaha Team" },
    { name: "publisher", content: "SmartSaha" }
  ],
  link: [
    { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" },
    { rel: "stylesheet", href: "https://cdn.boxicons.com/fonts/basic/boxicons.min.css" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;700;800&display=swap" },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" }
  ],
  script: [
    { type: "module", src: "https://cdn.jsdelivr.net/npm/emoji-picker-element@1/index.js" }
  ]
});
</script>
