import { Matrix4, Vector3} from 'three';
import Movement from './Movement';

export default (delta) => {
	const track = window.game.scene.getObjectByName('track');

	track.children.forEach((cheerio) => {
    if (cheerio.userData.speed === 0) {
      return;
		}

		if (cheerio.userData.speed > 30){
			cheerio.userData.speed = 30;
		} else if (cheerio.userData.speed < 2) {
			cheerio.userData.speed = 0;
			cheerio.userData.dof = new Vector3();
    }

    Movement.updateObjectSpeed(cheerio, delta);
    Movement.updateObjectPosition(cheerio, delta);
		cheerio.userData.boundingBox.setFromObject(cheerio);
	});
};
