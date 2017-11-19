export default (e) => {
  const car = window.game.scene.getObjectByName('car');

  switch(e.keyCode) {
    case 37: // Left arrow
      car.userData.isRotating = false;
      break;
    case 38: // Top arrow
      car.userData.acceleration = 0;
      break;
    case 39: // Right
      car.userData.isRotating = false;
      break;
    case 40: // Down arrow
      car.userData.acceleration = 0;
      break;
  }
}
