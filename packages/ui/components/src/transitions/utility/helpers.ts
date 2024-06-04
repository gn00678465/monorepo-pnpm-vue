import type { RendererElement } from 'vue';
import type { ComponentProps, NumberOrTimings } from '../types';

export function getTimingValue(
  timing: NumberOrTimings | undefined,
  key: 'leave' | 'enter'
): number {
  if (!!timing && typeof timing === 'object') return timing[key];
  if (typeof timing === 'number') return timing;
  return 0;
}

export function camelCaseToKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function setTransformOrigin(props: ComponentProps, el: RendererElement) {
  if (props.transformOrigin)
    el.style.setProperty('transform-origin', props.transformOrigin);
}

export function setStyles(props: ComponentProps, el: RendererElement) {
  setTransformOrigin(props, el);

  if (props.styles) {
    Object.entries(props.styles).forEach(([key, value]) => {
      if (key in el.style) {
        const kebabKey = camelCaseToKebabCase(key);

        el.style.setProperty(kebabKey, value);
      }
    });
  }
}

export function setAbsolutePosition(
  props: ComponentProps,
  el: RendererElement
) {
  if (props.group && el instanceof HTMLElement) {
    const styles = getComputedStyle(el);

    const { width, height, marginLeft, marginTop } = styles;

    const parsedWidth = width !== 'auto' ? parseFloat(width) : el.offsetWidth;
    const parsedHeight =
      height !== 'auto' ? parseFloat(height) : el.offsetHeight;
    const parsedMarginLeft = parseFloat(marginLeft);
    const parsedMarginTop = parseFloat(marginTop);

    el.style.setProperty(
      'left',
      `${el.offsetLeft - parsedMarginLeft}px`,
      'important'
    );
    el.style.setProperty(
      'top',
      `${el.offsetTop - parsedMarginTop}px`,
      'important'
    );
    el.style.setProperty('width', `${parsedWidth}px`, 'important');
    el.style.setProperty('height', `${parsedHeight}px`, 'important');
    el.style.setProperty('position', 'absolute', 'important');
  }
}

export function cleanUpStyles(props: ComponentProps, el: RendererElement) {
  if (props.styles) {
    Object.entries(props.styles).forEach(([key]) => {
      if (key in el.style) {
        const kebabKey = camelCaseToKebabCase(key);

        el.style.removeProperty(kebabKey);
      }
    });
  }

  el.style.removeProperty('animation-duration');
  el.style.removeProperty('animation-delay');
}
