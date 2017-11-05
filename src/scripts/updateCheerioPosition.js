import { Matrix4, Vector3} from 'three';
import Movement from './Movement';

export default (delta) => {
	const track = window.game.scene.getObjectByName('track');

	track.children.forEach((cheerio) => {
    if (cheerio.userData.speed === 0) {
      return;
		}
    // console.log(cheerio);

		if (cheerio.userData.speed > 50){
			cheerio.userData.speed = 50;
		} else if (cheerio.userData.speed < 2) {
			cheerio.userData.speed = 0;
			cheerio.userData.dof = new Vector3();
    }

    Movement.updateObjectPosition(cheerio, delta);
		// cheerio.userData.speed = cheerio.userData.speed - 80*delta;
		// cheerio.position.addScaledVector(cheerio.userData.mov, cheerio.userData.speed*delta);
		cheerio.userData.boundingBox.setFromObject(cheerio);
	});
};
