export function useScrollToInput() {
  const scrollToInput = (inputRef: HTMLElement | null): void => {
    if (inputRef) {
      inputRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return {
    scrollToInput,
  };
}
