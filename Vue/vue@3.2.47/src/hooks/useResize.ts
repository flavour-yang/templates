import { onMounted, onUnmounted, ref } from 'vue'

export const useResize = () => {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = (e: Event) => {
    if (e) {
      width.value = e?.currentTarget?.innerWidth
      height.value = e?.currentTarget?.innerHeight
    }
  }
  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}
