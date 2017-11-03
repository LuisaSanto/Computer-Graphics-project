import { Mesh, MeshBasicMaterial, MeshPhongMaterial} from 'three';

import Camera from './../Camera';

export default (e) => {
  const car = window.scene.getObjectByName('car');
  const sun = window.scene.getObjectByName('sun');
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
      Camera('orthogonal');
      break;
    case 50: // 2
      Camera('perspective');
      break;
    case 51: // 3
      Camera('thirdPerson');
      break;
    case 78: //n
      sun.intensity = !sun.intensity;
      break;
    case 76: //l
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          if(node.name === 'butter'){
            if(node.material != node.state.basicMaterial){
              node.material = node.state.basicMaterial;
            }
            else{
              node.material = node.state.phongMaterial;
            }
          }
          if(node.name === 'orange'){
            if(node.material != node.state.sphereBasicMaterial){
              node.material = node.state.sphereBasicMaterial;
              node.getObjectByName('leaf').material = node.state.leafBasicMaterial;
              node.getObjectByName('stick').material = node.state.stickBasicMaterial;
            }
            else{
              node.material = node.state.spherePhongMaterial;
              node.getObjectByName('leaf').material = node.state.leafPhongMaterial;
              node.getObjectByName('stick').material = node.state.stickPhongMaterial;
            }
          }
        }
      });
      break; 
    case 71: //g
      scene.traverseVisible((node) => {
        if(node.name === 'orange'){
          if(node.material === node.state.spherePhongMaterial){
            node.material = node.state.sphereLambertMaterial;
            node.getObjectByName('leaf').material = node.state.leafLambertMaterial;
            node.getObjectByName('stick').material = node.state.stickLambertMaterial;
          }
          else if(node.material === node.state.sphereLambertMaterial){
            node.material = node.state.spherePhongMaterial;
            node.getObjectByName('leaf').material = node.state.leafPhongMaterial;
            node.getObjectByName('stick').material = node.state.stickPhongMaterial;
          }
        }
        else if(node.name === 'butter'){
          if(node.material === node.state.phongMaterial){
            node.material = node.state.lambertMaterial;
          }
          else if(node.material === node.state.lambertMaterial){
            node.material = node.state.phongMaterial;
          }
        }
    });
  }
}
