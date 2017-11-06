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
      light: true,
      materials: [
        'MeshBasicMaterial',
        'MeshLambertMaterial',
        'MeshPhongMaterial',
      ],
      currentMaterial: 'MeshLambertMaterial',
    };
  }

  init() {
    BuildScene.build(this);
    BuildCameras.build(this);
    BuildRenderer.build(this);
    this.changeMaterials();

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
    car.position.copy(new Vector3(0, 0, 25));
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
          console.log(node);
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
