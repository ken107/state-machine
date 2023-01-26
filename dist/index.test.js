"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const assert = require("assert");
const sm = (0, _1.makeStateMachine)({
    IDLE: {
        play() {
            return "PLAYING";
        },
        stop() { },
        goto(state) {
            return state;
        }
    },
    PLAYING: {
        play() { },
        stop() {
            return "STOPPING";
        }
    },
    STOPPING: {
        onTransitionIn() {
            this.timer = setTimeout(() => sm.trigger("onStop"), 2000);
        },
        onStop() {
            return "IDLE";
        },
        play() {
            clearTimeout(this.timer);
            return "PLAYING";
        },
        stop() { }
    },
    STUCK: {}
});
runTest()
    .catch(err => { throw err; });
async function runTest() {
    assert(sm.getState() == "IDLE");
    sm.trigger("play");
    assert(sm.getState() == "PLAYING");
    sm.trigger("stop");
    assert(sm.getState() == "STOPPING");
    await sleep(1000);
    sm.trigger("play");
    assert(sm.getState() == "PLAYING");
    await sleep(3000);
    assert(sm.getState() == "PLAYING");
    sm.trigger("stop");
    assert(sm.getState() == "STOPPING");
    await sleep(3000);
    assert(sm.getState() == "IDLE");
    sm.trigger("goto", "STUCK");
    assert(sm.getState() == "STUCK");
}
function sleep(ms) {
    return new Promise(f => setTimeout(f, ms));
}
