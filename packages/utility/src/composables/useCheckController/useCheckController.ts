import { ref, toValue, computed } from 'vue';
import type { Ref, MaybeRef } from 'vue';

export interface UseCheckControllerOptions<
  T extends string | number | boolean
> {
  initialValue: MaybeRef<T>;
  beforeChange?: () => boolean | Promise<boolean>;
}

function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    typeof value === 'object' &&
    'then' in value &&
    typeof value.then === 'function'
  );
}

export function useCheckController<T extends string | number | boolean>(
  options: UseCheckControllerOptions<T>
) {
  const { initialValue, beforeChange = () => true } = options;
  // checked
  const _checked = ref<T>(toValue(initialValue)) as Ref<T>;
  const _computedChecked = computed({
    get: () => _checked.value,
    set: (value: T) => {
      const _flag = beforeChange();
      if (isPromise(_flag)) {
        _flag.then((res) => {
          if (res) {
            _checked.value = value;
          }
        });
      } else {
        _checked.value = value;
      }
    }
  });

  // 更新 checked
  async function onUpdate(value: T) {
    const _flag = await beforeChange();
    if (_flag) {
      _checked.value = value;
    }
  }

  // 更新 checked 後執行某 function
  function handleUpdate(fn: (arg: T) => void | Promise<void>) {
    return async (value: T) => {
      const _flag = await beforeChange();
      if (_flag) {
        _checked.value = value;
        await fn(value);
      }
    };
  }

  return {
    checked: _computedChecked,
    onUpdateChecked: onUpdate,
    handleUpdateChecked: handleUpdate
  };
}
