import { Mesh, MeshBasicMaterial, MeshPhongMaterial} from 'three';

export default (e) => {
  const game = window.game;
  const scene = game.scene;
  const car = scene.getObjectByName('car');
  const sun = scene.getObjectByName('sun');

  switch(e.keyCode) {
    case 37: // Left arrow
      car.userData.isRotating = true;
      car.userData.rotationDir = 1;
      break;
    case 38: // Top arrow
      car.userData.acceleration = car.userData.baseAcceleration;
      break;
    case 39: // Right
      car.userData.isRotating = true;
      car.userData.rotationDir = -1;
    break;
    case 40: // Down arrow
      car.userData.acceleration = -car.userData.baseAcceleration;
      break;
    case 49: // 1
      game.state.currentCamera = game.cameras.orthogonal;
      break;
    case 50: // 2
      game.state.currentCamera = game.cameras.perspective;
      break;
    case 51: // 3
      game.state.currentCamera = game.cameras.thirdPerson;
      break;
    case 65: // a
      game.state.wireframe = !game.state.wireframe;
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          if (node.name === 'rim') {
            return;
          }

          if (node.material.length > 1) {
            node.material.forEach((material) => {
              material.wireframe = game.state.wireframe;
            });
            return;
          }

          if (
            node.userData != undefined &&
            node.userData.materials != undefined &&
            node.userData.materials.length > 1
          ) {
            node.userData.materials.forEach((material) => {
              material.wireframe = game.state.wireframe;
            });
            return;
          }

          node.material.wireframe = game.state.wireframe;
        }
      });
      break;
    case 67: // c
      game.scene.getObjectByName('candles').children.forEach((candle) => {
        if (candle.intensity === 0) {
          candle.intensity = 2;
        } else {
          candle.intensity = 0;
        }
      });
    case 71: // g
      if (game.state.light) {
        if (game.state.currentMaterial === 'MeshLambertMaterial') {
          game.state.currentMaterial = 'MeshPhongMaterial';
        } else {
          game.state.currentMaterial = 'MeshLambertMaterial';
        }
        game.changeMaterials();
      }
      break;
    case 76: // l
      game.state.light = !game.state.light;
      if (game.state.light) {
        game.changeMaterials();
      } else {
        game.changeMaterials('MeshBasicMaterial');
      }
      break;
    case 77: // m
      car.changeMode();
      break;
    case 78: // n
      if (sun.intensity === 0) {
        sun.intensity = 1;
      } else {
        sun.intensity = 0;
      }
      break;
    case 82: // r
      game.reload();
      break;
    case 83: // s
      game.state.paused = !game.state.paused;
      if (game.state.paused) {
        game.overlay.displayGamePaused();
      } else {
        game.overlay.toggleMessageBoard();
      }
      break;
  }
}
