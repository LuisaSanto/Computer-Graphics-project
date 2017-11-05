import { Box3, 
  BoxGeometry, 
  ConeGeometry, 
  Group, 
  MeshBasicMaterial, 
  SphereGeometry, 
  MeshPhongMaterial, 
  MeshLambertMaterial,  
  Mesh, 
  Vector3 } from 'three';

export default (number) => {
  const oranges = new Group();
  oranges.name = 'oranges';

  const spherePhongMaterial = new MeshPhongMaterial({
    color: 0xcc5300,
    wireframe: window.game.state.wireframe,
    });

  const stickPhongMaterial = new MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: window.game.state.wireframe,
  });

  const leafPhongMaterial = new MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: window.game.state.wireframe,
  });

  const sphereLambertMaterial = new MeshLambertMaterial({
    color: 0xcc5300,
    wireframe: window.game.state.wireframe,
    });

  const stickLambertMaterial = new MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: window.game.state.wireframe,
  });

  const leafLambertMaterial = new MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: window.game.state.wireframe,
  });

  const sphereBasicMaterial = new MeshBasicMaterial({
    color: 0xcc5300,
    wireframe: true,
    });

  const stickBasicMaterial = new MeshBasicMaterial({
    color: 0x00ff00,
    wireframe:true,
  });

  const leafBasicMaterial = new MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });



  // Common characteristics.
  const orange = new Mesh(
    new SphereGeometry(2),
    spherePhongMaterial
  );
  
  const stickAndLeaf = new Group();
  const stick = new Mesh(
    new ConeGeometry(0.1, 1, 5),
    stickPhongMaterial
  );
  const leaf = new Mesh(
    new BoxGeometry(1, .05, 1),
    leafPhongMaterial
  );

  leaf.name = 'leaf';
  stick.name = 'stick';

  stickAndLeaf.add(stick, leaf);
  leaf.position.set(0.5, 0, 0.5);

  orange.castShadow = true;
  orange.receiveShadow = true;
  orange.name = 'orange';
  orange.add(stickAndLeaf);
  stickAndLeaf.position.set(0, 2.5, 0);
  stickAndLeaf.rotateX(Math.PI);

  // Orange spawn limits.
  const safe_x = 120;
  const safe_z = 80;

  for (let index = 0; index < number; index++) {
    const newOrange = orange.clone();

    newOrange.position.set(
      Math.random() * safe_x - safe_x/2,
      3,
      Math.random() * safe_z - safe_z/2
    );

    const directionVector = new Vector3(0.5 - Math.random(), 0, 0.5 - Math.random()).normalize();
    const rotationVector = new Vector3(directionVector.z, 0, -directionVector.x);
    
    newOrange.state = {
      boundingBox: new Box3().setFromObject(newOrange),
      speed: 5 * (1 + Math.floor(window.game.clock.getElapsedTime() / 30)) + Math.random() * 3,
      direction: directionVector,
      rotationVector: rotationVector,
      spawnDelay: 2 * Math.random(),
      hasFallen: false,
      spherePhongMaterial: spherePhongMaterial,
      stickPhongMaterial: stickPhongMaterial,
      leafPhongMaterial: leafPhongMaterial,
      sphereLambertMaterial: sphereLambertMaterial,
      stickLambertMaterial: stickLambertMaterial,
      leafLambertMaterial: leafLambertMaterial,
      sphereBasicMaterial: sphereBasicMaterial,
      stickBasicMaterial: stickBasicMaterial,
      leafBasicMaterial: leafBasicMaterial,
    }
    
    oranges.add(newOrange);
  }
  
  return oranges;
}
