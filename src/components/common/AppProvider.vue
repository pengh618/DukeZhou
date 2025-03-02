<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()


</script>

<template>
  <n-config-provider wh-full :theme="appStore.naiveTheme">
    <n-message-provider>
      <slot />
    </n-message-provider>
  </n-config-provider>
</template>
