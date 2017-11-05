export default (e) => {
  const car = window.game.scene.getObjectByName('car');

  switch(e.keyCode) {
    case 37: // Left arrow
      car.state.left = false;
      break;
    case 38: // Top arrow
      car.state.forward = false;
      break;
    case 39: // Right
      car.state.right = false;
      break;
    case 40: // Down arrow
      car.state.reverse = false;
      break;
  }
}
