import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three';

class BuildCameras {
  static orthogonal(position, lookAt) {
    const tableBounds = window.game.scene.getObjectByName('table').userData.boundingBox;
    const buffer = 10;
    const xAxis = tableBounds.max.x - tableBounds.min.x + buffer;
    const zAxis = tableBounds.max.z - tableBounds.min.z + buffer;
    const sceneRatio = xAxis / zAxis;
    const aspect = window.innerWidth / window.innerHeight;
    let left, right, top, bottom;

    if (sceneRatio > aspect) {
      left = -xAxis / 2;
      right = xAxis / 2;
      top = xAxis / aspect / 2;
      bottom = -xAxis / aspect / 2;
    } else {
      left = -zAxis * aspect / 2;
      right = zAxis * aspect / 2;
      top = zAxis / 2;
      bottom = -zAxis / 2;
    }

    const camera = new OrthographicCamera(left, right, top, bottom, -200, 200);
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

  static buildThirdPersonCamera(scene, position) {
    const car = scene.getObjectByName('car');
    const camera = this.perspective(0, 10, -10, car.position);
    camera.position.copy(position);
    car.add(camera);
    camera.lookAt(new Vector3(0, 2, 0));
    return camera;
  }

  static build(game) {
    game.cameras = {
      orthogonal: this.orthogonal(
        new Vector3(0, 20, 0),
        game.scene.position
      ),
      thirdPerson: this.buildThirdPersonCamera(
        game.scene,
        new Vector3(10, 5, 0)
      ),
      perspective: this.perspective(
        new Vector3(75, 75, 75),
        game.scene.position
      ),
    };
    game.state.currentCamera = game.cameras.orthogonal;
  }
}

export default BuildCameras;
