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
      gameOver: false,
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

    this.changeMaterials();

    document.body.appendChild(this.renderer.domElement);

    // Register events.
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  animate() {
    let delta = this.clock.getDelta();

    // "Burn" frames when paused.
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

  reload() {
    this.overlay.getObjectByName('lives').children.forEach((live) => {
      live.visible = true;
    });
    this.state.gameOver = false;
    this.scene = new World();
    this.overlay.toggleMessageBoard();
    this.clock.start();
  }

  restart() {
    this.resetCar();
    this.resetButters();
    this.resetCheerios();
    this.maybeEndGame();
  }

  /**
   * Reset car.
   */
  resetCar() {
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
  }

  /**
   * Reset butter colisions.
   */
  resetButters() {
    const butters = this.scene.getObjectByName('butters');
    butters.children.forEach((butter) => {
      butter.userData = Object.assign(butter.userData, {
        collision: [],
      });
    });
  }

  /**
   * Reset cheerio positions.
   */
  resetCheerios() {
    const cheerios = this.scene.getObjectByName('track');
    cheerios.children.forEach((cheerio) => {
      cheerio.userData.speed = 0;
      cheerio.userData.dof = new Vector3();
      cheerio.position.copy(cheerio.userData.initialPosition);
      cheerio.userData.boundingBox.setFromObject(cheerio);
    });
  }

  /**
   * Determine if the game should be ended.
   */
  maybeEndGame() {
    this.clock.stop();

    // Take one live from the player.
    const isGameOver = this.oneDown();

    if (isGameOver) {
      this.gameOver();
      this.state.gameOver = true;
      return;
    }

    this.clock.start();
  }

  /**
   * Remove on live from the player.
   * @return {boolean} True if is game over, false otherwise.
   */
  oneDown() {
    const lives = this.overlay.getObjectByName('lives');
    for (let i = 0; i < lives.children.length; i++) {
      if (lives.children[i].visible) {
        lives.children[i].visible = false;
        return i == lives.children.length - 1;
      }
    }
  }

  /**
   * Game Over.
   */
  gameOver() {
    this.overlay.displayGameOver();
  }

  /**
   * Change vehicle body.
   * Cycles to the next body available.
   */
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

  changeMaterials(obj = this.scene, name = this.state.currentMaterial) {
    obj.traverse((node) => {
      if (
        node.material == undefined ||
        node.material.length == undefined
      ) {
        if (
          node.userData != undefined &&
          node.userData.materials != undefined &&
          node.userData.materials.length > 1
        ) {
          this.fallBackchangeObjectMaterial(node, name);
          return;
        }
        return;
      }
      this.changeObjectMaterial(node, name);
    });
  }

  changeObjectMaterial(obj, name) {
    obj.material.splice(0, 0, obj.material.splice(this.getNewMaterialIndex(obj.material, name), 1)[0]);
  }

  fallBackchangeObjectMaterial(obj, name) {
    obj.userData.materials.splice(0, 0, obj.userData.materials.splice(this.getNewMaterialIndex(obj.userData.materials, name), 1)[0]);
    obj.material = obj.userData.materials[0];
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
