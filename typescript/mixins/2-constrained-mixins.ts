// This was our previous constructor:
type Constructor = new (...args: any[]) => {};

// Now we use a generic version which can apply a constraint on
// the class which this mixin is applied to
type GConstructor<T = {}> = new (...args: any[]) => T;

class Sprite {
  x = 0;
  y = 0;
 
  constructor(private readonly name: string) { }
}

class SpriteWithSetPos extends Sprite {
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
type Spritable = GConstructor<Sprite>;
type Loggable = GConstructor<{ print: () => void }>;

function Jumpable<TBase extends Positionable>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      // This mixin will only work if it is passed a base
      // class which has setPos defined because of the
      // Positionable constraint.
      this.setPos(0, 20);
    }
  };
}

// TS error
// const JumpSprite = Jumpable(Sprite);

// OK
const JumpSprite = Jumpable(SpriteWithSetPos);

const jumpSprite = new JumpSprite("jump-sprite");

console.log(jumpSprite); // Jumpable: { "name": "jump-sprite", "x": 0, "y": 0 }

jumpSprite.jump();

console.log(jumpSprite); // Jumpable: { "name": "jump-sprite", "x": 0, "y": 20 }

