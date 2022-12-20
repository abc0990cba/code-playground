type ToArray<Type> = Type extends any ? Type[] : never;
type ToArray2<Type> = Type extends unknown ? Type[] : never;
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

//  StrArrOrNumArr is string[] | number[]
type StrArrOrNumArr = ToArray<string | number>;

//  StrArrOrNumArr2 is string[] | number[]
type StrArrOrNumArr2 = ToArray2<string | number>;

//  StrArrOrNumArr is (string | number)[]
type StrArrOrNumArr3 = ToArrayNonDist<string | number>;

///////////////////////////////////////////////////////////
           
type Without<T, U> = T extends U ? never : T;           

// A is string | number
type A  = Without<
  boolean | number | string,
  boolean
>
