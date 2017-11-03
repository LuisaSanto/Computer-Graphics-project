import { Matrix4, Vector3 } from 'three';

/**
 * Update de car's Speed.
 *
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateSpeed = (car, delta) => {

  // Checked if there are collisions with butters.
  if (car.state.isStuck && car.state.collision.length !== 0){
    car.state.speed = 0;
    return;
  }

  if (car.state.forward && car.state.acceleration <= 50) {
    car.state.acceleration += 10;
  } else if(car.state.reverse && car.state.acceleration >= -50) {
    car.state.acceleration -= 25;
  } else {
    car.state.acceleration = 0;
  }

  // Width drag effect.
  car.state.speed = car.state.speed * 0.99 + car.state.acceleration * delta;

  // Make full stop, if differance is marginal to zero speed.
  if (!car.state.forward && !car.state.reverse && Math.abs(car.state.speed) < 0.05) {
    car.state.speed = 0;
    car.state.mov = new Vector3(1,0,0);
  }

  // If reversed, change movement vector
  if (car.state.reverse) {
    car.state.mov = new Vector3(-1,0,0);
  }

  // Maximize the speed.
  const speedDirection = car.state.speed / Math.abs(car.state.speed);
  if (Math.abs(car.state.speed) > 50) {
    car.state.speed = speedDirection * 50;
  }
};

/**
 * Update the car's position due to its speed.
 *
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateSpeedPosition = (car, delta) => {
  const matrix = new Matrix4();

  matrix.setPosition(car.getWorldDirection().multiplyScalar(car.state.speed * delta));
  car.applyMatrix(matrix);

  if (
    Math.abs(car.position.x) > 70 ||
    Math.abs(car.position.z) > 50
  ) {
    window.game.restart();
  }

  // Rotate wheels to match speed.
  rotateWheels(car, delta);
};

/**
 * Update the car's position due to its rotation.
 *
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateRotationPosition = (car, delta) => {
  const direction = car.state.left ? 1 : -1;
  const mirror = car.state.speed < 0 ? -1 : 1;
  const rotation = car.state.speed === 0 ? 0 : 2.5;
  car.rotateY(mirror * direction * rotation * delta);

  // Turn wheels to match rotation.
  if (
    (car.state.left && !car.state.turningLeft) ||
    (car.state.right && !car.state.turningRight)
  ) {
    turnWheels(car.getObjectByName('front').children, direction);
    car.state.turningLeft = car.state.left;
    car.state.turningRight = car.state.right;
  }
};

/**
 * Turn wheels on Y axis to match turning.
 *
 * @param {array} wheels
 * @param {int} direction
 */
const turnWheels = (wheels, direction) => {
  wheels.forEach((wheel) => {
    wheel.setRotationFromAxisAngle(new Vector3(0,1,0), direction * 0.5);
  });
};

/**
 * Turn wheels on X axis.
 *
 * @param {THREE.Group} car
 * @param {double} delta
 */
const rotateWheels = (car, delta) => {
  const rotation = -car.state.speed * delta / 2;
  car.traverse((node) => {
    if (node.name !== 'wheel') {
      return;
    }
    node.rotateZ(rotation);
  });
};

/**
 * Update car related movements.
 */
export default (delta) => {
  const car = window.game.scene.getObjectByName('car');

  // Update speed and position.
  if (car.state.forward || car.state.reverse || car.state.speed !== 0) {
      updateSpeed(car, delta);
      updateSpeedPosition(car, delta);
  }

  // Update car orientation when either left or right keys are pressed.
  if (car.state.left || car.state.right) {
    updateRotationPosition(car, delta);
  }

  // Remove front wheel Y rotation when the car is not turning.
  if (!car.state.left && !car.state.right && (car.state.turningLeft || car.state.turningRight)) {
    turnWheels(car.getObjectByName('front').children, 0);
    car.state.turningLeft = false;
    car.state.turningRight = false;
  }
};
