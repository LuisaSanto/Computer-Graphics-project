import {
  AxisHelper,
  BoxGeometry,
  LatheGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshBasicMaterial,
  Vector3,
  CylinderGeometry,
  Shape,
  SphereGeometry,
  CurvePath,
  CubicBezierCurve3,
  ExtrudeGeometry,
  Geometry
} from 'three';

const addBody = () => {
  var body = new Group();
  var shape = new Shape();
  shape.moveTo(0,1);
  shape.bezierCurveTo(3, 1, 4, 3, 4 ,5);
  shape.bezierCurveTo(4, 11, 3, 17, 2, 19);
  shape.bezierCurveTo(2, 20, 1, 21, 0, 21);

  var geometry = new LatheGeometry( shape.extractPoints(10).shape);
  var materialArgs = {
    color: 0xcc5300,
    wireframe: window.game.state.wireframe,
  };
  var mesh = new Mesh(geometry, [
    new MeshBasicMaterial( materialArgs ),
    new MeshLambertMaterial( materialArgs ),
    new MeshPhongMaterial( materialArgs ),
  ]) ;

  body.add(mesh);
  body.position.set(0,2,0);
  body.rotateZ(Math.PI/2);
  body.scale.copy(new Vector3(0.4,0.4,0.4));
  body.rotateX(Math.PI/2);

  return body;
}

const wheelMesh = (scale) => {
  var rectangle = new Shape();
  rectangle.moveTo(1,0);
  rectangle.lineTo(3,0);
  rectangle.lineTo(3,3);
  rectangle.lineTo(1,3);
  rectangle.lineTo(1,0);

  var geometry = new LatheGeometry( rectangle.extractPoints(10).shape,20);
  var mesh = new Mesh(geometry, [
    new MeshBasicMaterial( { color: 0x444444, wireframe: window.game.state.wireframe } ),
    new MeshLambertMaterial( { color: 0x444444, wireframe: window.game.state.wireframe } ),
    new MeshPhongMaterial( { color: 0x444444, wireframe: window.game.state.wireframe, shininess: 10 } ),
  ]) ;
  mesh.rotateX(Math.PI/2);
  mesh.scale.copy(scale);

  return mesh;
}

const addWheels = () => {
  var Wheels = new Group();
  var frontRightWheel = new Group();
  var frontLeftWheel = new Group();
  var backRightWheel = new Group();
  var backLeftWheel = new Group();
  var front = new Group();

  frontRightWheel.add(wheelMesh(new Vector3(0.3, 0.2, 0.3)));
  frontRightWheel.position.set(-6, 1.9, -2);
  frontRightWheel.name = "wheel";

  frontLeftWheel.add(wheelMesh(new Vector3(0.3, 0.2, 0.3)));
  frontLeftWheel.position.set(-6, 1.9, 1.5);
  frontLeftWheel.name = "wheel";

  front.add(frontRightWheel,frontLeftWheel);
  front.name = 'front';

  backLeftWheel.add(wheelMesh(new Vector3(0.4, 0.4, 0.4)));
  backLeftWheel.position.set(-2, 2.2, 1.8);
  backRightWheel.name = "wheel";

  backRightWheel.add(wheelMesh(new Vector3(0.4, 0.4, 0.4)));
  backRightWheel.position.set(-2, 2.2, -3);
  backLeftWheel.name = "wheel";

  Wheels.add(front, backLeftWheel, backRightWheel);
  Wheels.rotateY(Math.PI/2);
  return Wheels;
}

const addWheelAxis = () => {
  const WheelAxis = new Group();
  var geometry1 = new CylinderGeometry(0.2, 0.2, 3.5, 10);
  var materialArgs = {
    color: 0x222222,
    wireframe: window.game.state.wireframe,
  };
  var mesh1 = new Mesh(geometry1, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]) ;

  var geometry2 = new CylinderGeometry(0.3, 0.3, 5.5, 10);
  var mesh2 = new Mesh(geometry2, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]) ;

  mesh1.rotateX(Math.PI/2);
  mesh1.position.set(-6, 1.9, 0);

  mesh2.rotateX(Math.PI/2);
  mesh2.position.set(-2, 2.2, 0);

  WheelAxis.add(mesh1, mesh2);
  WheelAxis.rotateY(Math.PI/2);
  return WheelAxis;
}

const addWindowDome = () => {
  const windowDome = new Group();
  var geometry = new SphereGeometry(1, 10, 10, 0, Math.PI);
  var mesh = new Mesh(geometry, [
    new MeshBasicMaterial( { color: 0xacacff, wireframe: window.game.state.wireframe } ),
    new MeshLambertMaterial( { color: 0xacacff, wireframe: window.game.state.wireframe } ),
    new MeshPhongMaterial( { color: 0xacacff, wireframe: window.game.state.wireframe, shininess: 100 } ),
  ]) ;

  mesh.position.set(-3,3.1,0);
  mesh.rotateX(-Math.PI/2);
  windowDome.add(mesh);
  windowDome.rotateY(Math.PI/2);

  return windowDome;
}

