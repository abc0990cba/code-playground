function f() {
  return { x: 10, y: 3 };
}

// Wrong!
// 'f' refers to a value, but is being used as a type here.
//  Did you mean 'typeof f'?
type P = ReturnType<f>;

// OK!
type K = ReturnType<typeof f>;
