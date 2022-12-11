class A {
  constructor(private readonly msg: string) { }
}

// construct signature
type SomeConstructor = {
  new (s: string): A;
};

function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

/////////////////////////////////////////////////////////

interface ClockConstructor {
    new (hour: number, minute: number): Clock;
}

interface Clock {
    tick: () => void;
}

class DigitalClock implements Clock {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements Clock {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): Clock {
    return new ctor(hour, minute);
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
