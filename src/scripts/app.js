import Game from './Game';

window.game = new Game();

// Setup Scene, Camera and Objects.
window.game.init();
// Start "update/display" loop.
window.game.animate();
