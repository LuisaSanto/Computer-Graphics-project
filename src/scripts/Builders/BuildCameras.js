import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three';

class BuildCameras {
  static orthogonal(x, y, z, lookAt) {
    const factor = (window.innerWidth * window.innerHeight * 12) / (1275 * 707);
    const camera = new OrthographicCamera(-window.innerWidth / factor, window.innerWidth / factor, window.innerHeight / factor, -window.innerHeight / factor, 1, 200);
    camera.position.set(x, y, z);
    camera.lookAt(lookAt);
    camera.name = 'camera';
    return camera;
  }

  static perspective(x, y, z, lookAt) {
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(x, y, z);
    camera.lookAt(lookAt);
    camera.name = 'camera';
    return camera;
  }

  static buildThirdPersonCamera(scene) {
    const car = scene.getObjectByName('car');
    const camera = this.perspective(0, 10, -10, car.position);
    car.add(camera);
    camera.lookAt(new Vector3(0, 2, 5));
    return camera;
  }

  static build(game) {
    game.cameras = {
      orthogonal: this.orthogonal(0, 20, 0, game.scene.position),
      thirdPerson: this.buildThirdPersonCamera(game.scene),
      perspective: this.perspective(75, 75, 75, game.scene.position),
    };
    game.state.currentCamera = game.cameras.orthogonal;
  }
}

export default BuildCameras;
