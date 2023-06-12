<template>
  <div>
    AboutChild

    <button @click="handler">child button</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

const data = reactive({})
onMounted(() => {
  console.log('AboutChild onMounted')
})
const handler = () => {
  const a = data.a.b + 1
  console.log(a)
}
</script>

<style lang="scss"></style>
