export function useInputValidate() {
  const onEnglishInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const regex = /^[a-zA-Z]*$/;
    if (!regex.test(target.value)) {
      target.value = target.value.replace(/[^a-zA-Z]/g, '');
    }
  };

  return {
    onEnglishInput,
  };
}
