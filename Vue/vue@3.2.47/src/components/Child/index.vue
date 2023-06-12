<script setup lang="ts">
defineProps(['title'])
defineEmits(['change-title'])

</script>
<template>
  <div>
    <h4>{{ title }}</h4>
    <button @click="$emit('change-title')">子组件按钮</button>
  </div>
</template>
