import Phaser from 'phaser';

type Order = { requiredToppings: string[] };

export class MainScene extends Phaser.Scene {
  private belt!: Phaser.GameObjects.TileSprite;
  private pizzaBase!: Phaser.GameObjects.Sprite;
  private pizzaCrust!: Phaser.GameObjects.Sprite;
  private toppingSprites: Phaser.GameObjects.Image[] = [];
  private pizzaStartX = 100;
  private pizzaSpeed = 100;
  private currentOrder!: Order;
  private collectedToppings: string[] = [];
  private score = 0;
  private lives = 3;
  private scoreText!: Phaser.GameObjects.Text;
  private livesText!: Phaser.GameObjects.Text;
  private orderText!: Phaser.GameObjects.Text;
  private orderBox!: Phaser.GameObjects.Image;
  private tickIcon!: Phaser.GameObjects.Image;
  private music!: Phaser.Sound.BaseSound;

  private menuToppings = ['Cheese','Fish','Seaweed','Shrimp','Squid'];
  private variantMap: Record<string,string[]> = {
    Cheese:  ['Cheese1','Cheese2'],
    Fish:    ['Fish1','Fish2','Fish3'],
    Seaweed: ['Seaweed1','Seaweed2','Seaweed3'],
    Shrimp:  ['Shrimp1','Shrimp2','Shrimp3'],
    Squid:   ['Squid1','Squid2','Squid3']
  };

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    // 1) Fondo
    this.add.image(0, 0, 'background').setOrigin(0);

    // 2) Cinta
    const conveyorY = 520;
    this.add.image(0, conveyorY, 'conveyorBase').setOrigin(0);
    this.belt = this.add
      .tileSprite(0, conveyorY + 20, this.scale.width, 90, 'conveyorBelt')
      .setOrigin(0)
      .setScale(1);

