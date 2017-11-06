import { DirectionalLight } from 'three';

class Sun extends DirectionalLight {
  constructor(hex, intensity) {
    super(hex, intensity);
    this.name = 'sun';
    this.intensity = 1;
    this.position.set(50, 60, 50);
    this.target.position.set(0, 4, 0);
  }
}

export default Sun;
