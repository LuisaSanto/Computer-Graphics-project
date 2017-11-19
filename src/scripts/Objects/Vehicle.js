import {
  AxisHelper,
  BoxGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PolyhedronGeometry,
  RingGeometry,
  Shape,
  TorusGeometry,
  Vector3,
  LatheGeometry
} from 'three';

import Car from './Car';
import OldCar from './OldCar';
import Motorcycle from './Motorcycle';

class Vehicle extends Group {
  constructor(position = new Vector3(), scale = new Vector3(1, 1, 1)) {
    super();
    this.name = 'car';
    this.userData = {
      acceleration: 0,
      baseAcceleration: 20,
      collision: [],
      currentMode: 'carrot',
      dof: new Vector3(-1, 0, 0),
      drag: 0.02, // As a percentage of the velocity.
      initialPosition: position,
      isStuck: false,
      isRotationg: false,
      rotationDir: 0,
      maxAcceleration: 50,
      maxSpeed: 40,
      rotation: 3,
      speed: 0,
      turningLeft: false,
      turningRight: false,
      vuv: new Vector3(0, 1, 0),
    };
    this.modes = {
      carrot: new Car(),
      old: new OldCar(),
      motorcycle: new Motorcycle(),
    };
    this.selectMode('carrot');
    this.scale.copy(scale);
    this.position.copy(position);
  }

  selectMode(mode) {
    this.remove(this.getObjectByName('mode'));
    this.add(this.modes[mode]);
  }

  changeMode() {
    const modeCodes = Object.getOwnPropertyNames(this.modes);

    for (let index = 0; index < modeCodes.length - 1; index++) {
      if (this.userData.currentMode === modeCodes[index]) {
        this.selectMode(modeCodes[index + 1]);
        this.userData.currentMode = modeCodes[index + 1];
        return;
      }
    }

    this.selectMode(modeCodes[0]);
    this.userData.currentMode = modeCodes[0];
  }

  reset() {
    window.game.restart();
  }
}

export default Vehicle;
