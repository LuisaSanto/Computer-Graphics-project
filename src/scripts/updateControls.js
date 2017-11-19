export default () => {
    const car = window.game.scene.getObjectByName('car');
    const speedControl = document.getElementById('speed');

    speedControl.style.transform = "rotate(" + (Math.abs(Math.floor(car.userData.speed)) * 270 / 50 - 240) + "deg)";
};
