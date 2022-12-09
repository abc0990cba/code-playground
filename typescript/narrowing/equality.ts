function example(x: string | number, y: string | boolean) {
  if (x === y) {
    x.toUpperCase(); // x is string here
    y.toLowerCase(); // y is string here
  } else {
    console.log(x); // x is string | number here
    console.log(y); // x is string | boolean here
  }
}

////////////////////////////////////////////////////////////////

function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    // strs is string[] here
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } 
    // strs is string here
    else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

////////////////////////////////////////////////////////////////

function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {

    // Container.value is number here
    // because here we using != non equality checks

    // But Container.value could be number | undefined
    // if here we use !== non equality checks
    console.log(container.value);
                           
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}
