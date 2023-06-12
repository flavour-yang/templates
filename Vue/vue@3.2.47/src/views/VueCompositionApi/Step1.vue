<template>
  <div class="content" ref="content">
    <div class="content-item">
      <h1>渲染语法</h1>
      <ul class="gammer">
        <li>
          v-for:
          <button @click="handlerRandom">列表渲染</button>
        </li>
        <span v-for="i in random" :key="i">{{ i }},</span>
        <li>v-if, v-else</li>
        <button @click="awesome = !awesome">Toggle</button>
        <h1 v-if="awesome">v-if: 嘿嘿! 😀</h1>
        <h1 v-else>v-else: 我是else 😎</h1>

        <li>v-show:</li>
        <button @click="awesomeShow = !awesomeShow">{{ awesomeShow ? 'hidden' : 'show' }}</button>
        <h1 v-show="awesomeShow">v-show: show</h1>
        <h1 v-show="!awesomeShow">v-show: hidden</h1>
        <li v-html="htmlIt" />
        <li>v-model</li>
      </ul>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <button @click="$router.push('/step2')">响应式</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
const awesome = ref(false)
const awesomeShow = ref(false)
const content = ref()
const random = ref(Math.ceil(Math.random() * 10))
const data = reactive({})
const htmlIt = '<div>html dom</div>'
const handlerRandom = () => (random.value = Math.ceil(Math.random() * 10))

onMounted(()=>{

  console.log({ content: content.value,  vNode: content.value.__vnode})
})
</script>

<style lang="scss">
.content {
  text-align: center;
  display: flex;
  place-items: center;
  h1 {
    margin-bottom: 50px;
  }
  .content-item {
    width: 500px;
  }
}
.gammer {
  text-align: left;
  // width: 200px;
  margin: 0 auto;
}
.space {
  margin-top: 50px;
  button {
    margin: 0 10px;
  }
}
</style>
