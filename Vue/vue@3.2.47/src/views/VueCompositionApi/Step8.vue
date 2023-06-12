<template>
  <div class="content">
    <div class="content-item">
      <h1>组件</h1>
      <ul class="gammer">
        <Modal :open="modalOpen" @confirm="modalOpen = false" @cancel="modalOpen = false"> </Modal>
        
        <Modal :open="modalOpen1" @confirm="modalOpen1 = false" @cancel="modalOpen1 = false">
          <template #header>111</template>
          <template #footer> <button @click="modalOpen1 = false">slef</button></template>
        </Modal>
        <button @click="modalOpen = true">Modal</button>
        <button @click="modalOpen1 = true">Modal</button>
      </ul>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <!-- <button @click="$router.push('/step6')">组件</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Modal from '@/components/Modal/index.vue'
const modalOpen = ref(false)
const modalOpen1 = ref(false)
const data = reactive({})
</script>

<style lang="scss"></style>
