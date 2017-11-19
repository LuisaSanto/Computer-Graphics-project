import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three';

class BuildCameras {
  static orthogonal(position, lookAt) {
    const factor = (window.innerWidth * window.innerHeight * 12) / (1275 * 707);
    const camera = new OrthographicCamera(-window.innerWidth / factor, window.innerWidth / factor, window.innerHeight / factor, -window.innerHeight / factor, -200, 200);
    camera.position.copy(position);
    camera.lookAt(lookAt);
    camera.name = 'camera';
    return camera;
  }

  static perspective(position, lookAt) {
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
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
      orthogonal: this.orthogonal(
        new Vector3(0, 20, 0),
        game.scene.position
      ),
      thirdPerson: this.buildThirdPersonCamera(game.scene),
      perspective: this.perspective(
        new Vector3(75, 75, 75),
        game.scene.position
      ),
    };
    game.state.currentCamera = game.cameras.perspective;
  }
}

export default BuildCameras;
