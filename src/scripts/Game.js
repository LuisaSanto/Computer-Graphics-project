import {
  Clock,
  Scene,
  Vector3,
  BoxHelper,
  TextureLoader
} from 'three';

import BuildCameras from './Builders/BuildCameras';

import Renderer from './Objects/Renderer';
import Overlay from './Objects/Overlay';
import World from './Objects/World';

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
    this.state = {
      paused: false,
      wireframe: true,
      table: {
        width: 140,
        height: 100,
      },
      light: true,
      materials: [
        'MeshBasicMaterial',
        'MeshLambertMaterial',
        'MeshPhongMaterial',
      ],
      currentMaterial: 'MeshPhongMaterial',
    };
  }

  init() {
    this.renderer = new Renderer();
    this.scene = new World();
    this.overlay = new Overlay();

    BuildCameras.build(this);

    // this.texture = new TextureLoader().load('/public/bg.jpg');
    // this.scene.background = this.texture;

    this.changeMaterials();

    document.body.appendChild(this.renderer.domElement);

    // Register events.
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  animate() {
    let delta = this.clock.getDelta();

    if (this.state.paused) {
      delta = 0;
    }

    detectCollision();
    treatCollision();

    updateCarPosition(delta);
    updateOrangePosition(delta);
    updateCheerioPosition(delta);

    updateControls();

    this.renderer.clear();
    this.renderer.render(this.scene, this.state.currentCamera);
    this.renderer.clearDepth();
    this.renderer.render(this.overlay, this.cameras.orthogonal);

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

  changeMaterials(name = this.state.currentMaterial) {
    this.scene.traverse((node) => {
      if (
        node.material == undefined ||
        node.material.length == undefined
      ) {
        if (
          node.state != undefined &&
          node.state.materials != undefined &&
          node.state.materials.length > 1
        ) {
          this.fallBackMethod(node, name);
          return;
        }
        return;
      }
      node.material.splice(0, 0, node.material.splice(this.getNewMaterialIndex(node.material, name), 1)[0]);
    });
  }

  fallBackMethod(obj, name) {
    obj.state.materials.splice(0, 0, obj.state.materials.splice(this.getNewMaterialIndex(obj.state.materials, name), 1)[0]);
    obj.material = obj.state.materials[0];
  }

  getNewMaterialIndex(materials, name) {
    for (let i = 0; i < materials.length; i++) {
      if (materials[i].type === name) {
        return i;
      }
    }
    return 0;
  }
};

export default Game;
