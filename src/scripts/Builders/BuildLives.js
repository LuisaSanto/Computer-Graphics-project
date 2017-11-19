import {
  AxisHelper,
  Scene,
  Vector3,
  WebGLRenderer,
  Group,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

import Vehicle from './../Objects/Vehicle';

import BuildCameras from './BuildCameras';

class BuildLives {
  static build(game) {
    for (let i = 0; i < 5; i++) {
      game.state.currentCamera.add(new Vehicle(
        new Vector3(10, 10, -20),
        new Vector3(.25, .25, .25)
      ));
    }
  }
}

export default BuildLives;
