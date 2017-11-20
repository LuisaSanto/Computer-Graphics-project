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
import HeadLight from './HeadLight';

class Vehicle extends Group {
  constructor(position = new Vector3(), scale = new Vector3(1, 1, 1), wireframe = window.game.state.wireframe) {
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
      carrot: new Car(wireframe),
      old: new OldCar(wireframe),
      motorcycle: new Motorcycle(wireframe),
    };
    this.addSpotlights();
    this.selectMode('carrot');
    this.scale.copy(scale);
    this.position.copy(position);
  }

  addSpotlights() {
    var group = new Group();
    var spotlight1 = new HeadLight(new Vector3(0.8, 2, 7.5));
    var spotlight2 = new HeadLight(new Vector3(-0.8, 2, 7.5));
    var targetObject = new Group();
    targetObject.position.set(0.9, 0.5, 100);
    var targetObject2 = new Group();
    targetObject2.position.set(-0.9, 0.5, 100);
    spotlight1.target = targetObject;
    spotlight2.target = targetObject2;
    group.add(spotlight1, spotlight1.target, spotlight2, spotlight2.target);
    group.name = 'headLights';
    group.rotateY(-Math.PI/2);
    this.add(group);
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
    window.game.changeMaterials(this);
  }

  reset() {
    window.game.restart();
  }
}

export default Vehicle;
