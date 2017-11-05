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
			if (checkCollisionBoxes(orange.userData.boundingBox, carBox)) {
				window.game.restart();
			}
		}
	);

	butters.children.forEach((butter) => {
		const butterInArray = car.userData.collision.indexOf(butter.id);

		if (checkCollisionBoxes(butter.userData.boundingBox, carBox)) {
			if (butterInArray !== -1) {
				return;
			}

			car.userData.collision.push(butter.id);

			butter.userData = Object.assign(butter.userData, {
				reverse: car.userData.reverse,
				forward: car.userData.forward,
				right: car.userData.right,
				left: car.userData.left,
			});
		} else {
			if (butterInArray === -1) {
				return;
			}
			car.userData.collision = [];
			butter.userData = Object.assign(butter.userData, {
				reverse: false,
				forward: false,
				right: false,
				left: false,
			});
		}
	});

	track.children.forEach((cheerio) =>{
		if (checkCollisionBoxes(cheerio.userData.boundingBox, carBox)) {
			//check for false positives, use radius ??
			cheerio.userData.collision.push(car.id);console.log(cheerio);
		}
	});

	track.children.forEach(
		(referenceNode) =>{
			track.children.forEach(
				(trackNode) =>{
					if(referenceNode.id === trackNode.id){
						return;
					}
					if(checkCollisionBoxes(referenceNode.userData.boundingBox,trackNode.userData.boundingBox)){
            referenceNode.userData.collision.push(trackNode.id);
            console.log(reference);
					}
				}
			)
		}
	);
};
