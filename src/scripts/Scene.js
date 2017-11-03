import { Scene, AxisHelper, Vector3, BoxHelper } from 'three';
import Orange from './Objects/Orange';
import Butter from './Objects/Butter';
import Car from './Objects/Car';
import Table from './Objects/Table';
import Track from './Objects/Track';
import Sun from './Objects/Sun'

export default () => {
  const scene = new Scene();
  scene.add(
    new AxisHelper(10),
    Table(0, 0, 0),
    Car(
      new Vector3(0, 3, 25), // Car initial position.
      new Vector3(1, 1, 1) // Car initial scale.
    ),
    Track(0, 0, 0),
    Orange(3),
    Butter(5),
    Sun(),
  );

  // Add boxes
  scene.traverse((node) => {
    if(['car', 'orange', 'butter', 'cheerio'].indexOf(node.name) === -1) {
      return;
    }
    const box = new BoxHelper( node, 0xffff00 );
    box.name = 'AABB';
    scene.add(box);
  });

  window.scene = scene;
}
