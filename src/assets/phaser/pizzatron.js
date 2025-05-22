// src/assets/phaser/pizzatron.js

(function(window) {
  // Scenes definidos por separado en TS
  const { PreloadScene, MainScene } = window;

  let gameInstance = null;

  function createGame(container) {
    return new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      backgroundColor: '#000000',
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      },
      scene: [PreloadScene, MainScene]
    });
  }

  window.launchPizzatron = function(container) {
    if (gameInstance) {
      gameInstance.destroy(true);
      gameInstance = null;
    }
    gameInstance = createGame(container);
  };

  window.destroyPizzatron = function() {
    if (gameInstance) {
      gameInstance.destroy(true);
      gameInstance = null;
    }
  };
})(window);
