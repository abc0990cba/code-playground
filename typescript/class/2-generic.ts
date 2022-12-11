class GenericNumber<NumType> {
  zeroValue: NumType | undefined;
  add: ((x: NumType, y: NumType) => NumType) | undefined;
}
 
let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
