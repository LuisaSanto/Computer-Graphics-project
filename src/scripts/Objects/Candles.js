import {
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  LatheGeometry,
  PointLight,
  Shape,
  Vector3
} from 'three';

class Candles extends Group {
  constructor(positions) {
    super();
    this.name = 'candles';

    positions.forEach((position) => {
      const light = new PointLight(0xffffff, 2, 60, 2);
      light.position.copy(position);
      this.add(light, this.lantern(position));
    });
  }

  lantern(position) {
    const shape = new Shape();
    shape.moveTo(2, 0);
    shape.bezierCurveTo(4, 0, 5, 3, 4, 4);
    shape.bezierCurveTo(6, 4, 7, 5, 6, 8);
    shape.bezierCurveTo(7, 5, 7, 12, 4, 12);
    shape.bezierCurveTo(7, 9, 6, 16, 4, 16);
    shape.bezierCurveTo(5, 17, 4, 20, 2, 20);
    shape.lineTo(0.2, 16);
    shape.lineTo(0.2, 500);


    const geometry = new LatheGeometry( shape.extractPoints(5).shape,14);
    const materialArgs = {
      color: 0xff0000,
      wireframe: window.game.state.wireframe,
      side: 2,
    };
    const mesh = new Mesh(geometry, [
      new MeshBasicMaterial(materialArgs),
      new MeshLambertMaterial(materialArgs),
      new MeshPhongMaterial(materialArgs),
    ]);

    mesh.position.copy(position);
    mesh.scale.copy(new Vector3(0.3,0.3,0.3));
    return mesh;
  }
}

export default Candles;
