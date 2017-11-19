import { Vector3 } from 'three';

const carCollision = (car) => {
	car.userData.collision.forEach((target) => {
		target = window.game.scene.getObjectById(target);
		if (
			target.userData.dof.equals(car.userData.dof) &&
			target.userData.isRotating === car.userData.isRotating &&
			target.userData.rotationDir === car.userData.rotationDir
		) {
      car.userData.isStuck = true;
      car.userData.speed = 0;
		} else {
			car.userData.isStuck = false;
		}
	});
};

const cheerioCollision = (reference) => {
	reference.userData.collision.forEach((targetId) => {
		const target = window.game.scene.getObjectById(targetId);
		const referenceOldMovement = new Vector3();
    let targetOldMovement = new Vector3();

		referenceOldMovement.copy(reference.userData.dof);
    targetOldMovement = target.userData.dof;

		const referenceOldVelocity = Math.abs(reference.userData.speed);
		const collisionVector = new Vector3();
		let collisionPartial;

		// Target to reference velocity exchange.
		collisionVector.copy(reference.position);
		collisionVector.sub(target.position);
		collisionVector.normalize();
		collisionPartial = Math.abs(collisionVector.dot(targetOldMovement));

		reference.userData.dof.add(collisionVector);
		reference.userData.dof.y = 0;
    reference.userData.dof.normalize();
		reference.userData.speed += Math.abs(target.userData.speed * collisionPartial);

		if (reference.userData.speed < 2) {
			reference.userData.speed = 5;
		}

		if (target.name === 'car') {
			return;
    }

		// Reference to target velocity exchange.
		collisionVector.copy(target.position);
		collisionVector.sub(reference.position);
		collisionVector.normalize();
		collisionPartial = Math.abs(collisionVector.dot(referenceOldMovement));

		target.userData.dof.add(collisionVector);
		target.userData.dof.y = 0;
		target.userData.dof.normalize();
		target.userData.speed += Math.abs(referenceOldVelocity * collisionPartial);

		//cheerio on cheerio, reduce speed
		reference.userData.speed = reference.userData.speed * 0.8;

		if (target.userData.speed < 2) {
			target.userData.speed = 0;
		}
		target.userData.speed = target.userData.speed * 0.8;
	});

	reference.userData.collision = [];
};

export default () => {
	window.game.scene.traverse((reference) => {
		switch (reference.name) {
			case 'cheerio':
				cheerioCollision(reference);
				break;
			case 'car':
				carCollision(reference);
				break;
		}
	});
}
