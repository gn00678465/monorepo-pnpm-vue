import type { RendererElement } from 'vue';
import {
  getTimingValue,
  setAbsolutePosition,
  setStyles,
  cleanUpStyles
} from './helpers';
import type { ComponentProps, TransitionKey, CamelCaseKey } from '../types';

export function useHooks(
  props: ComponentProps,
  emits: Partial<
    Record<TransitionKey | CamelCaseKey, (el: RendererElement) => void>
  > = {}
) {
  function beforeEnter(props: ComponentProps, el: RendererElement) {
    const enterDuration = getTimingValue(props.duration, 'enter');
    const enterDelay = getTimingValue(props.delay, 'enter');

    el.style.setProperty('animation-duration', `${enterDuration}ms`);
    el.style.setProperty('animation-delay', `${enterDelay}ms`);

    setStyles(props, el);
  }

  function beforeLeave(props: ComponentProps, el: RendererElement) {
    const leaveDuration = getTimingValue(props.duration, 'leave');
    const leaveDelay = getTimingValue(props.delay, 'leave');

    el.style.setProperty('animation-duration', `${leaveDuration}ms`);
    el.style.setProperty('animation-delay', `${leaveDelay}ms`);

    setStyles(props, el);
  }

  function leave(props: ComponentProps, el: RendererElement, done: () => void) {
    setAbsolutePosition(props, el);

    const leaveDuration = getTimingValue(props.duration, 'leave');
    const leaveDelay = getTimingValue(props.delay, 'leave');

    setTimeout(done, leaveDuration + leaveDelay);
  }

  return {
    onBeforeEnter: (el: RendererElement) => {
      beforeEnter(props, el);
      emits['beforeEnter']?.(el);
    },
    onEnter: (el: RendererElement, done: () => void) => {
      emits.enter?.(el);
    },
    onAfterEnter: (el: RendererElement) => {
      cleanUpStyles(props, el);
      emits['afterEnter']?.(el);
    },
    onEnterCanceled: (el: RendererElement) => {
      emits['enterCancelled']?.(el);
    },
    onBeforeLeave: (el: RendererElement) => {
      beforeLeave(props, el);
      emits['beforeLeave']?.(el);
    },
    onLeave: (el: RendererElement, done: () => void) => {
      leave(props, el, done);
      emits.leave?.(el);
    },
    onAfterLeave: (el: RendererElement) => {
      cleanUpStyles(props, el);
      emits['afterLeave']?.(el);
    },
    onLeaveCanceled: (el: RendererElement) => {
      emits['leaveCancelled']?.(el);
    }
  };
}
