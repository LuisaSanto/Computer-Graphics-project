import { Clock, Scene, Vector3, BoxHelper, WebGLRenderer } from 'three';

import BuildCameras from './Builders/BuildCameras';
import BuildScene from './Builders/BuildScene';
import BuildRenderer from './Builders/BuildRenderer';

import onResize from './Events/onResize';
import onKeyDown from './Events/onKeyDown';
import onKeyUp from './Events/onKeyUp';

import detectCollision from './detectCollision';
import treatCollision from './treatCollision';
import updateCarPosition from './updateCarPosition';
import updateOrangePosition from './updateOrangePosition';
import updateCheerioPosition from './updateCheerioPosition';
import updateControls from './updateControls';

class Game {
  constructor() {
    this.clock = new Clock();
    this.scene = new Scene();
    this.renderer = new WebGLRenderer;
    this.state = {
      wireframe: true,
      table: {
        width: 140,
        height: 100,
      },
    };
  }

  init() {
    BuildScene.build(this);
    BuildCameras.build(this);
    BuildRenderer.build(this);

    document.body.appendChild(this.renderer.domElement);

    // Register events.
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  animate() {
    const delta = this.clock.getDelta();

    this.scene.traverse((node) => {
      if(node.name !== 'AABB') {
          return;
      }
      node.update();
    });

    detectCollision();
    treatCollision();

    updateCarPosition(delta);
    updateOrangePosition(delta);
    updateCheerioPosition(delta);

    updateControls();

    this.renderer.render(this.scene, this.state.currentCamera);

    // Recursive call to animate.
    window.requestAnimationFrame(this.animate.bind(this));
  }

  restart() {
    const car = this.scene.getObjectByName('car');
    car.state.speed = 0;
    car.setRotationFromAxisAngle(new Vector3(0, 1, 0), -Math.PI/2);
    car.position.copy(new Vector3(0, 3, 25));
    this.clock.stop();
    this.clock.start();

    // Reposition cheerios.
    const cheerios = this.scene.getObjectByName('track');
    cheerios.children.forEach((cheerio) => {
      cheerio.state.speed = 0;
      cheerio.state.mov = new Vector3();
      cheerio.position.copy(cheerio.state.initialPosition);
      cheerio.state.boundingBox.setFromObject(cheerio);
    });
  }
};

export default Game;
