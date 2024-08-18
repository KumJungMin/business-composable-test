import { ref } from 'vue';

export function usePopup() {
  const isVisible = ref(false);
  const message = ref('');

  const show = (msg: string) => {
    message.value = msg;
    isVisible.value = true;
  };

  const close = () => {
    isVisible.value = false;
  };

  return {
    isVisible,
    message,
    show,
    close,
  };
}
