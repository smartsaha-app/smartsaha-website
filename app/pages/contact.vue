<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fafaf9]">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#10b481] mb-4"></div>
      <p class="text-gray-600 font-medium">Redirecting to contact section...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  navigateTo('/#contact');
});

definePageMeta({
  layout: false
});
</script>
