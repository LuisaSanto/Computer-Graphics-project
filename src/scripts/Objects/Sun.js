import { DirectionalLight, DirectionalLightHelper, CameraHelper, Mesh, Group, AmbientLight} from 'three';

export default () => {
  const group = new Group;
  const width = window.game.state.table.width;
  const height = window.game.state.table.height;
  const directionalLight = new DirectionalLight(0xdfebff);
  directionalLight.name = 'sun';
  directionalLight.intensity = true;
  directionalLight.position.set(50, 60, 50);
  directionalLight.target.position.set(0, 4, 0);

  group.add(directionalLight)

  return group;
}
