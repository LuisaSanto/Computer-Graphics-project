import {
  Box3,
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  Vector3,
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

    butter.userData = {
      collision: [],
      dof: new Vector3(),
      isRotating: false,
      rotationDir: 0,
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

      newButter.userData.boundingBox = new Box3().setFromObject(newButter);

      this.add(newButter);
    }
  }
}

export default Butters;
