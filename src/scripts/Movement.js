import { Matrix4 } from 'three';

// TODO: This is not being used...

class Movement {
  static updateObjectSpeed(obj, delta) {
    const acceleration = obj.state.acceleration;
    const drag = obj.state.drag;
    const speed = obj.state.speed;
    const direction = acceleration / acceleration;

    if (acceleration === 0 && Math.abs(speed) < 0.05) {
      obj.state.speed = 0;
    } else {
      obj.state.speed += direction * (Math.abs(acceleration) - drag) * delta;
    }
    console.log(obj.state.acceleration);
  }

  static updateObjectPosition(obj, delta) {
    const matrix = new Matrix4();

    this.updateObjectSpeed(obj, delta);
    matrix.setPosition(obj.state.orientation.multiplyScalar(obj.state.speed * delta));
    obj.applyMatrix(matrix);
  }

  static updateObjectRotation(obj) {

  }
}

export default Movement;
