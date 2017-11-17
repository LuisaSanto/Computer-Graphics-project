import {
	SpotLight,
} from 'three';

export default (x, y ,z) => {
	var spotLight = new SpotLight(0xffffff, 1, 100, Math.PI/2, 0.9, 2);
	spotLight.position.set(x, y, z);
	return spotLight;
}