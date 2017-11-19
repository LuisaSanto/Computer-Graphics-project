import { WebGLRenderer } from 'three';

class Renderer extends WebGLRenderer {
  constructor() {
    super();
    this.autoClear = false;
    this.setSize(window.innerWidth, window.innerHeight);
  }
}

export default Renderer;
