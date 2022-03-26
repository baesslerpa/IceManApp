// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    resetBreaths: "done.state.breathMachine.breathing";
    increaseBreaths: "TICK";
  };
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
    "done.invoke.timer": {
      type: "done.invoke.timer";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.timer": { type: "error.platform.timer"; data: unknown };
  };
  invokeSrcNameMap: {
    tickTimer: "done.invoke.timer";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    tickTimer: "TICK";
  };
  eventsCausingGuards: {
    isBelowMaxBreaths: "TICK";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "breathing"
    | "breathing.inhale"
    | "breathing.exhale"
    | "breathing.fin"
    | "holding"
    | "holding.hold"
    | "holding.retention"
    | "holding.fin"
    | {
        breathing?: "inhale" | "exhale" | "fin";
        holding?: "hold" | "retention" | "fin";
      };
  tags: never;
}
