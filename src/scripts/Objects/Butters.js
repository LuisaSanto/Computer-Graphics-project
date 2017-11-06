import {
  Box3,
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshBasicMaterial
} from 'three';

class Butters extends Group {
  constructor(amount) {
    super();
    this.name = 'butters';
    this.addButters(amount);
  }

  addButters(amount) {
    const geometry = new BoxGeometry(5, 1.5, 2, 5, 3, 5);
    const materialArgs = {
      color: 0xffff00,
      wireframe: window.game.state.wireframe,
    };
    const butter = new Mesh(geometry, new MeshBasicMaterial(materialArgs));

    const safe_x = 120;
    const safe_z = 80;
    const AABB = new Box3();

    butter.state = {
      boundingBox: AABB,
      collision: [],
      forward: false,
      reverse: false,
      right: false,
      left: false,
      materials: [
        new MeshBasicMaterial(materialArgs),
        new MeshLambertMaterial(materialArgs),
        new MeshPhongMaterial(materialArgs),
      ],
    }
    butter.name = 'butter';

    for (let index = 0; index < amount; index++) {
      const newButter = butter.clone();

      newButter.position.set(
        Math.random() * safe_x - safe_x/2,
        2,
        Math.random() * safe_z - safe_z/2
      );

      newButter.state = Object.assign(butter.state, {
        boundingBox: new Box3().setFromObject(newButter),
      });

      this.add(newButter);
    }
  }
}

export default Butters;
