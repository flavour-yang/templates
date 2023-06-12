<template>
  <div class="content">
    <div class="content-item">
      <h1>响应式</h1>
      <ul class="gammer">
        <li>Reactive</li>
        <li>
          Ref: <button @click="reactivepush">push</button>
          <button @click="reactivereset">reset</button>
        </li>
        <span v-for="i in number1" :key="i">{{ i }},</span>
        <li>Ref: <button @click="add">add</button></li>
        <div>{{ number }}</div>
      </ul>

      <form @submit.prevent="submit" style="margin-top: 30px">
        <label
          >input2
          <input type="text" name="input2" label="input2" v-model="inputValue1" />
        </label>
        <div>input2:{{ inputValue1 }}</div>
        <button htmlType="submit">submit</button>
        <button @click="handlerSubmit">@click submit</button>
      </form>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <button @click="$router.push('/step3')">事件处理</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { myProxy } from '@/VueApi'

const number1 = reactive([1])
const number = ref(1)
const inputValue = ref('')
const inputValue1 = ref('')
const data = reactive({})
onMounted(() => {
  myProxy()
})
const add = () => {
  number.value += 1
}
const reactivepush = () => {
  const random = Math.ceil(Math.random() * 10)
  number1.push(random)
}
const reactivereset = () => {
  number1.length = 0
}

const submit = (e: Event) => {
  // e.preventDefault()
  const formValue: { [k: string]: any } = {}
  for (let v of e.target) {
    if (v.nodeName !== 'BUTTON') {
      formValue[v.name] = v.value
    }
  }
  console.log({ submit: formValue })
}
const handlerSubmit = (e) => {
  e.preventDefault()
  const formValue = { input1: inputValue, input2: inputValue1 }
  console.log({ handlerSubmit: formValue, input1: formValue.input1.value })
}
</script>

<style lang="scss">
.content {
  text-align: center;
}
.gammer {
  text-align: left;
  margin: 0 auto;
}
</style>
