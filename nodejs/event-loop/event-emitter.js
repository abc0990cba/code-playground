// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    constructor() {
        super();
        // You can't emit an event from the constructor immediately because
        // the script will not have processed to the point where the user
        // assigns a callback to that event.
        // NOT WORKS!
        this.emit('event1');

        // Use nextTick to emit the event once a handler is assigned.
        process.nextTick(() => {
            this.emit('event2');
        });
    }
}

const myEmitter = new MyEmitter();
myEmitter.on('event1', () => {
    console.log('An event 1 occurred!');
});

myEmitter.on('event2', () => {
    console.log('An event 2 occurred!');
});