import { unref, ref } from 'vue';
import { describe, test, expect, vi } from 'vitest';
import { useEditController } from './useEditController';

describe('useEditController', () => {
  test('should be defined', () => {
    expect(useEditController).toBeDefined();
  });

  test('initialValue is ref, and should return initialValue', () => {
    const { value } = useEditController({ initialValue: ref('ref') });

    expect(unref(value)).toBe('ref');
  });

  test('initialValue is primitive values, should return defaultValue', () => {
    const { value } = useEditController({ initialValue: 'primitive' });

    expect(unref(value)).toBe('primitive');
  });

  test('handleEdit', () => {
    const { value, isEdit, handleEdit } = useEditController({
      initialValue: 'primitive'
    });

    expect(unref(isEdit)).toBe(false);

    handleEdit();

    expect(unref(isEdit)).toBe(true);
  });

  test('handleCancel', () => {
    const { value, handleCancel } = useEditController({
      initialValue: 'initialValue'
    });

    value.value = 'changedValue';

    expect(unref(value)).toBe('changedValue');

    handleCancel();

    expect(unref(value)).toBe('initialValue');
  });

  test('handleSave', async () => {
    const { value, handleSave } = useEditController({
      initialValue: 'initialValue'
    });
    const invoke = vi.fn((value) => {
      expect(value).toBe('changedValue');
    });
    const onSave = handleSave(invoke);

    expect(onSave).toBeTypeOf('function');

    value.value = 'changedValue';

    await onSave();

    expect(invoke).toHaveBeenCalled();
  });
});
