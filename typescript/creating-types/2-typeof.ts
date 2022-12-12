const options = {
    id: 1,
    active: true,
    label: 'Hello world',
};

// same as type Options = {
//     id: number;
//     active: boolean;
//     label: string;
// }
type Options = typeof options;                    

////////////////////////////////////////////////////////////////////

function f() {
  return { x: 10, y: 3 };
}

// Wrong!
// 'f' refers to a value, but is being used as a type here.
//  Did you mean 'typeof f'?
// type P = ReturnType<f>;

// OK!
// same as:
// type K = {
//     x: number;
//     y: number;
// }
type K = ReturnType<typeof f>;

////////////////////////////////////////////////////////////////////                    

class Foo {
    readonly hello: string;
    readonly foo: boolean;
    readonly bar: number;

    constructor(options: ReturnType<typeof Foo.defaultOptions>) {
        // In your IDE or editor, hover over options to see the magic in action...
        this.hello = options.hello;
        this.foo = options.foo;
        this.bar = options.bar;
    }

    static defaultOptions() {
        return {
            hello: 'world',
            foo: true,
            bar: 5,
        };
    }
}
