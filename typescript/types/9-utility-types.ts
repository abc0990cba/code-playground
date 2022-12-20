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

/////////////////////////////////////////////

// Partial
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

/////////////////////////////////////////////

// Required
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
// Property 'b' is missing in type '{ a: number; }' but required
// in type 'Required<Props>'.(
// const obj2: Required<Props> = { a: 5 };

/////////////////////////////////////////////

// Readonly
interface TT {
  title: string;
}
 
const tt: Readonly<TT> = {
  title: "Delete inactive users",
};
 
// annot assign to 'title' because it is a read-only property.
// tt.title = "Hello";

/////////////////////////////////////////////

// Record
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

/////////////////////////////////////////////

// Pick and Omit
interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo2, "title" | "completed">;
const todo3: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type TodoInfo = Omit<Todo2, "completed" | "createdAt">;
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
 
