declare function f1(arg: { a: number; b: string }): void;

// type T0 = [] 
type T0 = Parameters<() => string>;
     
// type T1 = [s: string]
type T1 = Parameters<(s: string) => void>;
     
// type T2 = [arg: unknown]
type T2 = Parameters<<T>(arg: T) => T>;
     
// type T3 = [arg: { a: number; b: string; }]
type T3 = Parameters<typeof f1>;
     
// type T4 = unknown[]
type T4 = Parameters<any>;
     
// type T5 = never
type T5 = Parameters<never>;
     
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T6 = never
// type T6 = Parameters<string>;

// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.     
// type T7 = never
// type T7 = Parameters<Function>;