const addTeeth = () => {
  const teeth = new Group();
  var geometry4 = new BoxGeometry(0.1, 0.5, 0.4, 3, 3);
  var materialArgs = {
    color: 0xeeeeee,
    wireframe: window.game.state.wireframe,
  };
  var mesh4 = new Mesh(geometry4, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);
  mesh4.position.set(-8.15, 1.5, -0.25);

  var geometry5 = new BoxGeometry(0.1, 0.5, 0.4, 3, 3);
  var mesh5 = new Mesh(geometry1, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);
  mesh5.position.set(-8.15, 1.5, 0.25);

  teeth.add(mesh4,mesh5);
  return teeth;
}

const addHeadLight = (x, y, z) => {
  var headLight = new Group();
  var shape1 = new Shape();
  shape1.moveTo(0,0);
  shape1.bezierCurveTo(1.5, 0.5, 2, 2, 2, 4);

  var materialArgs = {
    color: 0xff5300,
    wireframe: window.game.state.wireframe,
  };
  var geometry1 = new LatheGeometry(shape1.extractPoints(5).shape);
  var mesh1 = new Mesh(geometry1, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);

  mesh1.position.set(x, y, z);
  mesh1.rotateZ(Math.PI/2);
  mesh1.scale.copy(new Vector3(0.15,0.15,0.15));
  mesh1.rotateX(-Math.PI/64);

  var shape2 = new Shape();
  shape2.moveTo(2,4);
  shape2.bezierCurveTo(1.5, 4.5, 0.5, 4.5, 0, 4);

  materialArgs = {
    color: 0xffffff,
    wireframe: window.game.state.wireframe,
  };
  var geometry2 = new LatheGeometry(shape2.extractPoints(5).shape);
  var mesh2 = new Mesh(geometry2, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);
  mesh2.position.set(x, y, z);
  mesh2.rotateZ(Math.PI/2);
  mesh2.scale.copy(new Vector3(0.15,0.15,0.15));
  mesh2.rotateX(-Math.PI/64);

  headLight.add(mesh1,mesh2);
  headLight.rotateY(Math.PI/2);

  return headLight;
}

const addHeadLights = () => {
  var headLights = new Group();
  headLights.add(addHeadLight(-7.5, 2.5, -0.6),addHeadLight(-7.5, 2.5, 0.65));
  return headLights;
}

const addExhaustPipe = (side) => {
  var shape = new Shape();
  shape.moveTo(1,0);
  shape.bezierCurveTo(1.5, 0, 2, 0.5, 2, 1);
  shape.bezierCurveTo(2, 1.5, 1.5, 2, 1, 2);
  shape.bezierCurveTo(0.5, 2, 0, 1.5, 0, 1);
  shape.bezierCurveTo(0, 0.5, 0.5, 0, 1 ,0);

  var path = new CurvePath();
    path.add( new CubicBezierCurve3(  new Vector3(0, 0, 0),
                                      new Vector3(0, 0.5, 0),
                                      new Vector3(0.5, 0.5, 0),
                                      new Vector3(1, 1, 0)));
    path.add( new CubicBezierCurve3(  new Vector3(1, 1, 0),
                                      new Vector3(2, 1, 0),
                                      new Vector3(3, 1, 0),
                                      new Vector3(12, 1, 0)));
    path.add( new CubicBezierCurve3(  new Vector3(12, 1, 0),
                                      new Vector3(12.5, 0.75, 0.5),
                                      new Vector3(13, 0.75, 1.5),
                                      new Vector3(13, 0.5, 2)));
    path.add( new CubicBezierCurve3(  new Vector3(13, 0.5, 2),
                                      new Vector3(13, -1.625, 4),
                                      new Vector3(13, -4.875, 6),
                                      new Vector3(13, -8, 6)));
    path.add( new CubicBezierCurve3(  new Vector3(13, -8, 6),
                                      new Vector3(13, -9, 6),
                                      new Vector3(14, -10, 6),
                                      new Vector3(15, -10, 6)));
    path.add( new CubicBezierCurve3(  new Vector3(15, -10, 6),
                                      new Vector3(16, -10, 6),
                                      new Vector3(17, -10, 7),
                                      new Vector3(17, -10, 8)));

  var extrudeSettings = {
    curveSegments:3,
    steps: 40,
    amount: 100,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1,
    extrudePath: path
  };

  var geometry = new ExtrudeGeometry( shape, extrudeSettings );
  if (side === -1) {
    var tmpGeo = new Geometry().copy(geometry);
    for (var i = 0; i < tmpGeo.vertices.length; i++) {
      tmpGeo.vertices[i].z *= -1;
    }
    geometry = tmpGeo;
  }

  var materialArgs = {
    color: 0xffd700,
    wireframe: window.game.state.wireframe,
    side: 2
  };
  var mesh = new Mesh(geometry, new MeshBasicMaterial(materialArgs));

  mesh.state = {
    materials: [
      new MeshBasicMaterial(materialArgs),
      new MeshLambertMaterial(materialArgs),
      new MeshPhongMaterial(Object.assign(materialArgs, { shininess: 100 })),
    ],
  };
  mesh.geometry.computeVertexNormals();
  mesh.geometry.mergeVertices();

  mesh.scale.copy( new Vector3(0.15, 0.15, 0.15));
  mesh.position.set(-6.5, 2.8, 0.5);
  mesh.rotateZ(Math.PI/20);

  return mesh
}

