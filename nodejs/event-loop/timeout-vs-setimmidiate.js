// Different results on different calls.
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

setTimeout(() => {
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});