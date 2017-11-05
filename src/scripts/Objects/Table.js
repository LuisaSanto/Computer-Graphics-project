import { Group, BoxGeometry,  Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial} from 'three';

const addTableTop = (group, width, height, x, y, z) => {
  const geometry = new BoxGeometry(width, 2, height, 25, 2, 25);
  const BasicMaterial = new MeshBasicMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const LambertMaterial = new MeshLambertMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const PhongMaterial = new MeshPhongMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const top = new Mesh(geometry, PhongMaterial);
  top.name = "top";

  top.state = {
    basicMaterial: BasicMaterial,
    lambertMaterial: LambertMaterial,
    phongMaterial: PhongMaterial,
  }

  top.position.set(x, y, z);
  group.add(top);
}

const addTableLeg = (group, x, y, z, name) => {
  const geometry = new BoxGeometry(2, 6, 2);
  const BasicMaterial = new MeshBasicMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const LambertMaterial = new MeshLambertMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const PhongMaterial = new MeshPhongMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const leg = new Mesh(geometry, PhongMaterial);

  leg.state = {
    basicMaterial: BasicMaterial,
    lambertMaterial: LambertMaterial,
    phongMaterial: PhongMaterial,
  }
  leg.name = name;
  leg.position.set(x, y, z);
  group.add(leg);
}

export default (x, y, z) => {
  const width = window.game.state.table.width;
  const height = window.game.state.table.height;
  const table = new Group();

  addTableTop(table, width, height, 0, 0, 0);
  addTableLeg(table, (width/2 - 1), -4, (height/2 - 1), "leg1");
  addTableLeg(table, -(width/2 - 1), -4, (height/2 - 1), "leg2");
  addTableLeg(table, (width/2 - 1), -4, -(height/2 - 1), "leg3");
  addTableLeg(table, -(width/2 - 1), -4, -(height/2 - 1), "leg4");

  table.position.set(x, y, z);
  table.name = 'table';

  return table;
}
