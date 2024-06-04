import { Transition, TransitionGroup, toValue } from 'vue';
import type { MaybeRef } from 'vue';

export function transitionType(group: MaybeRef<boolean>) {
  return toValue(group) ? TransitionGroup : Transition;
}
