export default (e) => {
  const camera = window.game.state.currentCamera;

  window.game.renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight === 0) {
    return;
  }

  if (camera.type === 'OrthographicCamera') {
    const factor = (window.innerWidth * window.innerHeight * 12) / (1275 * 707);

    camera.left = -window.innerWidth / factor;
    camera.right = window.innerWidth / factor;
    camera.top = window.innerHeight / factor;
    camera.bottom = -window.innerHeight / factor;
  }

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}
