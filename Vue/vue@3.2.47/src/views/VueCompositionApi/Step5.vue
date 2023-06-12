<template>
  <div class="content">
    <div class="content-item">
      <h1>生命周期</h1>
      <ul class="gammer">
        <div class="about">
          <button @click="updated">updated {{ data.button }}</button>
          <AboutChild v-if="data.button > 2" />
        </div>
      </ul>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <button @click="$router.push('/step6')">组件</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AboutChild from '../AboutChild.vue'
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onErrorCaptured,
  watchEffect,
  watch,
  reactive
} from 'vue'

const data = reactive({
  button: 1
})
const modalOpen = ref(false)
const classA = ref([])

const resizeIt = () => {
  console.log('resize')
}

onBeforeMount(() => {
  console.log('onBeforeMount')
  console.log(document.querySelector('.about'))
})

onMounted(() => {
  console.log('onMounted')
  console.log(document.querySelector('.about'))
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})

onUpdated(async () => {
  console.log('onUpdated')
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
</script>

<style lang="scss">
.content {
  text-align: center;
}
.gammer {
  text-align: left;
  width: 200px;
  margin: 0 auto;
}
</style>
