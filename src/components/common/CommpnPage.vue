<template>
  <Header />
  <div style="overflow-y: auto; max-height: calc(100vh); margin-top: 5px;">
    <slot />
  </div>
  <Footer />
</template>

<script setup lang="ts"></script>
