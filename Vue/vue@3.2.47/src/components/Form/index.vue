<template>
  <form >
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from 'vue'

defineProps({
  form: {},
  title: String,
  likes: Number
})
defineEmits(['update:form'])

const data = reactive({})
</script>

<style lang="scss"></style>
