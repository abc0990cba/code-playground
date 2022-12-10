type Point = { x: number; y: number };

type P = keyof Point; // same as 'x' | 'y'

const a: P = 'x';
const b: P = 'y';

/////////////////////////////////////////////

type Arrayish = { [n: number]: unknown };
type G = keyof Arrayish; // G is number

// Note that in this example, M is string | number — this is because
// JavaScript object keys are always coerced to a string,
// so obj[0] is always the same as obj["0"].
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // M is string | number
