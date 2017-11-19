export default (e) => {
  Object.values(window.game.cameras).forEach((camera) => {
    if (window.innerHeight === 0 || window.innerWidth === 0) {
      return;
    }

    camera.aspect = window.innerWidth / window.innerHeight;

    if (camera.type === 'OrthographicCamera') {
      const tableBounds = window.game.scene.getObjectByName('table').userData.boundingBox;
      const buffer = 10;
      const xAxis = tableBounds.max.x - tableBounds.min.x + buffer;
      const zAxis = tableBounds.max.z - tableBounds.min.z + buffer;
      const sceneRatio = xAxis / zAxis;

      if (sceneRatio > camera.aspect) {
        camera.left = -xAxis / 2;
        camera.right = xAxis / 2;
        camera.top = xAxis / camera.aspect / 2;
        camera.bottom = -xAxis / camera.aspect / 2;
      } else {
        camera.left = -zAxis * camera.aspect / 2;
        camera.right = zAxis * camera.aspect / 2;
        camera.top = zAxis / 2;
        camera.bottom = -zAxis / 2;
      }
    }

    camera.updateProjectionMatrix();
  });

  window.game.renderer.setSize(window.innerWidth, window.innerHeight);
}
