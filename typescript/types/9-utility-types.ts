// Exclude and Extract

type A = number | string;
type B = string;

// C is number
type C = Exclude<A, B>

// C1 is string
type C1 = Extract<A, B>

/////////////////////////////////////////////

// NonNullable

type R = {a?: number | null};

// RA is number | null | undefined
type RA = R['a'];

// RA1 is number
type RA1 = NonNullable<R['a']>;

/////////////////////////////////////////////

// ReturnType

type F = (a: number) => string;

// RF is string
type RF = ReturnType<F>;

/////////////////////////////////////////////

// InstanceType

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

/////////////////////////////////////////////

// Awaited

// AA is number
type AA = Awaited<Promise<number>>;

// BB is string
type BB = Awaited<Promise<Promise<string>>>;

// CC is string | boolean
type CC = Awaited<string | Promise<Promise<boolean>>>;

// DD is string | number
type DD = Awaited<Promise<string | Promise<number>>>;
