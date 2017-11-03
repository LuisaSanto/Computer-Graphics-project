import { Group, BoxGeometry, MeshLambertMaterial, MeshPhongMaterial, MeshBasicMaterial, Mesh, Box3 } from 'three';

export default (number) => {
  const butters = new Group;
  butters.name = 'butters';
  const geometry = new BoxGeometry(5, 2, 2);

  const lambertMaterial = new MeshLambertMaterial({
    color: 0xffff00,
    wireframe: window.game.state.wireframe,
  });

  const phongMaterial = new MeshPhongMaterial({
    color: 0xffff00,
    wireframe: window.game.state.wireframe,
  });

  const basicMaterial = new MeshBasicMaterial({
    color: 0xffff00,
    wireframe: window.game.state.wireframe,
  });

  const butter = new Mesh(geometry, phongMaterial);
  const safe_x = 120;
  const safe_z = 80;
  const AABB = new Box3();
  
  butter.state = {
    boundingBox: AABB,
    collision: [],
    forward: false,
    reverse: false,
    right: false,
    left: false,
  }
  butter.name = 'butter';
  butter.castShadow = true;
  butter.receiveShadow = true;

  for (let index = 0; index < number; index++) {
    const newButter = butter.clone();
    
        newButter.position.set(
          Math.random() * safe_x - safe_x/2,
          3,
          Math.random() * safe_z - safe_z/2
        );
    
        newButter.state = {
          boundingBox: new Box3().setFromObject(newButter),
          phongMaterial: phongMaterial, 
          lambertMaterial: lambertMaterial,
          basicMaterial: basicMaterial,
        }
        
        butters.add(newButter);
  }

  return butters;
}
