function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // x is Date here         
  } else {
    console.log(x.toUpperCase()); // x is string here     
  }
}
