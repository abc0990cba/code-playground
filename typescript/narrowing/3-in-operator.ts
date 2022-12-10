type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim(); // animal is Fish here
  }
  return animal.fly(); // animal is Bird here
}

//////////////////////////////////////////////////////

type Human = { swim?: () => void; fly?: () => void };

function move2(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    return animal.swim(); // animal is Fish | Human here
  }
  return animal.fly(); // animal is Bird | Human here
}
