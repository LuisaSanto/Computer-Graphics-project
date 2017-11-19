import { SpotLight} from 'three';

class HeadLight extends SpotLight {
  constructor(position) {
    super(0xffffff, 1, 100, Math.PI/2, 0.9, 2);
    this.position.copy(position);
  }
}

export default HeadLight;
