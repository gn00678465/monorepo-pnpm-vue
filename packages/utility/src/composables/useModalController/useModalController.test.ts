import { unref, ref } from 'vue';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { useModalController } from './useModalController';

describe('useModalController', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockData = { foo: 'bar' };

  test('should be defined', () => {
    expect(useModalController).toBeDefined();
  });

  test('onModalOpen', () => {
    const { show, onModalOpen, data } = useModalController();
    expect(unref(show)).toBe(false);
    expect(unref(data)).toBeNull();

    onModalOpen(mockData);

    expect(unref(show)).toBe(true);
    expect(unref(data)).toEqual(mockData);
  });

  test('onModalClose', () => {
    const { show, onModalClose } = useModalController();

    onModalClose();

    expect(unref(show)).toBe(false);
  });
});
