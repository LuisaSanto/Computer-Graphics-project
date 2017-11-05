import { Box3 } from 'three';

const checkCollisionBoxes = (A,B) => {
	if (
		A.max.x > B.min.x &&
		A.min.x < B.max.x &&
		A.max.y > B.min.y &&
		A.min.y < B.max.y &&
		A.max.z > B.min.z &&
		A.min.z < B.max.z
	) {
		return true;
	}
	return false;
};

export default () => {
	const car = window.game.scene.getObjectByName('car');
	const oranges = window.game.scene.getObjectByName('oranges');
	const track = window.game.scene.getObjectByName('track');
	const butters = window.game.scene.getObjectByName('butters');
	const carBox = new Box3();
	carBox.setFromObject(car);

	oranges.children.forEach(
		(orange) => {
			if (checkCollisionBoxes(orange.state.boundingBox, carBox)) {
				window.game.restart();
			}
		}
	);

	butters.children.forEach((butter) => {
		const butterInArray = car.state.collision.indexOf(butter.id);

		if (checkCollisionBoxes(butter.state.boundingBox, carBox)) {
			if (butterInArray !== -1) {
				return;
			}

			car.state.collision.push(butter.id);

			butter.state = Object.assign(butter.state, {
				reverse: car.state.reverse,
				forward: car.state.forward,
				right: car.state.right,
				left: car.state.left,
			});
		} else {
			if (butterInArray === -1) {
				return;
			}
			car.state.collision = [];
			butter.state = Object.assign(butter.state, {
				reverse: false,
				forward: false,
				right: false,
				left: false,
			});
		}
	});

	track.children.forEach((cheerio) =>{
		if (checkCollisionBoxes(cheerio.state.boundingBox, carBox)) {
			//check for false positives, use radius ??
			cheerio.state.collision.push(car.id);
		}
	});

	track.children.forEach(
		(referenceNode) =>{
			track.children.forEach(
				(trackNode) =>{
					if(referenceNode.id === trackNode.id){
						return;
					}
					if(checkCollisionBoxes(referenceNode.state.boundingBox,trackNode.state.boundingBox)){
						referenceNode.state.collision.push(trackNode.id);
					}
				}
			)
		}
	);
};
