import { Box3, Vector3 } from 'three';

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
    // butter.state.boundingBox = new Box3().setFromObject(butter);
		const butterInArray = car.userData.collision.indexOf(butter.id);

		if (checkCollisionBoxes(butter.userData.boundingBox, carBox)) {
			if (butterInArray !== -1) {
				return;
			}

			car.userData.collision.push(butter.id);

			butter.userData = Object.assign(butter.userData, {
				dof: car.userData.dof,
				isRotating: car.userData.isRotating,
				rotationDir: car.userData.rotationDir,
			});
		} else {
			if (butterInArray === -1) {
				return;
			}
			car.userData.collision = [];
			butter.userData = Object.assign(butter.userData, {
				dof: new Vector3(),
				isRotating: false,
				rotationDir: 0,
			});
		}
	});

	track.children.forEach((cheerio) =>{
		if (checkCollisionBoxes(cheerio.userData.boundingBox, carBox)) {
			cheerio.userData.collision.push(car.id);
		}
	});

	track.children.forEach(
		(referenceNode) =>{
			track.children.forEach(
				(trackNode) =>{
					if (referenceNode.id === trackNode.id) {
						return;
					}
					if (checkCollisionBoxes(referenceNode.userData.boundingBox,trackNode.userData.boundingBox)) {
            referenceNode.userData.collision.push(trackNode.id);
					}
				}
			)
		}
	);
};
