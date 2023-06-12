<script setup lang="ts">
import { ref, defineProps } from 'vue'
defineProps({
  open: Boolean
})
const $emit = defineEmits(['cancel', 'confirm'])

const cancel = () => {
  $emit('cancel', false)
}

const confirm = () => {
  $emit('confirm', false)
}

// const open = ref(false)
</script>

<template>
  <!-- <button @click="open = true">Open Modal</button> -->
  <Transition name="fade">
    <div v-if="open" class="modal-outer">
      <div class="modal">
        <slot name="header"> <p>Hello from the modal!</p></slot>

        <slot name="footer">
          <button @click="cancel">cancel</button>
          <button @click="confirm">confirm</button>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-outer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 998;
  transition: all 0.3s ease;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 45%;
  left: 50%;
  width: 300px;
  transform: translate(-50%, -45%);
  background-color: #f1f1f1;
  button {
    margin: 0 5px;
  }
  padding: 12px;
  transition: all 0.3s ease;
}
.fade-enter-active,
.fade-leave-active {
  // transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
