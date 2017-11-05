import { Matrix4 } from 'three';

// TODO: This is not being used...

class Movement {

  /**
   * Update object acceleration with time.
   * @param {THREE.Object2D} obj
   * @param {int} delta
   */
  static updateObjectAcceleration(obj, delta) {
    const acceleration = obj.userData.acceleration;
    const direction = acceleration !== 0 ? acceleration / Math.abs(acceleration) : 0;

    if (acceleration !== 0) {
      obj.userData.acceleration += acceleration / 5;
    }

    if (Math.abs(obj.userData.acceleration) > obj.userData.maxAcceleration) {
      obj.userData.acceleration = direction * obj.userData.maxAcceleration;
    }
  }

  /**
   * Update object speed with time, factoring acceleration and drag.
   * @param {THREE.Object2D} obj
   * @param {int} delta
   */
  static updateObjectSpeed(obj, delta) {
    const acceleration = obj.userData.acceleration;
    const drag = obj.userData.drag;
    let speed = obj.userData.speed;
    const direction = acceleration !== 0 ? acceleration / Math.abs(acceleration) : speed / Math.abs(speed);

    if (acceleration === 0 && Math.abs(speed) < 0.05) {
      speed = 0;
    } else {
      speed += -speed * drag + acceleration * delta;
    }

    if (Math.abs(speed) > obj.userData.maxSpeed) {
      speed = direction * obj.userData.maxSpeed;
    }

    obj.userData = Object.assign(obj.userData, {
      speed: speed
    });
  }

  /**
   * Update object position with velocity.
   * @param {THREE.Object2D} obj
   * @param {int} delta
   */
  static updateObjectPosition(obj, delta) {
    const matrix = new Matrix4();
    const dof = obj.userData.dof.clone();

    matrix.setPosition(dof.multiplyScalar(obj.userData.speed * delta));
    obj.applyMatrix(matrix);

    this.resetIfOutOfBounds(obj);
  }

  /**
   * Update object directional rotation.
   * This changes the DOF vector position and the orientation of the object's body.
   *
   * @param {THREE.Object2D} obj
   * @param {int} delta
   */
  static updateObjectDirectionRotation(obj, delta) {
    let rotation = obj.userData.rotation;
    let direction = obj.userData.rotationDir;

    direction = obj.userData.speed > 0 ? direction : -direction;
    rotation = direction * rotation * delta;

    obj.userData.dof.applyAxisAngle(obj.userData.vuv, rotation);
    obj.rotateOnAxis(obj.userData.vuv, rotation);
  }

  /**
   * Update object rotation with tranveled distance.
   * Used for rolling objects.
   *
   * @param {THREE.Object2D} obj
   * @param {int} delta
   */
  static updateObjectRotation(obj, delta) {
    obj.rotateOnAxis(obj.userData.vuv, obj.userData.speed * delta / obj.userData.radius);
  }

  static resetIfOutOfBounds(obj) {

    // Ignore oranges for now.
    if (obj.name === 'orange') {
      return;
    }

    if (
      Math.abs(obj.position.x) > 70 ||
      Math.abs(obj.position.z) > 50
    ) {
      obj.reset();
    }
  }
}

export default Movement;
