import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  PointLight,
  Sprite,
  SpriteMaterial
} from 'three';

class Candles extends Group {
  constructor(positions) {
    super();
    this.name = 'candles';

    positions.forEach((position) => {
      const light = new PointLight(0xffffff, 2, 60, 2);
      light.position.copy(position);
      this.add(light);
    });
  }
}

export default Candles;
