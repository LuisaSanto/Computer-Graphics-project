import {
  Box3,
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial
} from 'three';

class Butters extends Group {
  constructor(amount) {
    super();
    this.name = 'butters';
    this.addButters(amount);
  }

  addButters(amount) {
    const geometry = new BoxGeometry(5, 2, 2, 5, 5, 5);
    const material = new MeshLambertMaterial({
      color: 0xffff00,
      wireframe: window.game.state.wireframe,
    });

    const safe_x = 120;
    const safe_z = 80;
    const AABB = new Box3();

    const butter = new Mesh(geometry, material);

    butter.userData = {
      boundingBox: AABB,
      collision: [],
      forward: false,
      reverse: false,
      right: false,
      left: false,
    }
    butter.name = 'butter';

    for (let index = 0; index < amount; index++) {
      const newButter = butter.clone();
      newButter.position.set(
        Math.random() * safe_x - safe_x/2,
        3,
        Math.random() * safe_z - safe_z/2
      );

      newButter.userData = {
        boundingBox: new Box3().setFromObject(newButter),
      }

      this.add(newButter);
    }
  }
}

export default Butters;
