<template>
  <Header />
  <div style="overflow-y: auto; max-height: calc(120vh);">
    <slot />
  </div>
  <Footer />
</template>

<script setup lang="ts"></script>
