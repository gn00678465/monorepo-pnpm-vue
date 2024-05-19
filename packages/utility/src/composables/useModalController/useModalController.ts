import { ref, effectScope, watch, onScopeDispose } from 'vue';
import type { Ref } from 'vue';

export interface UseModalControllerOptions<T> {
  delay?: number;
}

export interface UseModalControllerReturn<T> {
  show: Ref<boolean>;
  onModalOpen: (values?: T | null) => void;
  onModalClose: (delayTime?: number) => void;
  data: Ref<T | null>;
}

export function useModalController<T extends object>({
  delay = 0
}: UseModalControllerOptions<T> = {}): UseModalControllerReturn<T> {
  const scope = effectScope();

  const visible = ref(false);
  const _delay = ref(delay);
  const data = ref<T | null>(null) as Ref<T | null>;

  function onModalOpen(values: T | null = null) {
    data.value = values;
    visible.value = true;
  }
  function onModalClose(delayTime?: number) {
    _delay.value = handleDelay(delay, delayTime);
    visible.value = false;
  }

  function handleDelay(delay: number, delayTime?: number) {
    return delay === 0 && delayTime === 0
      ? 0
      : delay !== 0 && delayTime === 0
        ? delay
        : delayTime
          ? delayTime
          : delay;
  }

  scope.run(() => {
    watch(visible, (visible) => {
      if (!visible) {
        window.setTimeout(() => {
          data.value = null;
        }, _delay.value);
      }
    });
  });

  onScopeDispose(() => {
    scope.stop();
    onModalClose();
  });

  return {
    show: visible,
    onModalOpen,
    onModalClose,
    data
  };
}

export type UseNModalReturnType = ReturnType<typeof useModalController>;
