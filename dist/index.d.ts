type EventHandler = (...args: any) => string | void;
interface State {
    [eventName: string]: EventHandler;
}
export declare function makeStateMachine(states: {
    IDLE: State;
    [stateName: string]: State;
}): {
    trigger(eventName: string, ...args: any): void;
    getState(): string;
};
export {};
