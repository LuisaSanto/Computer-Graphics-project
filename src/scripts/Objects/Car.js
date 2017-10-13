import {
  AxisHelper,
  BoxGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  PolyhedronGeometry,
  RingGeometry,
  Shape,
  TorusGeometry,
  Vector3
} from 'three';

/**
 * Create glass object.
 */
const createGlass = () => {
  const glassShape = new Shape();
  glassShape.moveTo(0, 0);
  glassShape.lineTo(1, 0);
  glassShape.lineTo(0, 3);

  const glassGeometry = new ExtrudeGeometry(glassShape, {
    steps: 1,
    amount: 3,
    bevelEnabled: false,
  });

  const glass = new Mesh(glassGeometry, new MeshBasicMaterial({ color: 0x0000ff, wireframe: true }));

  glass.rotateY(Math.PI);  
  glass.rotateZ(Math.PI/2);
  glass.position.set(1.5, 0, 1.5);

  return glass;
};

/**
 * Add wheel to group in specific position.
 * 
 * @param {double} x 
 * @param {double} y 
 * @param {double} z 
 */
const addWheel = (x, y, z) => {
  const wheel = new Group();
  const tireGeometry = new TorusGeometry(.75, .30, 16, 30);
  const rimGeometry = new RingGeometry(.1, .5);
  const tire = new Mesh(tireGeometry, new MeshBasicMaterial({
    color: 0x666666,
    wireframe: true,
  }));
  const rim = new Mesh(rimGeometry, new MeshBasicMaterial({
    color: 0x999999,
    wireframe: true,
    side: DoubleSide,
  }));

  rim.name = 'rim';

  wheel.add(tire, rim);
  wheel.name = 'wheel';
  wheel.position.set(x, y, z);

  return wheel;
};

/**
 * Add car body to group.
 * 
 * @param {double} x 
 * @param {double} y 
 * @param {double} z 
 */
const addBody = (x, y, z) => {
  const body = new Group();
  const frontGeometry = new BoxGeometry(3, 1, 3);
  const backGeometry = new BoxGeometry(3, 2, 3);
  
  const front = new Mesh(frontGeometry, new MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
  const back = new Mesh(backGeometry, new MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));

  // Back.
  back.name = 'back';
  back.add(
    addWheel(0, -0.5, 2.5),
    addWheel(0, -0.5, -2.5),
  );

  // Front.
  front.name = 'front';
  front.position.set(3, -.5, 0);
  front.add(
    addWheel(0, 0, 2.5),
    addWheel(0, 0, -2.5),
  );
  
  body.add(front, back, createGlass());
  body.position.set(x, y, z);
  body.rotateY(-Math.PI/2);

  return body;
};

/**
 * Create car on given position.
 * 
 * @param {double} x
 * @param {double} y
 * @param {double} z
 */
export default (position, scale = new Vector3(1, 1, 1)) => {
  const car = new Group();

  car.state = {
    acceleration: 0,
    drag: 0.1,
    speed: 0,
  };

  car.add(
    new AxisHelper(5),
    addBody(0, 0, 0)
  );
  car.name = 'car';
  car.rotateY(-Math.PI/2);
  car.position.copy(position);
  car.scale.copy(scale);

  return car;
};
