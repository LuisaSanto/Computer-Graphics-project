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
          else if(node.name === 'top'){
            console.log('lightchange');
            const top = node;
            const leg1 = scene.getObjectByName('leg1');
            const leg2 = scene.getObjectByName('leg2');
            const leg3 = scene.getObjectByName('leg3');
            const leg4 = scene.getObjectByName('leg4');

            if(top.material != top.state.basicMaterial){
              top.state.basicMaterial.wireframe = top.material.wireframe;
              leg1.state.basicMaterial.wireframe = leg1.material.wireframe;
              leg2.state.basicMaterial.wireframe = leg2.material.wireframe;
              leg3.state.basicMaterial.wireframe = leg3.material.wireframe;
              leg4.state.basicMaterial.wireframe = leg4.material.wireframe;
              top.material = top.state.basicMaterial;
              leg1.material = leg1.state.basicMaterial;
              leg2.material = leg2.state.basicMaterial;
              leg3.material = leg3.state.basicMaterial;
              leg4.material = leg4.state.basicMaterial;
            }
            else{
              top.state.phongMaterial.wireframe = top.material.wireframe;
              leg1.state.phongMaterial.wireframe = leg1.material.wireframe;
              leg2.state.phongMaterial.wireframe = leg2.material.wireframe;
              leg3.state.phongMaterial.wireframe = leg3.material.wireframe;
              leg4.state.phongMaterial.wireframe = leg4.material.wireframe;
              top.material = top.state.phongMaterial;
              leg1.material = leg1.state.phongMaterial;
              leg2.material = leg2.state.phongMaterial;
              leg3.material = leg3.state.phongMaterial;
              leg4.material = leg4.state.phongMaterial;
            }
          }
          else if(node.name === 'lantern'){
            if(node.material != node.state.basicMaterial){
              node.state.basicMaterial.wireframe = node.material.wireframe;
              node.material = node.state.basicMaterial;
            }
            else{
              node.state.phongMaterial.wireframe = node.material.wireframe;
              node.material = node.state.phongMaterial;
            }
          }
          else if(node.name === 'CarPart'){
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
        else if(node.name === 'top'){
            console.log('lightchange');
            const top = node;
            const leg1 = scene.getObjectByName('leg1');
            const leg2 = scene.getObjectByName('leg2');
            const leg3 = scene.getObjectByName('leg3');
            const leg4 = scene.getObjectByName('leg4');

            if(top.material === top.state.phongMaterial){
              top.state.lambertMaterial.wireframe = top.material.wireframe;
              leg1.state.lambertMaterial.wireframe = leg1.material.wireframe;
              leg2.state.lambertMaterial.wireframe = leg2.material.wireframe;
              leg3.state.lambertMaterial.wireframe = leg3.material.wireframe;
              leg4.state.lambertMaterial.wireframe = leg4.material.wireframe;
              top.material = top.state.lambertMaterial;
              leg1.material = leg1.state.lambertMaterial;
              leg2.material = leg2.state.lambertMaterial;
              leg3.material = leg3.state.lambertMaterial;
              leg4.material = leg4.state.lambertMaterial;
            }
            else if(top.material === top.state.lambertMaterial){
              top.state.phongMaterial.wireframe = top.material.wireframe;
              leg1.state.phongMaterial.wireframe = leg1.material.wireframe;
              leg2.state.phongMaterial.wireframe = leg2.material.wireframe;
              leg3.state.phongMaterial.wireframe = leg3.material.wireframe;
              leg4.state.phongMaterial.wireframe = leg4.material.wireframe;
              top.material = top.state.phongMaterial;
              leg1.material = leg1.state.phongMaterial;
              leg2.material = leg2.state.phongMaterial;
              leg3.material = leg3.state.phongMaterial;
              leg4.material = leg4.state.phongMaterial;
            }
        }
        else if(node.name === 'lantern'){
            if(node.material === node.state.phongMaterial){
              node.state.lambertMaterial.wireframe = node.material.wireframe;
              node.material = node.state.lambertMaterial;
            }
            else if(node.material === node.state.lambertMaterial){
              node.state.phongMaterial.wireframe = node.material.wireframe;
              node.material = node.state.phongMaterial;
            }
        }
        else if(node.name === 'CarPart'){
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
