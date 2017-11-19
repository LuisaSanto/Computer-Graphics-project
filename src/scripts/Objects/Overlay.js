import {
  Scene,
  Vector3
} from 'three';

import Vehicle from './../Objects/Vehicle';

class Overlay extends Scene {
  constructor() {
    super();
    this.lives();
    this.name = "overlay";
  }

  lives() {
    const position = new Vector3(10, 0, -45);
    for (let i = 0; i < 5; i++) {
      position.x += 12;
      this.add(new Vehicle(position));
    }
  }
}

export default Overlay;
