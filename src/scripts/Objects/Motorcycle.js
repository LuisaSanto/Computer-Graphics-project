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
  TorusGeometry,
  Vector3,
  LatheGeometry
} from 'three';

class Motorcycle extends Group {
  constructor(wireframe) {
    super();
    this.wireframe = wireframe;
    this.add(
      this.body(),
      this.wheels()
    );
    this.name = 'mode';
    this.rotateY(Math.PI);
    this.scale.copy(new Vector3(.4, .4, .4));
  }

  body() {
    const shape = new Shape();
    shape.moveTo(1, 0);
    shape.lineTo(5, 3);
    shape.lineTo(2, 6);
    shape.lineTo(1, 4);
    shape.lineTo(-7, 4);
    shape.lineTo(-6, 3);
    shape.lineTo(-4, 3);
    shape.lineTo(-2, 0);
    shape.lineTo(1, 0);

    const extrudeSettings = {
      steps: 2,
      amount: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const body = new Mesh( geometry, material );
    body.position.set(0, 0, -1);

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

export default Motorcycle;
