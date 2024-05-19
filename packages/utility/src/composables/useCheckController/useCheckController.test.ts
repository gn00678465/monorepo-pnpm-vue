import { unref, ref } from 'vue';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useCheckController } from './useCheckController';

describe('useCheckController', () => {
  const beforeChangeTrue = vi.fn().mockResolvedValue(true);

  beforeEach(() => {
    vi.useFakeTimers();
  });

  test('should be exist', () => {
    expect(useCheckController).toBeDefined();
  });

  test('initialValue is ref, and should return initialValue', () => {
    const { checked } = useCheckController({ initialValue: ref(false) });

    expect(unref(checked)).toBe(false);
  });

  test('initialValue is primitive values, should return defaultValue', () => {
    const { checked } = useCheckController({ initialValue: 1 });

    expect(unref(checked)).toBe(1);
  });

  test('onUpdateChecked', async () => {
    const { checked, onUpdateChecked } = useCheckController<number>({
      initialValue: ref(0)
    });

    await onUpdateChecked(1);

    expect(checked.value).toBe(1);
  });

  test('handleUpdateChecked should return a function', async () => {
    const { handleUpdateChecked } = useCheckController<number>({
      initialValue: ref(0)
    });

    const onUpdate = handleUpdateChecked(() => {});

    expect(onUpdate).toBeTypeOf('function');
  });

  test('handleUpdateChecked should update value', async () => {
    const invoke = vi.fn((value) => {
      expect(value).toBe(1);
    });

    const { handleUpdateChecked, checked } = useCheckController<number>({
      initialValue: ref(0)
    });

    const onUpdate = handleUpdateChecked(invoke);

    await onUpdate(1);

    expect(checked.value).toBe(1);
    expect(invoke).toHaveBeenCalled();
  });

  test('傳入 beforeChange 為 false | promise<false>, onUpdateChecked 不會變更數值', async () => {
    const { checked, onUpdateChecked } = useCheckController<number>({
      initialValue: ref(0),
      beforeChange() {
        return false;
      }
    });

    await onUpdateChecked(1);

    expect(checked.value).toBe(0);

    const { checked: checked2, onUpdateChecked: onUpdateChecked2 } =
      useCheckController<number>({
        initialValue: ref(0),
        beforeChange: async () => false
      });

    await onUpdateChecked2(1);

    expect(checked2.value).toBe(0);
  });

  test('傳入 beforeChange 為 true | promise<true>, onUpdateChecked 可變更數值', async () => {
    const { checked, onUpdateChecked } = useCheckController<number>({
      initialValue: ref(0),
      beforeChange() {
        return true;
      }
    });

    await onUpdateChecked(1);

    expect(checked.value).toBe(1);

    const { checked: checked2, onUpdateChecked: onUpdateChecked2 } =
      useCheckController<number>({
        initialValue: ref(0),
        async beforeChange() {
          return true;
        }
      });

    await onUpdateChecked2(1);

    expect(checked2.value).toBe(1);
  });

  test('傳入 beforeChange 為 true | promise<true>, checked 可變更數值', async () => {
    const { checked } = useCheckController<number>({
      initialValue: ref(0),
      beforeChange() {
        return true;
      }
    });

    checked.value = 1;

    expect(unref(checked)).toBe(1);

    const { checked: checked2 } = useCheckController<number>({
      initialValue: ref(0),
      beforeChange: beforeChangeTrue
    });

    checked2.value = 1;
    await vi.runAllTimersAsync();

    expect(unref(checked2)).toBe(1);
  });
});
