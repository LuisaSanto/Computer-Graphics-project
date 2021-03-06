import { Matrix4, Vector3 } from 'three';
import Movement from './Movement';

/**
 * Update car related movements.
 */
export default (delta) => {
  const car = window.game.scene.getObjectByName('car');

  // Update speed and position.
  if ((car.userData.acceleration !== 0 || car.userData.speed !== 0) && ! car.userData.isStuck) {
      Movement.updateObjectAcceleration(car, delta);
      Movement.updateObjectSpeed(car, delta);
      Movement.updateObjectPosition(car, delta);
  }

  // Update car orientation when either left or right keys are pressed.
  if (car.userData.isRotating && car.userData.speed !== 0) {
    Movement.updateObjectDirectionRotation(car, delta);
  }
};
