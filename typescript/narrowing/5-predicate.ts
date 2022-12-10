type Fish = { name: string, swim: () => void };
type Bird = { name: string, fly: () => void };
 
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const getSmallPet = (): Fish | Bird => {
  const fish: Fish = {
    name: 'Dwight',
    swim: () => {
      console.log('swim');
    } 
  }

  const bird: Bird = {
    name: 'Jim',
    fly: () => {
      console.log('fly');
    } 
  }

  return Math.random() > 0.5 ? bird : fish;
}

// Both calls to 'swim' and 'fly' are now okay.
let pet: Fish | Bird = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

///////////////////////////////////////////////////////////

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);

// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "Jim") return false;
  return isFish(pet);
});
