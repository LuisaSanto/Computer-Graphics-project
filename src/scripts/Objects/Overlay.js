import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
  TextureLoader,
  Vector3
} from 'three';

import Vehicle from './../Objects/Vehicle';

class Overlay extends Scene {
  constructor() {
    super();
    this.addlives();
    this.addMessageBoard();
    this.name = "overlay";
  }

  addlives() {
    const lives = new Group();
    const position = new Vector3(10, 0, -45);
    for (let i = 0; i < 5; i++) {
      position.x += 12;
      lives.add(new Vehicle(position));
    }
    lives.name = 'lives';
    this.add(lives);
  }

  addMessageBoard() {
    const geometry = new PlaneGeometry( 70, 70, 1 );
    const material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide });
    const plane = new Mesh( geometry, material );

    this.add( plane );
    plane.name = 'messageBoard';
    plane.visible = false;
    plane.position.set(0, 100, 0);
    plane.rotateX(-Math.PI/2);
  }

  displayGameOver() {
    const messageBoard = this.getObjectByName('messageBoard');
    const texture = new TextureLoader().load('/public/images/game-over.jpg');
    messageBoard.material.map = texture;
    messageBoard.visible = true;
  }

  displayGamePaused() {
    const messageBoard = this.getObjectByName('messageBoard');
    const texture = new TextureLoader().load('/public/images/game-paused.jpg');
    messageBoard.material.map = texture;
    messageBoard.visible = true;
  }

  toggleMessageBoard() {
    this.getObjectByName('messageBoard').visible = false;
  }
}

export default Overlay;
