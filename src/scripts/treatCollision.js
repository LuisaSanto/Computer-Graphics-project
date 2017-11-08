import { Vector3 } from 'three';

const carCollision = (car) => {
	car.state.collision.forEach((target) => {
		target = window.game.scene.getObjectById(target);
		if (
			target.state.forward === car.state.forward &&
			target.state.reverse === car.state.reverse &&
			target.state.left === car.state.left &&
			target.state.right === car.state.right
		) {
			car.state.isStuck = true;
		} else {
			car.state.isStuck = false;
		}
	});
};

const cheerioCollision = (reference) => {
	reference.state.collision.forEach((targetId) => {
		const target = window.game.scene.getObjectById(targetId);
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


		if(reference.state.speed < 2){
			reference.state.speed = 5;
		}

		if (target.name === 'car') {
			reference.state.speed = reference.state.speed*0.9;
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
		reference.state.speed = reference.state.speed*0.8;

		if(target.state.speed < 2){
			target.state.speed = 0;
		}
		target.state.speed = target.state.speed*0.8;
	});

	reference.state.collision = [];
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
