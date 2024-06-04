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
  emits: ((...args: any[]) => any) | ((evt: string, ...args: any[]) => void)
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
      emits('before-enter', el);
    },
    onEnter: (el: RendererElement, done: () => void) => {
      emits('enter', el);
    },
    onAfterEnter: (el: RendererElement) => {
      cleanUpStyles(props, el);
      emits('after-enter', el);
    },
    onEnterCanceled: (el: RendererElement) => {
      emits('enter-cancelled', el);
    },
    onBeforeLeave: (el: RendererElement) => {
      beforeLeave(props, el);
      emits('before-leave', el);
    },
    onLeave: (el: RendererElement, done: () => void) => {
      leave(props, el, done);
      emits('leave', el);
    },
    onAfterLeave: (el: RendererElement) => {
      cleanUpStyles(props, el);
      emits('after-leave', el);
    },
    onLeaveCanceled: (el: RendererElement) => {
      emits('leave-cancelled', el);
    }
  };
}