const addExhaustPipes = () => {
  const ExhaustPipes = new Group();
  var shape = new Shape();
  shape.moveTo(2,4);
  shape.bezierCurveTo(1.5, 4.5, 0.5, 4.5, 0, 4);

  var geometry = new LatheGeometry( shape.extractPoints(2).shape);
  var materialArgs = {
    color: 0x000000,
    wireframe: window.game.state.wireframe,
    side: 2,
  };
  var mesh1 = new Mesh(geometry, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);
  mesh1.rotateX(Math.PI/2);
  mesh1.position.set(-3.85, 1.88, 1.46);
  mesh1.scale.copy(new Vector3(0.06,0.06,0.06))

  var geometry2 = new LatheGeometry( shape.extractPoints(2).shape);
  var mesh2 = new Mesh(geometry, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);
  mesh2.rotateX(Math.PI/2);
  mesh2.position.set(-3.86, 1.88, -1.46);
  mesh2.scale.copy(new Vector3(0.06,0.06,0.06))
  mesh2.rotateX(Math.PI);

  const exhaustPipeLeft = addExhaustPipe(1);
  const exhaustPipeRight = new Group();
  exhaustPipeRight.add(addExhaustPipe(-1));
  exhaustPipeRight.position.z-=1;

  ExhaustPipes.add( mesh1,
                    mesh2,
                    exhaustPipeRight,
                    exhaustPipeLeft
                    );

  ExhaustPipes.rotateY(Math.PI/2);

  return ExhaustPipes;
}

const addStump = () => {
  var geometry = new SphereGeometry(1, 30, 2, 0, 6.3, 3, 1.6);
  var materialArgs = {
    color: 0x00ff00,
    wireframe: window.game.state.wireframe,
  };
  var mesh = new Mesh(geometry, [
    new MeshBasicMaterial(materialArgs),
    new MeshLambertMaterial(materialArgs),
    new MeshPhongMaterial(materialArgs),
  ]);

  mesh.rotateZ(-Math.PI/2);
  mesh.position.set(0,2,-0.55);
  mesh.rotateX(-Math.PI/2);

  return mesh;
}

const addDomeRing = () => {
  var rectangle = new Shape();
  rectangle.moveTo(3.6,0);
  rectangle.lineTo(4,0);
  rectangle.lineTo(4,1);
  rectangle.lineTo(3.6,1);
  rectangle.lineTo(3.6,0);

  var geometry = new LatheGeometry( rectangle.extractPoints(10).shape,20);
  var mesh = new Mesh(geometry, [
    new MeshBasicMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe } ),
    new MeshLambertMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe } ),
    new MeshPhongMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe, shininess: 100 } ),
  ]);

  var geometry1 = new BoxGeometry( 1, 1, 4);
  var mesh1 = new Mesh(geometry1, [
    new MeshBasicMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe } ),
    new MeshLambertMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe } ),
    new MeshPhongMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe, shininess: 100 } ),
  ]);

  var geometry2 = new LatheGeometry( rectangle.extractPoints(10).shape,20);
  var mesh2 = new Mesh(geometry2, [
    new MeshBasicMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe } ),
    new MeshLambertMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe } ),
    new MeshPhongMaterial( { color: 0xffd700, wireframe: window.game.state.wireframe, shininess: 100 } ),
  ]);

  mesh.scale.copy(new Vector3(0.25,0.25,0.25));
  mesh.position.set(0,3.2,3);
  mesh.rotateX(Math.PI/14);

  mesh1.scale.copy(new Vector3(0.25,0.25,0.25));
  mesh1.position.set(0,3.468,1.6);
  mesh1.rotateX(-Math.PI/14);

  mesh2.scale.copy(new Vector3(0.36,0.29,0.36));
  mesh2.rotateX(-Math.PI/2);
  mesh2.position.set(0,2.1,1.3);

  const group = new Group();
  group.add(mesh1,mesh,mesh2);
  return group;
}

/**
 * Create car on given position.
 *
 * @param {double} x
 * @param {double} y
 * @param {double} z
 */
export default (position, scale = new Vector3(0.7, 0.7, 0.7)) => {
  const car = new Group();
  const car2 = new Group();

  car.state = {
    acceleration: 0,
    speed: 0,
    collision: [],
    turningLeft: false,
    turningRight: false,
    mov: new Vector3(),
    isStuck: false,
    forward: false,
    reverse: false,
    left: false,
    right: false,
  };
  car.name = 'car';
  car.add(addBody(),
          addWheels(),
          addWheelAxis(),
          addWindowDome(),
          addHeadLights(),
          addExhaustPipes(),
          addStump(),
          addDomeRing()
          );

  car.rotateY(-Math.PI/2);
  car.position.copy(position);
  car.scale.copy(scale);

  return car;
};
