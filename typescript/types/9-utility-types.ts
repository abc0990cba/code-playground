type A = number | string;
type B = string;

// C is number
type C = Exclude<A, B>

// C1 is string
type C1 = Extract<A, B>

/////////////////////////////////////////////

type R = {a?: number | null};

// RA is number | null | undefined
type RA = R['a'];

// RA1 is number
type RA1 = NonNullable<R['a']>;

/////////////////////////////////////////////

type F = (a: number) => string;

// RF is string
type RF = ReturnType<F>;

/////////////////////////////////////////////

type G = { new(): H };
type H = { h: number};

// I is { h: number; }
type I = InstanceType<G>