    // 3) HUD
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '24px Luckiest Guy',
      color: '#ffff00'
    });
    this.livesText = this.add.text(16, 48, 'Lives: 3', {
      font: '24px Luckiest Guy',
      color: '#ffff00'
    });

    // 4) Order UI
    const baseX = this.scale.width - 310;
    const baseY = 230;
    const boxX  = baseX + 210 - 70 - 60;
    const boxY  = baseY - 50;
    this.orderBox = this.add.image(boxX, boxY, 'orderMenu')
      .setOrigin(0.5)
      .setScale(0.36);
    this.orderText = this.add.text(boxX, boxY, '', {
      font: '18px Luckiest Guy',
      color: '#003366',
      align: 'center',
      wordWrap: { width: this.orderBox.displayWidth - 20 }
    }).setOrigin(0.5);
    this.tickIcon = this.add.image(
      boxX + this.orderBox.displayWidth * 0.3 - 60,
      boxY,
      'tick'
    )
      .setOrigin(0.5)
      .setScale(0.6)
      .setDepth(10)
      .setVisible(false);

    // 5) Ingredientes — cajas +30% luego +20% = +56% total,
    //    con offsets específicos por tipo
    const holderY = 440;
    const iconScale = 0.2;
    const margin = 40;
    const totalWidth = this.scale.width - margin * 2;
    const spacing = totalWidth / (this.menuToppings.length - 1);

    this.menuToppings.forEach((key, i) => {
      const basePosX = margin + i * spacing;
      // determina offsets
      let dxBox = 0, dyBox = 0, dxIcon = 0, dyIcon = 0;
      if (key === 'Cheese') { dxBox = 65; dyBox = -20; dxIcon = 65; dyIcon = -40; }
      if (key === 'Fish')   { dxBox = -40; dyBox = -20; dxIcon = -40; dyIcon = -40; }
      if (key === 'Seaweed'){ dxBox=-139;dyBox = -20;dxIcon=-139; dyIcon = -40; }
      if (key === 'Shrimp') { dxBox = -240; dyBox = -20; dxIcon = -240; dyIcon = -35; }
      if (key === 'Squid')  { dxBox = -340;dyBox=-20; dxIcon = -340; dyIcon=-25;}

      const boxX = basePosX + dxBox;
      const boxY = holderY + dyBox;
      // caja escalada
      this.add.image(boxX, boxY, 'ingredientBox')
        .setOrigin(0.5)
        .setScale(0.5 * 1.3 * 1.2, 0.8 * 1.3 * 1.2);
      // icono encima
      const yAdj = key === 'Cheese' ? -8 : 0;
      const iconX = basePosX + dxIcon;
      const iconY = holderY + yAdj + dyIcon;
      this.add.image(iconX, iconY, key)
        .setInteractive({ useHandCursor: true })
        .setScale(iconScale)
        .on('pointerdown', () => this.spawnToppingSprite(key));
    });

    // 6) Música
    this.music = this.sound.add('music', { loop: true, volume: 0.5 });
    this.music.play();

    // 7) Primera orden y pizza
    this.nextOrder();
    this.spawnPizza();
  }

  override update(_: number, delta: number): void {
    this.belt.tilePositionX += delta * 0.1;
    if (this.pizzaBase && this.pizzaCrust) {
      const mv = (this.pizzaSpeed * delta) / 1000;
      this.pizzaBase.x += mv;
      this.pizzaCrust.x += mv;
      if (this.pizzaBase.x >= this.scale.width + this.pizzaBase.displayWidth / 2) {
        this.onPizzaEnd(false);
      }
    }
  }

  private spawnPizza(): void {
    if (this.pizzaBase) {
      this.pizzaBase.destroy();
      this.pizzaCrust.destroy();
      this.toppingSprites.forEach(s => s.destroy());
      this.toppingSprites = [];
    }
    this.pizzaCrust = this.add.sprite(this.pizzaStartX, 580, 'crust')
      .setOrigin(0.5)
      .setScale(0.4);
    this.pizzaBase = this.add.sprite(this.pizzaStartX, 580, 'base')
      .setOrigin(0.5)
      .setScale(0.4);
    this.collectedToppings = [];
  }

  private nextOrder(): void {
    // 1 a 6 ingredientes, pueden repetirse
    const n = Phaser.Math.Between(1, 6);
    const req: string[] = [];
    for (let i = 0; i < n; i++) {
      req.push(Phaser.Utils.Array.GetRandom(this.menuToppings));
    }
    this.currentOrder = { requiredToppings: req };
    this.orderText.setText(
      req.map(t => t.toUpperCase()).join('\n')
    );
  }

  private spawnToppingSprite(key: string): void {
    if (this.collectedToppings.length >= this.currentOrder.requiredToppings.length) return;
    if (!this.currentOrder.requiredToppings.includes(key)) { this.onPizzaEnd(false); return; }
    const used = this.collectedToppings.filter(t => t === key).length;
    const need = this.currentOrder.requiredToppings.filter(t => t === key).length;
    if (used >= need) { this.onPizzaEnd(false); return; }

    this.collectedToppings.push(key);
    this.sound.play('ding');
    const varKey = Phaser.Utils.Array.GetRandom(this.variantMap[key]);
    const ox = Phaser.Math.Between(-20, 20);
    const oy = Phaser.Math.Between(-20, 20);
    const spr = this.add.image(this.pizzaBase.x + ox, this.pizzaBase.y + oy, varKey)
      .setScale(0.3);
    this.toppingSprites.push(spr);
    this.tweens.add({
      targets: spr,
      x: `+=${this.scale.width}`,
      duration: ((this.scale.width - this.pizzaStartX) / this.pizzaSpeed) * 1000,
      ease: 'Linear'
    });

    if (this.collectedToppings.length === this.currentOrder.requiredToppings.length) {
      this.onPizzaEnd(true);
    }
  }

  private onPizzaEnd(success: boolean): void {
    this.pizzaBase.destroy();
    this.pizzaCrust.destroy();
    this.toppingSprites.forEach(s => s.destroy());
    this.toppingSprites = [];

    if (success) {
      this.score += 100 * this.currentOrder.requiredToppings.length;
      this.scoreText.setText('Score: ' + this.score);
      this.sound.play('ding');
      this.pizzaSpeed += 20;
      this.tickIcon.setVisible(true);
      this.time.delayedCall(2000, () => this.tickIcon.setVisible(false));
      if (this.score >= 3500) return this.showModal('master');
    } else {
      this.lives--;
      this.livesText.setText('Lives: ' + this.lives);
      this.sound.play('buzz');
      if (this.lives <= 0) return this.showModal('apprentice');
    }

    this.nextOrder();
    this.spawnPizza();
  }

  private showModal(type: 'master' | 'apprentice') {
    const overlay = document.createElement('div');
    overlay.id = 'endModal';
    Object.assign(overlay.style, {
      position: 'fixed', top: '0', left: '0',
      width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.75)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: '9999'
    });

    const box = document.createElement('div');
    Object.assign(box.style, {
      background: '#222', padding: '20px',
      borderRadius: '12px', textAlign: 'center'
    });

    const img = document.createElement('img');
    img.src = type === 'master'
      ? 'assets/phaser/assets/Ending/4.png'
      : 'assets/phaser/assets/Ending/1.png';
    img.style.width = '300px';
    box.appendChild(img);

    const msg = document.createElement('h1');
    msg.textContent = type === 'master'
      ? '¡Eres un Maestro Pizzero!'
      : 'Eres un Aprendiz Pizzero';
    msg.style.color = '#fff';
    box.appendChild(msg);

    const scoreEl = document.createElement('p');
    scoreEl.textContent = 'Score: ' + this.score;
    scoreEl.style.color = '#fff';
    box.appendChild(scoreEl);

    const btnPlay = document.createElement('button');
    btnPlay.textContent = 'Volver a Jugar';
    Object.assign(btnPlay.style, { margin: '8px', padding: '10px 20px', cursor: 'pointer' });
    btnPlay.onclick = () => {
      overlay.remove();
      window.location.reload();
    };
    box.appendChild(btnPlay);

    const btnExit = document.createElement('button');
    btnExit.textContent = 'Salir';
    Object.assign(btnExit.style, { margin: '8px', padding: '10px 20px', cursor: 'pointer' });
    btnExit.onclick = () => {
      overlay.remove();
      window.location.href = '/games/pizzatron';
    };
    box.appendChild(btnExit);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  private gameOver(): void {}
}
