<script setup lang="ts">
import { useResize } from '@/hooks/useResize'
import AboutChild from './AboutChild.vue'
import Modal from '@/components/Modal/index.vue'

import {
  ref,
  reactive,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onErrorCaptured,
  watchEffect,
  watch
} from 'vue'
import { myProxy } from '@/VueApi'

const data = reactive({
  button: 1
})
const modalOpen = ref(false)
const classA = ref([])
// const resizeIt = () => {
//   console.log('resize')
// }
const { height, width } = useResize()

watch([width, height], (value) => {
  if (value[0] >= 1920) {
    classA.value = ['w-1920']
  } else if (value[0] > 1200) {
    classA.value = ['w-1200']
  } else {
    classA.value = ['w-small']
  }
})
onBeforeMount(() => {
  console.log('onBeforeMount')
  console.log(document.querySelector('.about'))
})

onMounted(() => {
  console.log('onMounted')
  console.log(document.querySelector('.about'))
  myProxy()
  // window.addEventListener('resize', resizeIt)
})
onBeforeUpdate(() => {
  // console.log('onBeforeUpdate')
})
onUpdated(async () => {
  // const res = await promise()
  // .then((res) => {
  //   console.log('promise')
  // })
  // console.log({ res })
  // console.log('onUpdated')
})
onUnmounted(() => {
  console.log('onUnmounted')
  // window.removeEventListener('resize', resizeIt)
})

onErrorCaptured((err, instance, info) => {
  console.log({ onErrorCaptured: { err, instance, info } })
})
const updated = () => {
  data.button += 1
}
const promise = async () => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}
</script>
<template>
  <div class="about" :class="classA">
    <button @click="updated">updated {{ data.button }}</button>
    <AboutChild v-if="data.button > 2" />
    <!-- <div>模板语法与常用指令</div>
    <li>v-for , v-if , v-else, v-html, v-once ...</li>
    <li>@click, @blue, @mouseenter @mouseleave @change ...</li>
    <div>生命周期</div>
    <div>响应式基础 --ref, reactive</div>
    <div>计算属性 --computed, 侦听器--watch</div>

    <div>响应式基础</div> -->
    <div>窗口宽度:{{ width }}, 窗口高度: {{ height }}</div>
    <Modal :open="modalOpen" @confirm="modalOpen = false" @cancel="modalOpen = false" />
    <button @click="modalOpen = true">Modal</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
