<template>
  <div class="content">
    <div class="content-item">
      <h1>事件处理</h1>
      <ul class="gammer" @click="outerClick">
        <li>@click</li>
        <button @click.stop="handlerClick">click</button>
        <li>@mouseenter</li>
        <li>@mouseleave</li>
        <button @mouseenter="mouseenter" @mouseleave="mouseleave">mouse state:</button>
        {{
          mouseState
        }}
        <li>@blur</li>
        <li>@change</li>
        <form @submit="submit" style="margin-top: 30px">
          <input
            type="text"
            name="input1"
            label="input1"
            :value="inputValue"
            @blur="blur"
            @input="change"
          />
          <button htmlType="submit">submit</button>
        </form>
      </ul>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <button @click="$router.push('/step4')">计算属性与侦听器</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const mouseState = ref('')
const inputValue = ref('')
const handlerClick = () => {
  alert('click')
}
const outerClick = () => {
  console.log('outer-click')
}
const mouseenter = () => {
  mouseState.value = 'mouseenter'
}
const mouseleave = () => {
  mouseState.value = 'mouseleave'
}

const blur = (e: Event) => {
  console.log({ onblur: e?.target?.value })
}
const change = (e: Event) => {
  inputValue.value = e?.target?.value
  console.log({ onchange: e?.target?.value })
}

const submit = (e: Event) => {
  e.preventDefault()
  const formValue: { [k: string]: any } = {}
  for (let v of e.target) {
    if (v.nodeName !== 'BUTTON') {
      formValue[v.name] = v.value
    }
  }
  console.log({ submit: formValue })
}

const data = reactive({})
</script>

<style lang="scss"></style>
