import type { RendererElement, TransitionProps } from 'vue';

export type TransitionKey = 'enter' | 'leave';
type TransitionTiming = 'before' | 'after';

type KebabCaseKey =
  | `${TransitionTiming}-${TransitionKey}`
  | `${TransitionKey}-cancelled`;
export type CamelCaseKey =
  | `${TransitionTiming}${Capitalize<TransitionKey>}`
  | `${TransitionKey}Cancelled`;

type TransitionTimings = {
  enter: number;
  leave: number;
};

type Styles = Partial<CSSStyleDeclaration>;

export type NumberOrTimings = number | TransitionTimings;

interface BaseComponentProps {
  mode?: TransitionProps['mode'];
  duration?: NumberOrTimings;
  delay?: NumberOrTimings;
  styles?: Styles;
  /**
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
   */
  transformOrigin?: string;
  group?: false;
}

interface GroupComponentProps extends Omit<BaseComponentProps, 'group'> {
  group?: true;
  tag?: string;
}

export type ComponentProps = BaseComponentProps | GroupComponentProps;
