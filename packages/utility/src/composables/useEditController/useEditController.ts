import { ref, toValue, onScopeDispose, effectScope } from 'vue';
import type { Ref } from 'vue';

interface UseEditControllerOptions {
  initialValue: Ref<string>;
}

export function useEditController(options: UseEditControllerOptions) {
  const _value = ref(options.initialValue);
  const _isEdit = ref(false);

  function onEdit() {
    _isEdit.value = true;
  }

  function onSave(fn: (arg: string) => void | Promise<void>) {
    return async () => {
      await fn(_value.value);
    };
  }

  function onCancel() {
    _isEdit.value = false;
    _value.value = toValue(options.initialValue);
  }

  return {
    value: _value,
    isEdit: _isEdit,
    handleEdit: onEdit,
    handleSave: onSave,
    handleCancel: onCancel
  };
}

export type UseEditControllerReturn = ReturnType<typeof useEditController>;
