// Without infer
type ElementType<T> = T extends unknown[] ? T[number] : T;

// A is boolean
type A = ElementType<boolean[]>;

// With infer
type ElementType2<T> = T extends (infer U)[] ? U : T

// B is boolean
type B = ElementType2<boolean[]>;

///////////////////////////////////////////////////////////

type SecondArg<T> = T extends (a: any, b: infer B) => any ? B : never;

// F is (start?: number | undefined, end?: number | undefined) => any[]
type F = typeof Array.prototype.slice;

// V is number | undefined
type V = SecondArg<F>

///////////////////////////////////////////////////////////

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

// N is number 
type N = GetReturnType<() => number>;
     
// S is string
type S = GetReturnType<(x: string) => string>;
     
// Bools is boolean[]
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
      
