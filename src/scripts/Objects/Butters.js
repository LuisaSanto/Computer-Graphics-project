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

    const lambertMaterial = new MeshLambertMaterial({
      color: 0xffff00,
      wireframe: window.game.state.wireframe,
    });

    const phongMaterial = new MeshPhongMaterial({
      color: 0xffff00,
      wireframe: window.game.state.wireframe,
    });

    const basicMaterial = new MeshBasicMaterial({
      color: 0xffff00,
      wireframe: window.game.state.wireframe,
    });

    const butter = new Mesh(geometry, phongMaterial);
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
    }
    butter.name = 'butter';

    for (let index = 0; index < amount; index++) {
      const newButter = butter.clone();
      
      newButter.position.set(
        Math.random() * safe_x - safe_x/2,
        2,
        Math.random() * safe_z - safe_z/2
      );

      newButter.state = {
          boundingBox: new Box3().setFromObject(newButter),
          phongMaterial: phongMaterial, 
          lambertMaterial: lambertMaterial,
          basicMaterial: basicMaterial,
        }

      this.add(newButter);
    }
  }
}

export default Butters;
