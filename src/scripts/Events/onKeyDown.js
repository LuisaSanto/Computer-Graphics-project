import { Mesh, MeshBasicMaterial, MeshPhongMaterial} from 'three';

export default (e) => {
  const scene = window.game.scene;
  const car = scene.getObjectByName('car');
  const sun = scene.getObjectByName('sun');

  switch(e.keyCode) {
    case 37: // Left arrow
      car.state.left = true;
      break;
    case 38: // Top arrow
      car.state.forward = true;
      break;
    case 39: // Right
      car.state.right = true;
      break;
    case 40: // Down arrow
      car.state.reverse = true;
      break;
    case 49: // 1
      window.game.state.currentCamera = window.game.cameras.orthogonal;
      break;
    case 50: // 2
      window.game.state.currentCamera = window.game.cameras.perspective;
      break;
    case 51: // 3
      window.game.state.currentCamera = window.game.cameras.thirdPerson;
      break;
    case 65: // a
      window.game.state.wireframe = !window.game.state.wireframe;
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          if (node.name === 'rim') {
            return;
          }

          if (node.material.length > 1) {
            node.material.forEach((material) => {
              material.wireframe = window.game.state.wireframe;
            });
            return;
          }

          if (
            node.state != undefined &&
            node.state.materials != undefined &&
            node.state.materials.length > 1
          ) {
            node.state.materials.forEach((material) => {
              material.wireframe = window.game.state.wireframe;
            });
            return;
          }

          node.material.wireframe = window.game.state.wireframe;
        }
      });
      break;
    case 67: // c
      window.game.scene.getObjectByName('candles').children.forEach((vela) => {
        if (vela.intensity === 0) {
          vela.intensity = 2;
        } else {
          vela.intensity = 0;
        }
      });
      break;
    case 71: //g
      if (window.game.state.light) {
        if (window.game.state.currentMaterial === 'MeshLambertMaterial') {
          window.game.state.currentMaterial = 'MeshPhongMaterial';
        } else {
          window.game.state.currentMaterial = 'MeshLambertMaterial';
        }
        window.game.changeMaterials();
      }
      break;
    case 78: // n
      if (sun.intensity === 0) {
        sun.intensity = 1;
      } else {
        sun.intensity = 0;
      }
      break;
    case 76: // l
      window.game.state.light = !window.game.state.light;
      if (window.game.state.light) {
        window.game.changeMaterials();
      } else {
        window.game.changeMaterials('MeshBasicMaterial');
      }
      break;
  }
}
