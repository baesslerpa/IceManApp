import { assign, createMachine } from 'xstate'
import { increaseBreaths, increaseHolded, resetBreaths } from './actions'
import { isBelowMaxBreaths } from './guards'

const tickTimer = (context: BreathContext, event: BreathEvent) => {
  return (cb: CallableFunction) => {
    const interval = setInterval(() => cb('TICK'), 1000 * context.interval)

    return () => clearInterval(interval)
  }
}

const holdTimer = (context: BreathContext, event: BreathEvent) => {
  return (cb: CallableFunction) => {
    const interval = setInterval(() => assign<BreathContext>({ holded: ({holded}) => holded + 1 }) , 1000)
    return () => clearInterval(interval)
  }
}

export const AppMachine = createMachine<BreathContext, BreathEvent>(
  {
    id: 'breathMachine',
    initial: 'idle',
    context: {
      breaths: 0,
      maxBreaths: 30,
      interval: 0.4,
      elapsedTime: 0,
            holded: 0,
    },
    states: {
      idle: { on: { NEXT: 'breathing' } },
      breathing: {
        on: { NEXT: 'holding', CANCLE: 'idle' },
        onDone: { target: 'holding', actions: resetBreaths },
        initial: 'inhale',
        states: {
          inhale: {
            entry: increaseBreaths,
            invoke: { id: 'timer', src: tickTimer },
            on: {
              TICK: [
                { cond: isBelowMaxBreaths, target: 'exhale' },
                { target: 'fin' },
              ],
            },
          },
          exhale: {
            invoke: { id: 'timer', src: tickTimer },
            on: { TICK: 'inhale' },
          },
          fin: { type: 'final' },
        },
      },
      holding: {
        on: { NEXT: 'breathing', CANCLE: 'idle' },
        onDone: { target: 'breathing' },
        initial: 'hold',
        states: {
          hold: {
            invoke: { id: 'counter', src: holdTimer },
            on: { NEXT: 'retention'},
          },
          retention: {
            after: { 5000: { target: 'fin' } },
          },
          fin: { type: 'final' },
        },
      },
    },
  },
  {
    guards: { isBelowMaxBreaths },
    actions: { increaseBreaths, resetBreaths, increaseHolded },
  },
)
