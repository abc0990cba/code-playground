interface ITarget {
  method(): void;
}

class ClassA implements ITarget {
  method() {
    console.log('method A');
  }
}

interface ISpecificTarget {
  methodSpecific(): void;
}

class ClassB implements ISpecificTarget {
  methodSpecific() {
    console.log('method B');
  }
}

class ClassBAdapter implements ITarget {
  private classB: ClassB;

  constructor() {
      this.classB = new ClassB();
  }

  method() {
      this.classB.methodSpecific();
  }
}

// Client code.
(function useWithoutAdapter() {
  const items = [new ClassA(), new ClassB()];
  items.forEach((item) => {
    item instanceof ClassB ? item.methodSpecific() : item.method();
  })
})();

(function useWithoutAdapter() {
  const adaptedItems = [new ClassA(), new ClassBAdapter()]
  adaptedItems.forEach((item) => {
    item.method();
  })
})()