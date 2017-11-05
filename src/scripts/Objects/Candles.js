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
      this.add(light,this.lantern(position));
    });
  }

    lantern(position){

    var shape = new Shape();
    shape.moveTo(2, 0);
    shape.bezierCurveTo(4, 0, 5, 3, 4, 4);
    shape.bezierCurveTo(6, 4, 7, 5, 6, 8);
    shape.bezierCurveTo(7, 5, 7, 12, 4, 12);
    shape.bezierCurveTo(7, 9, 6, 16, 4, 16);
    shape.bezierCurveTo(5, 17, 4, 20, 2, 20);
    shape.lineTo(0.2, 16);
    shape.lineTo(0.2, 500);


    var geometry = new LatheGeometry( shape.extractPoints(5).shape,14);
    var BasicMaterial = new MeshBasicMaterial( { color: 0xff0000, wireframe: true, side:2} );
    var LambertMaterial = new MeshLambertMaterial( { color: 0xff0000, wireframe: true, side:2} );
    var PhongMaterial = new MeshPhongMaterial( { color: 0xff0000, wireframe: true, side:2} );
    var mesh = new Mesh( geometry, PhongMaterial );

    mesh.state = {
      phongMaterial: PhongMaterial, 
      lambertMaterial: LambertMaterial,
      basicMaterial: BasicMaterial,
    }

    mesh.position.copy(position);
    mesh.scale.copy(new Vector3(0.3,0.3,0.3));
    mesh.name = "lantern";
    return mesh;
  }
}

export default Candles;
