import {
  Box3,
  BoxGeometry,
  ConeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  SphereGeometry,
  Vector3
} from 'three';

class Oranges extends Group {
  constructor(amount) {
    super();
    this.name = 'oranges';
    this.addOranges(amount);
  }

  addOranges(amount) {
    const orange = this.createTemplateOrange();

    // Orange spawn limits.
    const safe_x = 120;
    const safe_z = 80;

    for (let index = 0; index < amount; index++) {
      const newOrange = orange.clone();

      // Put back states.
      newOrange.getObjectByName('leaf').state = orange.getObjectByName('leaf').state;

      newOrange.position.set(
        Math.random() * safe_x - safe_x/2,
        3,
        Math.random() * safe_z - safe_z/2
      );

      const dof = new Vector3(0.5 - Math.random(), 0, 0.5 - Math.random()).normalize();
      const rotationVector = new Vector3(dof.z, 0, -dof.x);

      newOrange.userData = {
        acceleration: 0,
        boundingBox: new Box3().setFromObject(newOrange),
        dof: dof,
        drag: 0,
        hasFallen: false,
        radius: 2,
        spawnDelay: 2 * Math.random(),
        speed: 5 * (1 + Math.floor(window.game.clock.getElapsedTime() / 30)) + Math.random() * 3,
        vuv: rotationVector,
      }

      this.add(newOrange);
    }
  }

  createTemplateOrange() {
    const orangeMaterialArgs = {
      color: 0xcc5300,
      wireframe: window.game.state.wireframe,
    };
    const orangeMaterials = [
      new MeshBasicMaterial(orangeMaterialArgs),
      new MeshLambertMaterial(orangeMaterialArgs),
      new MeshPhongMaterial(orangeMaterialArgs),
    ];
    const orange = new Mesh(
      new SphereGeometry(2),
      orangeMaterials
    );

    const stickAndLeaf = this.createStickAndLeaf();

    orange.name = 'orange';
    orange.add(stickAndLeaf);
    stickAndLeaf.position.set(0, 2.5, 0);
    stickAndLeaf.rotateX(Math.PI);

    return orange;
  }

  createStickAndLeaf() {
    const stickAndLeaf = new Group();
    const materialArgs = {
      color: 0x00ff00,
      wireframe: window.game.state.wireframe,
    };
    const materials = [
      new MeshBasicMaterial(materialArgs),
      new MeshLambertMaterial(materialArgs),
      new MeshPhongMaterial(materialArgs),
    ];
    const stick = new Mesh(
      new ConeGeometry(0.1, 1, 5),
      materials
    );
    const leaf = new Mesh(
      new BoxGeometry(1, .05, 1),
      new MeshBasicMaterial(materialArgs)
    );

    leaf.name = 'leaf';
    leaf.state = {
      materials: materials,
    };
    stickAndLeaf.add(stick, leaf);
    leaf.position.set(0.5, 0, 0.5);

    return stickAndLeaf;
  }
}
export default Oranges;
