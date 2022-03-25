import { Interpreter, State, StateSchema } from 'xstate'

type BreathContext = {
  breaths: number
  maxBreaths: number
  interval: number
  elapsedTime: number
  holded: number
}

declare enum EventNames {
  TICK = 'TICK',
  NEXT = 'NEXT',
  CANCLE = 'CANCLE',
  HOLD = 'HOLD',
}

type BreathEvent = {
  type: EventNames
}

type BreathStates = {
  idle: State<BreathContext, BreathEvent>
  breathing: State<BreathContext, BreathEvent>
  holding: State<BreathContext, BreathEvent>
}

export type Context = [
  State<BreathContext, BreathEvent>,
  Interpreter<BreathContext, StateSchema, BreathEvent>['send'],
]
