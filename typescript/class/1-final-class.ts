class A {
    private constructor(readonly prop: number = 2) { }
  
    static create() {
      return new A();
    }
  }
  
  const a = A.create();
  
  console.log(a.prop);
  
  // Cannot extend a class 'A'. Class constructor is marked as private.
  // class B extends A {}