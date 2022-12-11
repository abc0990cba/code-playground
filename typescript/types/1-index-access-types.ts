type Person = { 
  age: number;
  name: string;
  alive: boolean;
};

// Age is number
type Age = Person["age"]; 

// I1 is string | number
type I1 = Person["age" | "name"];
 
// I2 is string | number | boolean
type I2 = Person[keyof Person];
 
type AliveOrName = "alive" | "name";

// I3 is string | boolean
type I3 = Person[AliveOrName];

//////////////////////////////////////////////

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
// Person2 is { name: string; age: number; } 
type Person2 = typeof MyArray[number];
       
// Age2 is number
type Age2 = typeof MyArray[number]["age"];
// Or
type Age3 = Person["age"];


// You can only use types when indexing, meaning you can’t use
// a const to make a variable reference:
// const key = "age";
// type Age4 = Person2[key];

// However, you can use a type alias for a similar style of refactor:
type key = "age";
type Age5 = Person2[key]; // Age5 is number
