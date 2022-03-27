import { createMachine } from 'xstate'


export const AppMachine = (maxBreaths: number = 30, interval: number = 0.5) => createMachine(
  {
    id: 'breathMachine',
    initial: 'idle',
    tsTypes: {} as import('./index.typegen').Typegen0,
    context: {
      breaths: 0,
      maxBreaths: maxBreaths,
      interval: interval,
      elapsedTime: 0,
      holded: 0,
    },
    states: {
      idle: { on: { NEXT: 'breathing' } },
      'breathing': {
        on: { NEXT: 'holding', CANCLE: 'idle' },
        onDone: { target: 'holding', actions: 'resetBreaths' },
        initial: 'inhale',
        states: {
          'inhale': {
            entry: 'increaseBreaths',
            invoke: { id: 'timer', src: 'tickTimer' },
            on: {
              TICK: [
                { cond: 'isBelowMaxBreaths', target: 'exhale' },
                { target: 'fin' },
              ],
            },
          },
          'exhale': {
            invoke: { id: 'timer', src: 'tickTimer' },
            on: { TICK: 'inhale' },
          },
          'fin': { type: 'final' },
        },
      },
      'holding': {
        on: { NEXT: 'breathing', CANCLE: 'idle' },
        onDone: { target: 'breathing' },
        initial: 'hold',
        states: {
          'hold': {
            on: { NEXT: 'retention' },
          },
          'retention': {
            after: { 5000: { target: 'fin' } },
          },
          'fin': { type: 'final' },
        },
      },
    },
  },
  {
    actions: {
      increaseBreaths : (context) => {context.breaths += 1},
      resetBreaths: (context) => {context.breaths = 0},
    },
    guards: {
      isBelowMaxBreaths: (context) => context.breaths < context.maxBreaths,
    },
    services: {
      tickTimer : (context) => (cb) => {
          //@ts-ignore
          const interval = setInterval(() => cb('TICK'), 1000 * context.interval)
          return () => clearInterval(interval)
      }
    },
  },
)
