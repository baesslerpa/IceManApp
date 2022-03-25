import { assign } from "xstate";

export const increaseBreaths = assign<BreathContext>({breaths: ({breaths}) => breaths + 1});
export const increaseHolded = assign<BreathContext>({holded: ({holded}) => holded + 1});
export const resetBreaths = assign<BreathContext>({breaths: 0});