import { Mesh } from 'three';

export default (e) => {
  const scene = window.game.scene;
  const car = scene.getObjectByName('car');
  switch(e.keyCode) {
    case 65:
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          if (node.name === 'rim') {
            return;
          }
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;
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
    case 67: // Turn off pointlights
      window.game.state.getObjectByName('velas').children.forEach((vela) => {
        if ( vela.intensity === 0 ) {
          vela.intensity = 2;
        } else {
          vela.intensity = 0;
        }
      });
  }
}
