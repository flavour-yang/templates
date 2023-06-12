<template>
  <div class="content">
    <div class="content-item">
      <h1>实现弹窗 与 自定义指令</h1>
      <ul class="gammer">
        <Modal :open="modalOpen" @confirm="modalOpen = false" @cancel="modalOpen = false"> </Modal>
        
        <Modal :open="modalOpen1" @confirm="modalOpen1 = false" @cancel="modalOpen1 = false">
          <template #header> <div>1111</div> </template>
          <template #footer> <button @click="modalOpen1 = false">自定义footer</button></template>
        </Modal>
        <button @click="modalOpen = true" v-permission="'page.button1'">Modal</button>
        <button @click="modalOpen1 = true" v-permission="'page.button2'">Modal1</button>
      </ul>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <!-- <button @click="$router.push('/step8')">自定义指令</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Modal from '@/components/Modal/index.vue'
import { vPermission } from '@/common'

const modalOpen = ref(false)
const modalOpen1 = ref(false)
const data = reactive({})
</script>

<style lang="scss"></style>
