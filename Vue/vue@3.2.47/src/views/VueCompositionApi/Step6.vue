<template>
  <div class="content">
    <div class="content-item">
      <h1>组件</h1>
      <div style="padding: 20px">
        <Child :title="title" @change-title="title = '子组件改变标题'"></Child>
      </div>
      <div style="height: 1px; background-color: #000; margin-top: 30px"></div>
      <div style="margin-top: 20px">
        <button @click="title = '组件的标题A'">父组件设置 title 为: 组件的标题A</button>
      </div>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <button @click="$router.push('/step7')">实现一个弹窗 与 自定义指令</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Child from '@/components/Child/index.vue'
const title = ref('我是子组件的标题')
const modalOpen1 = ref(false)
const data = reactive({})
</script>

<style lang="scss"></style>
