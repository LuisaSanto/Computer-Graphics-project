import { Box3, Matrix4, Vector3 } from 'three';
import Movement from './Movement';

/**
 * Regenerate oranges that leave the table bounds.
 *
 * @param {THREE.Object3D} orange
 */
const respawnOrange = (orange) => {
    // Reset rotation.
    orange.setRotationFromAxisAngle(orange.userData.vuv, 0);

    // Orange spawn limits.
    const safe_x = window.game.state.table.width;
    const safe_z = window.game.state.table.height;

    orange.position.set(
        Math.random() * safe_x - safe_x/2,
        3,
        Math.random() * safe_z - safe_z/2
    );
    orange.scale.copy(new Vector3(1, 1, 1));

    const baseSpeed = 5 * (1 + Math.floor(window.game.clock.getElapsedTime() / 30));
    const directionVector = new Vector3(0.5 - Math.random(), 0, 0.5 - Math.random()).normalize();
    const rotationVector = new Vector3(directionVector.z, 0, -directionVector.x);

    orange.userData = Object.assign(orange.userData, {
        boundingBox: new Box3().setFromObject(orange),
        speed: baseSpeed * (1 + Math.random() * 0.2),
        dof: directionVector,
        vuv: rotationVector,
        spawnDelay: 2 * Math.random(),
        hasFallen: false,
    });
};

/**
 * Move the orange on the table.
 *
 * @param {THREE.Object3D} orange
 */
const moveOrange = (orange, delta) => {
    const horizontalLimit = window.game.state.table.width / 2 + orange.geometry.parameters.radius;
    const verticalLimit = window.game.state.table.height / 2 + orange.geometry.parameters.radius;

    if (
        Math.abs(orange.position.x) > horizontalLimit ||
        Math.abs(orange.position.z) > verticalLimit
    ) {
        const emptyVector = new Vector3(0.0001, 0.0001, 0.0001);
        orange.userData.hasFallen = true;
        orange.userData.spawnDelay -= delta;

        if (orange.userData.spawnDelay < 0) {
            respawnOrange(orange);
        } else if (!orange.scale.equals(emptyVector)) {
            orange.scale.addScalar(-2*delta);
            orange.scale.max(emptyVector);
        }

        return;
    }

    const distance = orange.userData.speed * delta;

    Movement.updateObjectPosition(orange, delta);
    Movement.updateObjectRotation(orange, delta);
    orange.userData.boundingBox.setFromObject(orange);
};

export default (delta) => {
    const oranges = window.game.scene.getObjectByName('oranges');

    oranges.children.forEach((orange) => {
        moveOrange(orange, delta);
    });
};
