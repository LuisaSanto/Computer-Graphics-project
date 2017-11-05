import {
  Clock,
  Scene,
  Vector3,
  BoxHelper,
  WebGLRenderer
} from 'three';

import BuildCameras from './Builders/BuildCameras';
import BuildScene from './Builders/BuildScene';
import BuildRenderer from './Builders/BuildRenderer';

import Movement from './Movement';

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
    car.setRotationFromAxisAngle(new Vector3(0, 1, 0), 0);
    car.position.copy(car.userData.initialPosition);
    car.userData = Object.assign(car.userData, {
      acceleration: 0,
      dof: new Vector3(-1, 0, 0),
      isStuck: false,
      isRotationg: false,
      speed: 0,
      vuv: new Vector3(0, 1, 0),
    });
    this.clock.stop();
    this.clock.start();

    // Reset butters.
    const butters = this.scene.getObjectByName('butters');
    butters.children.forEach((butter) => {
      butter.userData = Object.assign(butter.userData, {
        collision: [],
      });
    });

    // Reposition cheerios.
    const cheerios = this.scene.getObjectByName('track');
    cheerios.children.forEach((cheerio) => {
      cheerio.userData.speed = 0;
      cheerio.userData.dof = new Vector3();
      cheerio.position.copy(cheerio.userData.initialPosition);
      cheerio.userData.boundingBox.setFromObject(cheerio);
    });
  }

  changeVehicle() {
    if (this.userData.vehicle = 'car') {
      this.vehicles.motorcycle.position.copy(this.vehicles.car.position);
      this.scene.remove(this.vehicles.car);
      this.scene.add(this.vehicles.motorcycle);
      this.userData.vehicle = 'motorcycle';
    } else {
      this.vehicles.car.position.copy(this.vehicles.motorcycle.position);
      this.scene.remove(this.vehicles.motorcycle);
      this.scene.add(this.vehicles.car);
      this.userData.vehicle = 'car';
    }
  }
};

export default Game;
