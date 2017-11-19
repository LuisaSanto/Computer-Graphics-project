import {
  AxisHelper,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';

import Vehicle from './../Objects/Vehicle';

import BuildCameras from './BuildCameras';

class BuildLives {
  static build(game) {
    const car = new Vehicle(
      new Vector3(0, 0, -50), // Car initial position.
      new Vector3(1, 1, 1) // Car initial scale.
    );
    car.name = 'lives';
    game.state.currentCamera.add(car);
  }
}

export default BuildLives;
