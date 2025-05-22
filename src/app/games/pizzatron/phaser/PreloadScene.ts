import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    const p = 'assets/phaser/assets/';

    // Fondo y cinta
    this.load.image('background',   p + 'Background.png');
    this.load.image('conveyorBase', p + 'ConveyorBase.png');
    this.load.image('conveyorBelt', p + 'ConveyorBelt.png');

    // Ending screens
    this.load.image('losePizzatron', p + 'Ending/1.png');
    this.load.image('winPizzatron',  p + 'Ending/4.png');

    // Pizza
    this.load.image('base',  p + 'Pizza/Base.png');
    this.load.image('crust', p + 'Pizza/Crust.png');

    // Caja de ingrediente
    this.load.image('ingredientBox', p + 'Holders/Box.png');

    // Ingredientes menú
    this.load.image('Cheese',  p + 'Ingredients/Cheese.png');
    this.load.image('Fish',    p + 'Ingredients/Fish.png');
    this.load.image('Seaweed', p + 'Ingredients/Seaweed.png');
    this.load.image('Shrimp',  p + 'Ingredients/Shrimp.png');
    this.load.image('Squid',   p + 'Ingredients/Squid.png');

    // Sprites “food”
    this.load.image('Cheese1',  p + 'Food/Cheese1.png');
    this.load.image('Cheese2',  p + 'Food/Cheese2.png');
    this.load.image('Fish1',    p + 'Food/Fish1.png');
    this.load.image('Fish2',    p + 'Food/Fish2.png');
    this.load.image('Fish3',    p + 'Food/Fish3.png');
    this.load.image('Seaweed1', p + 'Food/Seaweed1.png');
    this.load.image('Seaweed2', p + 'Food/Seaweed2.png');
    this.load.image('Seaweed3', p + 'Food/Seaweed3.png');
    this.load.image('Shrimp1',  p + 'Food/Shrimp1.png');
    this.load.image('Shrimp2',  p + 'Food/Shrimp2.png');
    this.load.image('Shrimp3',  p + 'Food/Shrimp3.png');
    this.load.image('Squid1',   p + 'Food/Squid1.png');
    this.load.image('Squid2',   p + 'Food/Squid2.png');
    this.load.image('Squid3',   p + 'Food/Squid3.png');

    // Order UI
    this.load.image('orderMenu', p + 'Orders/Menu.png');
    this.load.image('tick',      p + 'Orders/Tick.png');

    // Sonidos
    const s = p + 'Sounds/';
    this.load.audio('ding',  s + 'Use_Pizza.mp3');
    this.load.audio('buzz',  s + 'Splat.mp3');
    this.load.audio('music', s + 'Music.mp3');
  }

  create(): void {
    this.scene.start('MainScene');
  }
}
