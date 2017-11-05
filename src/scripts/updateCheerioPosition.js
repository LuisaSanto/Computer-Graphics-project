import { Matrix4, Vector3} from 'three';

export default (delta) => {
	const track = window.game.scene.getObjectByName('track');

	track.children.forEach((cheerio) => {
		if (cheerio.state.speed === 0) {
			return;
		}

		if (cheerio.state.speed > 50){
			cheerio.state.speed = 50;
		}

		else if (cheerio.state.speed < 2) {
			cheerio.state.speed = 0;
			cheerio.state.mov = new Vector3();
		}

		cheerio.state.speed = cheerio.state.speed- 80*delta;
		cheerio.position.addScaledVector(cheerio.state.mov, cheerio.state.speed*delta);
		cheerio.state.boundingBox.setFromObject(cheerio);
	});
};
