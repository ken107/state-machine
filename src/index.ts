
type EventHandler = (...args: any) => string|void

interface State {
  [eventName: string]: EventHandler
}

export function makeStateMachine(states: {IDLE: State, [stateName: string]: State}) {
  let currentStateName = "IDLE"
  states[currentStateName].onTransitionIn?.()
  let lock = 0
  return {
    trigger(eventName: string, ...args: any) {
      if (lock) throw new Error("Cannot trigger an event synchronously while inside an event handler")
      lock++;
      try {
        const currentState = states[currentStateName]
        if (!(eventName in currentState)) throw new Error("Missing handler " + currentStateName + "." + eventName)
        const nextStateName = currentState[eventName](...args)
        if (nextStateName) {
          if (!(nextStateName in states)) throw new Error("Missing state " + nextStateName)
          currentStateName = nextStateName
          states[currentStateName].onTransitionIn?.()
        }
      }
      finally {
        lock--;
      }
    },
    getState() {
      return currentStateName;
    }
  }
}
