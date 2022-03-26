import { BreathContext } from "./machine";

export function isBelowMaxBreaths(context:BreathContext): boolean {
    return context.breaths < context.maxBreaths;
}