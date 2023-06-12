<template>
  <div class="content" :class="classA">
    <div class="content-item">
      <h1>计算属性与侦听器</h1>
      <ul class="gammer">
        <li>Computed</li>
        <div v-for="(i, index) in goods" :key="i.name" class="goods">
          {{ i.name }} <span style="font-size: 18px">价格: {{ i.price }}</span>
          <button v-if="isAdd.includes(index)" @click="remove(index)">-</button>
          <button v-else @click="add(index)">+</button>
        </div>
        <div>总价:{{ totalPrice }}</div>
        <button></button>
        <li>Watch</li>
        <div>窗口宽度:{{ width }}, 窗口高度: {{ height }}</div>
        <div>新的路由参数:{{ routeParams.newIt }}, 老的路由参数: {{ routeParams.oldIt }}</div>
        <button @click="$router.push({ name: 'step4', query: { time: +new Date() } })">
          route query
        </button>
      </ul>
      <div class="space">
        <button @click="$router.go(-1)">上一个</button>
        <button @click="$router.push('/step5')">生命周期</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useResize } from '@/hooks/useResize'
import { useRoute } from 'vue-router'
const goods = [
  { name: '商品A', price: 3 },
  { name: '商品B', price: 2 }
]

// const height = ref(window.innerWidth)
// const width = ref(window.innerHeight)
const isAdd = ref([])
const routeParams = reactive({})

const classA = ref<string[]>([window.innerWidth + ''])

// const resizeIt = (e) => {
//   // console.log(e)
//   width.value = e?.currentTarget?.innerWidth
//   height.value = e?.currentTarget?.innerHeight
// }

const route = useRoute()
const { height, width } = useResize()

// onMounted(() => {
//   window.addEventListener('resize', resizeIt)
// })
// onUnmounted(() => {
//   window.removeEventListener('resize', resizeIt)
// })

const totalPrice = computed(() => {
  return goods.reduce((total, item, index) => {
    if (isAdd.value.includes(index)) {
      return total + item.price
    }
    return total
  }, 0)
})

watch([width, height], (value) => {
  if (value[0] >= 1920) {
    classA.value = ['w-1920']
  } else if (value[0] > 1200) {
    classA.value = ['w-1200']
  } else {
    classA.value = ['w-small']
  }
})

watch(
  () => route.query,
  (params, old) => {
    routeParams.newIt = params.time
    routeParams.oldIt = old.time
  },
  {
    deep: true
  }
)

const data = reactive({})

const remove = (index) => {
  isAdd.value.splice(index, 1)
}
const add = (index) => {
  isAdd.value.push(index)
}
</script>

<style lang="scss">
.w-1920 {
  // .gammer {
  //   color: #fff;
  // }
}
.w-1200 {
  color: #faad14;
}
.w-small {
  color: #52c41a;
}
.goods {
  margin-bottom: 10px;
}
</style>
