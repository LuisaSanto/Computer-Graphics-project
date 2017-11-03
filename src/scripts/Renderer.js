import { WebGLRenderer } from 'three';

export default () => {
	const renderer = new WebGLRenderer({ antialias: true });

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;

  window.renderer = renderer;
}
