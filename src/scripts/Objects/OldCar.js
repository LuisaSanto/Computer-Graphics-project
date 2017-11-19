import {
  AxisHelper,
  BoxGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  PolyhedronGeometry,
  RingGeometry,
  Shape,
  TorusGeometry,
  Vector3
} from 'three';

class OldCar extends Group {
  constructor(wireframe) {
    super();
    this.wireframe = wireframe;
    this.add(
      this.addBody()
    );
    this.name = 'mode';
    this.rotateY(-Math.PI/2);
  }

  /**
   * Create glass object.
   */
  createGlass() {
    const glassShape = new Shape();
    glassShape.moveTo(0, 0);
    glassShape.lineTo(1, 0);
    glassShape.lineTo(0, 3);

    const glassGeometry = new ExtrudeGeometry(glassShape, {
      steps: 1,
      amount: 3,
      bevelEnabled: false,
    });

    const glass = new Mesh(glassGeometry, new MeshLambertMaterial({ color: 0x0000ff, wireframe: true }));

    glass.rotateY(Math.PI);
    glass.rotateZ(Math.PI/2);
    glass.position.set(1.5, 0, 1.5);

    return glass;
  }

  /**
   * Add wheel to group in specific position.
   *
   * @param {double} x
   * @param {double} y
   * @param {double} z
   */
  addWheel(x, y, z) {
    const wheel = new Group();
    const tireGeometry = new TorusGeometry(.75, .30, 5, 10);
    const rimGeometry = new RingGeometry(.1, .5);
    const tire = new Mesh(tireGeometry, new MeshLambertMaterial({
      color: 0x666666,
      wireframe: true,
    }));
    const rim = new Mesh(rimGeometry, new MeshLambertMaterial({
      color: 0x999999,
      wireframe: true,
      side: DoubleSide,
    }));

    rim.name = 'rim';

    wheel.add(tire, rim);
    wheel.name = 'wheel';
    wheel.position.set(x, y, z);

    return wheel;
  }

  /**
   * Add car body to group.
   *
   * @param {double} x
   * @param {double} y
   * @param {double} z
   */
  addBody() {
    const body = new Group();
    const frontGeometry = new BoxGeometry(3, 1, 3, 5, 5, 5);
    const backGeometry = new BoxGeometry(3, 2, 3, 5, 5, 5);

    const front = new Mesh(frontGeometry, new MeshLambertMaterial({ color: 0x00ff00, wireframe: true }));
    const back = new Mesh(backGeometry, new MeshLambertMaterial({ color: 0x00ff00, wireframe: true }));

    // Back.
    back.name = 'back';
    back.add(
      this.addWheel(0, -0.5, 2.5),
      this.addWheel(0, -0.5, -2.5),
    );

    // Front.
    front.name = 'front';
    front.position.set(3, -.5, 0);
    front.add(
      this.addWheel(0, 0, 2.5),
      this.addWheel(0, 0, -2.5),
    );

    body.add(front, back, this.createGlass());
    body.rotateY(-Math.PI/2);

    return body;
  }
}

export default OldCar;
