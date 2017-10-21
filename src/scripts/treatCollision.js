import { Vector3 } from 'three';

const carCollision = (car) => {
	car.state.collision.forEach((target) => {
		target = window.scene.getObjectById(target);
		console.log(target.state.forward);
		console.log(car.state.forward);
		if (
			target.state.forward === car.state.forward &&
			target.state.reverse === car.state.reverse &&
			target.state.left === car.state.left &&
			target.state.right === car.state.right
		) {
			console.log('is stuck');
			car.state.isStuck = true;
		} else {
			car.state.isStuck = false;
		}
	});
};

const cheerioCollision = (reference) => {
	reference.state.collision.forEach((targetId) => {
		const target = window.scene.getObjectById(targetId);
		const referenceOldMovement = new Vector3();
		let targetOldMovement = new Vector3();

		referenceOldMovement.copy(reference.state.mov);

		if (target.name === 'car') {
			targetOldMovement = target.getWorldDirection();
		} else {
			targetOldMovement = target.state.mov;
		}

		const referenceOldVelocity = Math.abs(reference.state.speed);

		const collisionVector = new Vector3();

		let collisionPartial;

		//target to reference velocity exchange
		collisionVector.copy(reference.position);
		collisionVector.sub(target.position);
		collisionVector.normalize();
		collisionPartial = Math.abs(collisionVector.dot(targetOldMovement));

		reference.state.mov.add(collisionVector);
		reference.state.mov.y = 0;
		reference.state.mov.normalize();
		reference.state.speed += Math.abs(target.state.speed * collisionPartial);

		if (target.name === 'car') {
			return;
		}
		// Reference to target velocity exchange.
		collisionVector.copy(target.position);
		collisionVector.sub(reference.position);
		collisionVector.normalize();
		collisionPartial = Math.abs(collisionVector.dot(referenceOldMovement));

		target.state.mov.add(collisionVector);
		target.state.mov.y = 0;
		target.state.mov.normalize();
		target.state.speed += Math.abs(referenceOldVelocity * collisionPartial);

		//cheerio on cheerio, reduce speed
		reference.state.speed = reference.state.speed *(1-0.3);
		target.state.speed = target.state.speed * (1-0.3);
	});

	reference.state.collision = [];
};

export default () => {
	window.scene.traverse((reference) => {
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