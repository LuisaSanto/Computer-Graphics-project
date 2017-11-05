import { Mesh, MeshBasicMaterial, MeshPhongMaterial} from 'three';

export default (e) => {
  const scene = window.game.scene;
  const car = scene.getObjectByName('car');
  const sun = scene.getObjectByName('sun');
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
    case 78: //n
      sun.intensity = !sun.intensity;
      break;
    case 76: //l
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          if(node.name === 'butter'){
            if(node.material != node.state.basicMaterial){
              node.state.basicMaterial.wireframe = node.material.wireframe;
              node.material = node.state.basicMaterial;
            }
            else{
              node.state.phongMaterial.wireframe = node.material.wireframe;
              node.material = node.state.phongMaterial;
            }
          }
          else if(node.name === 'orange'){
            if(node.material != node.state.sphereBasicMaterial){
              node.state.sphereBasicMaterial.wireframe = node.material.wireframe;
              node.state.leafBasicMaterial.wireframe = node.material.wireframe;
              node.state.stickBasicMaterial.wireframe = node.material.wireframe;
              node.material = node.state.sphereBasicMaterial;
              node.getObjectByName('leaf').material = node.state.leafBasicMaterial;
              node.getObjectByName('stick').material = node.state.stickBasicMaterial;
            }
            else{
              node.state.spherePhongMaterial.wireframe = node.material.wireframe;
              node.state.leafPhongMaterial.wireframe = node.material.wireframe;
              node.state.stickPhongMaterial.wireframe = node.material.wireframe;
              node.material = node.state.spherePhongMaterial;
              node.getObjectByName('leaf').material = node.state.leafPhongMaterial;
              node.getObjectByName('stick').material = node.state.stickPhongMaterial;
            }
          }
          else if(node.name === 'cheerio'){
            if(node.material != node.state.basicMaterial){
              node.state.basicMaterial.wireframe = node.material.wireframe;
              node.material = node.state.basicMaterial;
            }
            else{
              node.state.phongMaterial.wireframe = node.material.wireframe;
              node.material = node.state.phongMaterial;
            }
          }
        }
      });
      break; 
    case 71: //g
      scene.traverseVisible((node) => {
        if(node.name === 'orange'){
          if(node.material === node.state.spherePhongMaterial){
            node.state.sphereLambertMaterial.wireframe = node.material.wireframe;
            node.state.leafLambertMaterial.wireframe = node.material.wireframe;
            node.state.stickLambertMaterial.wireframe = node.material.wireframe;
            node.material = node.state.sphereLambertMaterial;
            node.getObjectByName('leaf').material = node.state.leafLambertMaterial;
            node.getObjectByName('stick').material = node.state.stickLambertMaterial;
          }
          else if(node.material === node.state.sphereLambertMaterial){
            node.state.spherePhongMaterial.wireframe = node.material.wireframe;
            node.state.leafPhongMaterial.wireframe = node.material.wireframe;
            node.state.stickPhongMaterial.wireframe = node.material.wireframe;
            node.material = node.state.spherePhongMaterial;
            node.getObjectByName('leaf').material = node.state.leafPhongMaterial;
            node.getObjectByName('stick').material = node.state.stickPhongMaterial;
          }
        }
        else if(node.name === 'butter'){
          if(node.material === node.state.phongMaterial){
            node.state.lambertMaterial.wireframe = node.material.wireframe;
            node.material = node.state.lambertMaterial;
          }
          else if(node.material === node.state.lambertMaterial){
            node.state.phongMaterial.wireframe = node.material.wireframe;
            node.material = node.state.phongMaterial;
          }
        }
        else if(node.name === 'cheerio'){
          if(node.material === node.state.phongMaterial){
            node.state.lambertMaterial.wireframe = node.material.wireframe;
            node.material = node.state.lambertMaterial;
          }
          else if(node.material === node.state.lambertMaterial){
            node.state.phongMaterial.wireframe = node.material.wireframe;
            node.material = node.state.phongMaterial;
          }
        }
    });
    break;
    case 67: // Turn off pointlights
      scene.getObjectByName('candles').children.forEach((vela) => {
        if ( vela.intensity === 0 ) {
          vela.intensity = 2;
        } else {
          vela.intensity = 0;
        }
      });
  }
}
