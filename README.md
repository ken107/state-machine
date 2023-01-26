# state-machine
Make implementing state machines less error prone

# Usage
```typescript
import { makeStateMachine } from "@lsdsoftware/state-machine"

const sm = makeStateMachine({
  IDLE: {
    startIt() {
      //do something
      return "BUSY"
    }
  },
  BUSY: {
    stopIt() {
      //stop doing it
      return "IDLE"
    },
    stopAfterDelay() {
      return "STOPPING"
    }
  },
  STOPPING: {
    onTransitionIn(this: any) {
      //do some clean up
      this.timer = setTimeout(() => sm.trigger("onDone"), 3000)
    },
    onDone() {
      return "IDLE"
    },
    stopIt() {
      console.log("Already stopping, be patient!")
      //return void to stay in same state
    },
    forceIt(this: any) {
      clearTimeout(this.timer)
      return "IDLE"
    }
  }
})

sm.trigger("startIt")
sm.getState()   //BUSY
```
