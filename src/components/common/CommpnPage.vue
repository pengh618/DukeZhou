<template>
  <Header />
  <div style="overflow-y: auto; max-height: calc(120vh); margin-top: 20px;">
    <slot />
  </div>
  <Footer />
</template>

<script setup lang="ts"></script>
