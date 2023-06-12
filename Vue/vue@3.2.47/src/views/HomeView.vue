<script setup lang="ts">
import { reactive, computed, onMounted, watch } from 'vue'
import { io } from 'socket.io-client'
// 创建 socket 实例
// const socket = io('ws://localhost:5432')
const socket = io('ws://172.19.0.77:5432')

class Init {
  start = null
  red = []
  blue = []
  random = null
  result = false
  // userFull = false
  // socketId = ''
  // socketIds = []
}

const data: {
  start: null | string
  red: Array<string | number>
  blue: Array<string | number>
  random: null | number
  result: boolean
  // userFull: boolean
  // socketId: string
  // socketIds: string[]
} = reactive(new Init())

const socketData: {
  userFull: boolean
  socketId: string
  socketIds: string[]
} = reactive({ userFull: false, socketId: '', socketIds: [] })

const mapItem: { [key: string]: any } = {
  '1-1': 1,
  '1-2': 2,
  '1-3': 3,
  '2-1': 4,
  '2-2': 5,
  '2-3': 6,
  '3-1': 7,
  '3-2': 8,
  '3-3': 9
}
const winList = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9],
  [3, 5, 7]
]

socket.on('game-result', (e) => {
  if (e === 'dogfall') {
    console.log('平局')
    return
  }
  // console.log({ 获胜方: e })
})

socket.on('user-click', (e) => {
  if (e.user === 'red') {
    data.red.push(e.value)
    data.start = 'blue'
    return
  }
  if (e.user === 'blue') {
    data.blue.push(e.value)
    data.start = 'red'
    return
  }
})

socket.on('joined', (e) => {
  if (!socketData.socketId) {
    socketData.socketId = e.socketId
    return
  }
})

socket.on('joinedAll', (e) => {
  socketData.socketIds = e.sockets
  if (socketData.socketIds.length === 2) {
    socketData.userFull = true
  }
})

socket.on('reset', (e) => {
  resetIt()
})

socket.on('start', (e) => {
  console.log({ start: data.random })
  data.random = e.random
  data.start = e.start
})

socket.on('user-full', (e) => {
  if (e.includes(socketData.socketId)) {
    return
  }
})

const showJoin = computed(() => {
  if (socketData.userFull) return false
  return true
})

const winderBlue = computed(() => {
  let flag = false
  winList.forEach((item) => {
    const filters = item.filter((f) => data.blue.includes(f))
    if (filters.length === 3) {
      flag = true
      data.result = true
      socket.emit('winner', 'blue')
    }
  })
  return flag
})

const winderRed = computed(() => {
  let flag = false
  winList.forEach((item) => {
    const filters = item.filter((f) => data.red.includes(f))
    if (filters.length === 3) {
      flag = true
      data.result = true
      socket.emit('winner', 'red')
    }
  })
  return flag
})

const disabledReset = computed(() => {
  if (!socketData.socketId) return false
  if (dogfall.value) return true
  if (data.result) return true
  return false
})

const dogfall = computed(() => {
  return data.red.length + data.blue.length === 9 && !data.result
})

watch(
  () => ({ blue: data.blue, red: data.red }),
  (value) => {
    console.log({ value, boolean: value.red.length + value.blue.length === 9 && !data.result })
    if (value.red.length + value.blue.length === 9 && !data.result) {
      //
      socket.emit('winner', 'dogfall')
    }
  },
  { deep: true }
)
// watch(dogfall, (value) => {
//   console.log({ value })
//   if (value) {
//     data.result = true
//     socket.emit('winner', 'dogfall')
//   }
// })

const handlerStart = () => {
  socket.emit('join', {})
  startIt()
}

const startIt = () => {
  if (!data.random) {
    data.random = Math.ceil(Math.random() * 10)
  }
  data.start = data.random && data.random % 2 === 0 ? 'blue' : 'red'
  console.log({ random: data.random })
  socket.emit('start', {
    random: data.random,
    start: data.start
  })
}

const handlerClick = (i: number, j: number) => {
  if (data.result) return
  if (!data.start) return
  if (!socketData.socketId) return
  const ij: string = `${i}-${j}`

  if (data.red.includes(mapItem[ij]) || data.blue.includes(mapItem[ij])) {
    return
  }
  if (data.start === 'red') {
    data.red.push(mapItem[ij])
    data.start = 'blue'
    socket.emit('user-click', { user: 'red', value: mapItem[ij] })
    return
  }
  if (data.start === 'blue') {
    data.blue.push(mapItem[ij])
    data.start = 'red'
    socket.emit('user-click', { user: 'blue', value: mapItem[ij] })
    return
  }
}

const reset = () => {
  // if (data.start && !data.result) return
  socket.emit('reset', true)
}

const resetIt = () => {
  Object.assign(data, new Init())
  startIt()
}
</script>

<template>
  <main>
    <div v-for="i in 3" :key="i">
      <span class="item" v-for="j in 3" :key="j" @click="() => handlerClick(i, j)">
        <span
          :class="[
            data.red.includes(mapItem[`${i}-${j}`]) && 'user-active-r',
            data.blue.includes(mapItem[`${i}-${j}`]) && 'user-active-b'
          ]"
          >{{ data.red.includes(mapItem[`${i}-${j}`]) ? '◯' : '' }}
          {{ data.blue.includes(mapItem[`${i}-${j}`]) ? '✕' : '' }}
        </span>
      </span>
    </div>
    <div v-if="showJoin">
      <button
        v-if="!data.start || !socketData.userFull"
        @click="handlerStart"
        :disabled="data.result"
        class="button-start"
      >
        开始
      </button>
    </div>
    <button v-if="disabledReset" @click="reset" class="button-start">重新来一局</button>
    <div>随机结果:{{ data.random }}</div>
    <div>规则: 根据随机结果, 奇数 ◯ 开始,偶数 ✕ 开始</div>
    <div>
      获胜方: {{ winderBlue ? `✕` : '' }}{{ winderRed ? `◯` : '' }}
      {{ dogfall ? '平局' : '' }}
    </div>
    <!-- <TheWelcome /> -->
    <!-- <button @click="$router.push('/step1')">渲染语法</button> -->
  </main>
</template>
<style lang="scss">
.item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #010101;
  width: 50px;
  height: 50px;
  margin: 5px;
  padding: 10px;
  vertical-align: middle;
}
.button-start {
  margin: 20px 5px;
}
.user-active-r {
  display: inline-block;
  // background: red;
  // height: 10px;
  // width: 10px;
  // border-radius: 50%;
}
.user-active-b {
  display: inline-block;
  // background: blue;
  // height: 10px;
  // width: 10px;
  // border-radius: 50%;
}
</style>
