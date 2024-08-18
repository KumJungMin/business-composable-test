<template>
  <div v-if="props.isVisible" class="popup">
    <div class="popup-content">
      <p>{{ props.message }}</p>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  isVisible: boolean;
  message: string;
}>();

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
