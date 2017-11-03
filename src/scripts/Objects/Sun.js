import { DirectionalLight, DirectionalLightHelper, CameraHelper, Mesh, Group, AmbientLight} from 'three';

export default () => {
  const group = new Group;
  const width = window.game.state.table.width;
  const height = window.game.state.table.height;
  const directionalLight = new DirectionalLight(0xdfebff);
  directionalLight.name = 'sun';
  directionalLight.intensity = true;
  directionalLight.position.set(300, 400, 50);
  directionalLight.target.position.set(40, 4, 40);
  directionalLight.castShadow = true;
  /*directionalLight.shadow.camera.near = 0;
  directionalLight.shadow.camera.far = 1000;
  directionalLight.shadow.camera.left = -1000;
  directionalLight.shadow.camera.right = 1000;
  directionalLight.shadow.camera.top = 1000;
  directionalLight.shadow.camera.bottom = -1000;*/

  const helper = new CameraHelper(directionalLight.shadow.camera);

  group.add(directionalLight, helper)

  return group;
}
