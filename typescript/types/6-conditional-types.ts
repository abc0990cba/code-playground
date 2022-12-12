interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

// type Example1 = number 
type Example1 = Dog extends Animal ? number : string;
        
// type Example2 = string 
type Example2 = RegExp extends Animal ? number : string;

///////////////////////////////////////////////////////////

type IsString<T> = T extends string 
  ? true
  : false

// A is true
type A = IsString<string>;

// B is false
type B = IsString<number>;

///////////////////////////////////////////////////////////

type MessageOf<T> = T extends {message: unknown} ? T['message'] : never;

interface Email {
  message: string;
}

// EmailMessageContents is string
type EmailMessageContents = MessageOf<Email>;

interface Dog {
  bark(): void;
}

// DogMessageContents is never
type DogMessageContents = MessageOf<Dog>;

///////////////////////////////////////////////////////////

type Flatten<T> = T extends any[] ? T[number] : T;
// or
// Here, we used the infer keyword to declaratively introduce
// a new generic type variable named Item instead of specifying
// how to retrieve the element type of T within the true branch.
// type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
 
// Extracts out the element type.
// Str is string
type Str = Flatten<string[]>;
     
 
// Leaves the type alone.
// Num is number
type Num = Flatten<number>;

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
      
///////////////////////////////////////////////////////////
              
