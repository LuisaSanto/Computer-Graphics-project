import {
  AxisHelper,
  BoxGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PolyhedronGeometry,
  RingGeometry,
  Shape,
  Geometry,
  TorusGeometry,
  Vector3,
  Face3,
  LatheGeometry
} from 'three';

class PoliceCar extends Group {
  constructor(position = new Vector3()) {
    super();
    this.add(
      this.body()
    );
    this.name = 'mode';
    this.position.copy(position);
  }

  body() {
    const geometry = new Geometry();
    geometry.vertices.push(
      // Right
      new Vector3(3.5, 1, 3),
      new Vector3(4, 3, 3),
      new Vector3(2, 3, 3),
      new Vector3(1.5, 5, 3),
      new Vector3(-1.5, 5, 3),
      new Vector3(-3, 3, 3),
      new Vector3(-5, 2, 3),
      new Vector3(-5, 1, 3),
      new Vector3(-3, 1, 3),
      new Vector3(2, 1, 3),
      // Left
      new Vector3(3.5, 1, -3),
      new Vector3(4, 3, -3),
      new Vector3(2, 3, -3),
      new Vector3(1.5, 5, -3),
      new Vector3(-1.5, 5, -3),
      new Vector3(-3, 3, -3),
      new Vector3(-5, 2, -3),
      new Vector3(-5, 1, -3),
      new Vector3(-3, 1, -3),
      new Vector3(2, 1, -3),
    );
    geometry.faces.push(
      // Right
      new Face3(0, 1, 2),
      new Face3(0, 2, 9),
      new Face3(2, 3, 4),
      new Face3(2, 4, 5),
      new Face3(5, 6, 7),
      new Face3(5, 7, 8),
      new Face3(5, 8, 9),
      new Face3(2, 5, 9),
      // Left
      new Face3(10, 12, 11),
      new Face3(10, 19, 12),
      new Face3(12, 14, 13),
      new Face3(12, 15, 14),
      new Face3(15, 17, 16),
      new Face3(15, 18, 17),
      new Face3(15, 19, 18),
      new Face3(12, 19, 15),
      // Front, Top, Back, Bottom
      new Face3(0, 10, 1),
      new Face3(1, 10, 11),
      new Face3(1, 11, 2),
      new Face3(2, 11, 12),
      new Face3(2, 12, 3),
      new Face3(3, 12, 13),
      new Face3(3, 13, 4),
      new Face3(4, 13, 14),
      new Face3(4, 14, 5),
      new Face3(5, 14, 15),
      new Face3(5, 15, 6),
      new Face3(6, 15, 16),
      new Face3(6, 16, 7),
      new Face3(7, 16, 17),
      new Face3(0, 10, 7),
      new Face3(7, 10, 17)
    );
    const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const body = new Mesh( geometry, material );

    return body;
  }

  wheels() {
    const wheels = new Group();
    wheels.name = 'wheels';

    const shape = new Shape();
    shape.moveTo(.5, 0);
    shape.lineTo(1, 0);
    shape.bezierCurveTo(2.5, 0, 2.5, 4, 1, 4);
    shape.lineTo(.5, 4);
    shape.lineTo(.5, 0);

    const geometry = new LatheGeometry(shape.extractPoints().shape);
    const material = new MeshBasicMaterial({ color: 0x333333, wireframe: true });
    const wheel = new Mesh( geometry, material );

    wheel.rotateX(Math.PI/2);

    const wheelFront = wheel.clone();
    wheelFront.position.set(6, 0, -2);
    const wheelBack = wheel.clone();
    wheelBack.material = material.clone();
    wheelBack.position.set(-6, 0, -2);

    wheels.add(
      wheelFront,
      wheelBack
    );

    return wheels;
  }
}

export default PoliceCar;
