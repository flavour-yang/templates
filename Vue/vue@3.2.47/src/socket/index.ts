import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'
import { Server } from 'socket.io'
export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
}) as any
// import { createServer } from 'http'
// const httpServer = createServer()
// const ioIt = new Server(httpServer, {
//   cors: {
//     origin: 'http://127.0.0.1:5173/'
//   }
// })
// const io = new Server({
//   cors: {
//     origin: 'http://127.0.0.1:5173/'
//   }
// })
// const server = new io('http://127.0.0.1:5173/')
// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://127.0.0.1:5173/'

export const socket: Socket = io(URL)

socket.on('connect', () => {
  // console.log('connect')
  state.connected = true
})

socket.on('disconnect', () => {
  // console.log('disconnect')
  state.connected = false
})

socket.on('foo', (...args) => {
  console.log({ args })
  state.fooEvents.push(args)
})

socket.on('bar', (...args) => {
  console.log('bar')
  state.barEvents.push(args)
})
