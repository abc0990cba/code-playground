// Parameters
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

// ConstructorParameters

// type T0 = [message?: string]
type T0 = ConstructorParameters<ErrorConstructor>;
     
// type T1 = string[]
type T1 = ConstructorParameters<FunctionConstructor>;
     
// type T2 = [pattern: string | RegExp, flags?: string]
type T2 = ConstructorParameters<RegExpConstructor>;
     
// type T3 = unknown[]
type T3 = ConstructorParameters<any>;
     

// Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
// Type 'Function' provides no match for the signature 'new (...args: any): any'.     
// type T4 = never
// type T4 = ConstructorParameters<Function>;

// inside TypeScript

// type ConstructorParameters<T extends abstract new (...args: any) => any>
//  = T extends abstract new (...args: infer P) => any ? P : never

////////////////////////////////////////////////////////////////////////////////////////

// ThisParameterType
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// Create a function with this parameter:
function capitalizeString(this: String) {
  return this[0].toUpperCase + this.substring(1).toLowerCase()
}

// type CapitalizeStringType = String
type CapitalizeStringType = ThisParameterType<typeof capitalizeString>

////////////////////////////////////////////////////////////////////////////////////////

// InstanceType 1
type G = { new(): H };
type H = { h: number};

// I is { h: number; }
type I = InstanceType<G>

type Constructor = new (...args: any[]) => any;

function factory<T extends Constructor>(ctor: T): InstanceType<T> {
  return new ctor();
};

class AF { prop = 'simple_prop'; }

const af = factory(AF);

console.log(af); // AF: { "prop": "simple_prop" } 

////////////////////////////////////////////////////////////////////////////////////////

// InstanceType 2
class C {
  x = 0;
  y = 0;
}

// type Type0 = C 
type Type0 = InstanceType<typeof C>;
     
// type Type1 = any
type Type1 = InstanceType<any>;
     
// type Type2 = never
type Type2 = InstanceType<never>;
     
// Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
// type Type3 = any
// type Type3 = InstanceType<string>;

// Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
// Type 'Function' provides no match for the signature 'new (...args: any): any'.    
// type Type4 = any;
// type Type4 = InstanceType<Function>;

////////////////////////////////////////////////////////////////////////////////////////

// OmitThisParameter    
function toHex2(this: Number) {
  return this.toString(16);
}
 
// type FiveToHex = () => string
type FiveToHex = OmitThisParameter<typeof toHex2>;
const fiveToHex: FiveToHex = toHex2.bind(5);
 
////////////////////////////////////////////////////////////////////////////////////////

// OmitThisParameter   
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
