import Phaser from 'phaser';
import { PreloadScene } from './PreloadScene';
import { MainScene } from './MainScene';

let gameInstance: Phaser.Game | null = null;

export function launchPizzatron(container: HTMLElement): void {
  if (gameInstance) {
    gameInstance.destroy(true);
    gameInstance = null;
  }

  gameInstance = new Phaser.Game({
    type: Phaser.AUTO,
    parent: container,
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

export function destroyPizzatron(): void {
  if (gameInstance) {
    gameInstance.destroy(true);
    gameInstance = null;
  }
}
