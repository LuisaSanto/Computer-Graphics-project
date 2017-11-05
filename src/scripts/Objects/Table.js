import { Group, BoxGeometry, MeshBasicMaterial, Mesh, MeshLambertMaterial} from 'three';

const addTableTop = (group, width, height, x, y, z) => {
  const geometry = new BoxGeometry(width, 2, height, 25, 2, 25);
  const material = new MeshLambertMaterial({
    color: 0xa66829,
    wireframe: true
  });
  const top = new Mesh(geometry, material);

  top.position.set(x, y, z);
  group.add(top);
}

const addTableLeg = (group, x, y, z) => {
  const geometry = new BoxGeometry(2, 6, 2);
  const material = new MeshBasicMaterial({
    color: 0xa66829,
    wireframe: window.game.state.wireframe,
  });
  const leg = new Mesh(geometry, material);

  leg.position.set(x, y, z);
  group.add(leg);
}

export default (x, y, z) => {
  const width = window.game.state.table.width;
  const height = window.game.state.table.height;
  const table = new Group();

  addTableTop(table, width, height, 0, 0, 0);
  addTableLeg(table, (width/2 - 1), -4, (height/2 - 1));
  addTableLeg(table, -(width/2 - 1), -4, (height/2 - 1));
  addTableLeg(table, (width/2 - 1), -4, -(height/2 - 1));
  addTableLeg(table, -(width/2 - 1), -4, -(height/2 - 1));

  table.position.set(x, y, z);
  table.name = 'table';

  return table;
}
