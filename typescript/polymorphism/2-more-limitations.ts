type HasSides = { numberOfSides: number }
type SidesHaveLength = { sideLength: number }

function logPerimeter<
    Shape extends HasSides & SidesHaveLength
>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength);
    return s;
}

type Square = HasSides & SidesHaveLength;
let square: Square = { numberOfSides: 4, sideLength: 3 };

logPerimeter(square);