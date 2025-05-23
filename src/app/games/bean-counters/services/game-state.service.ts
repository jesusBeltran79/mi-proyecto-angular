import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AssetService } from './asset.service';

export type DroppingObject = {
  id: number;
  type: 'bag' | 'life' | 'anvil' | 'fish' | 'vase';
  x0: number; y0: number; t: number;
  vx: number; vy: number; sprite: string;
};

@Injectable({ providedIn: 'root' })
export class GameStateService {
  public lives$     = new BehaviorSubject<number>(3);
  public score$     = new BehaviorSubject<number>(0);
  public level$     = new BehaviorSubject<number>(1);
  public platform$  = new BehaviorSubject<number>(0);
  /** Emite 'anvil' | 'fish' cuando golpean al jugador, o null */
  public hitAnim$   = new BehaviorSubject<'anvil' | 'fish' | null>(null);

  private heldBagCount = 0;
  private objects: DroppingObject[] = [];
  private nextId = 1;
  private loopSub: Subscription | null = null;
  private spawnTimer = 0;

  public playerX = 0;
  private readonly gravity       = 300;
  private readonly minSpeed      = 300;
  private readonly spawnInterval = 2;
  private readonly baseRadius    = 256 * 0.85*0.9; // 15% más pequeño

  private floorStartX = 150 * 1.15;
  private floorEndX   = window.innerWidth * 0.95 - 50;

  constructor(
    private assets: AssetService,
    private router: Router
  ) {}

  public async startGame(): Promise<void> {
    await this.assets.preload().catch(() => {});
    this.resetState();
    this.assets.playSound('Music.mp3');
    this.loopSub = interval(16).subscribe(() => this.step(0.016));
  }

  private resetState(): void {
    this.heldBagCount = 0;
    this.platform$.next(0);
    this.hitAnim$.next(null);
    this.objects = [];
    this.nextId = 1;
    this.spawnTimer = 0;
    this.lives$.next(3);
    this.score$.next(0);
    this.level$.next(1);
  }

  private step(dt: number): void {
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer -= this.spawnInterval;
      this.spawnObject();
    }
    this.objects.forEach(o => o.t += dt);
    this.checkCollisions();
  }

  private spawnObject(): void {
    const lvl = this.level$.value;
    let type: DroppingObject['type'] = 'bag';
    const rnd = Math.random();
    if (rnd < 0.05 && (lvl === 3 || lvl === 5)) type = 'life';
    else if (rnd < 0.1 && lvl >= 2)             type = 'anvil';
    else if (rnd < 0.2 && lvl >= 3)             type = 'fish';
    else if (rnd < 0.25 && lvl >= 4)            type = 'vase';

    const camX = window.innerWidth * 0.95 - 50;
    const camY = 50;
    const ang = (135 + Math.random() * 30) * Math.PI / 180;
    const v0  = this.minSpeed + Math.random() * 200;
    const vx  = v0 * Math.cos(ang);
    const vy  = -v0 * Math.sin(ang);

    const sprite = type === 'bag'
      ? `Bag_${Math.ceil(Math.random() * 3)}.png`
      : `${type.charAt(0).toUpperCase() + type.slice(1)}.png`;

    this.objects.push({ id: this.nextId++, type, x0: camX, y0: camY, t: 0, vx, vy, sprite });
  }

  private checkCollisions(): void {
    const floorY = window.innerHeight - 100;
    const px     = this.playerX;

    this.objects = this.objects.filter(o => {
      const x = o.x0 + o.vx * o.t;
      const y = o.y0 + o.vy * o.t + 0.5 * this.gravity * o.t * o.t;

      if (o.type === 'bag' && y >= window.innerHeight && x >= this.floorStartX && x <= this.floorEndX) {
        this.loseLife();
        return false;
      }
      if (y >= floorY && Math.abs(x - px) <= this.baseRadius) {
        this.triggerHitAnim(o.type);
        this.handleHit(o);
        return false;
      }
      return x >= 0 && x <= window.innerWidth && y <= window.innerHeight;
    });
  }

  private triggerHitAnim(type: DroppingObject['type']): void {
    if (type === 'anvil' || type === 'fish') {
      this.hitAnim$.next(type);
      setTimeout(() => this.hitAnim$.next(null), 1000);
    }
  }

  private handleHit(o: DroppingObject): void {
    switch (o.type) {
      case 'bag':
        // Incrementamos bolsas
        this.heldBagCount++;
        this.assets.playSound('Catch.mp3');
        // Si supera 5, perdemos una vida y reiniciamos bolsas a 0
        if (this.heldBagCount > 5) {
          this.loseLife();
          this.heldBagCount = 0;
        }
        break;
      case 'life':
        this.lives$.next(this.lives$.value + 1);
        this.assets.playSound('Life.mp3');
        break;
      case 'anvil':
        this.loseLife();
        this.assets.playSound('Anvil_Land.mp3');
        break;
      case 'fish':
        this.loseLife();
        this.assets.playSound('Fish_Land.mp3');
        break;
      case 'vase':
        this.loseLife();
        this.assets.playSound('Vase_Land.mp3');
        break;
    }
    // Tras obstáculos, aseguramos que bolsas quedan a 0
    if (o.type !== 'bag' && o.type !== 'life') {
      this.heldBagCount = 0;
    }
  }

  public unload(): void {
    if (this.heldBagCount > 0) {
      this.heldBagCount--;
      this.platform$.next(this.platform$.value + 1);
      this.score$.next(this.score$.value + 5 * this.level$.value);
      this.assets.playSound('Place.mp3');
      if (this.score$.value >= this.level$.value * 100) {
        this.advanceLevel();
      }
    }
  }

  private loseLife(): void {
    this.lives$.next(this.lives$.value - 1);
    if (this.lives$.value <= 0) {
      this.showEnd(false);
    }
  }

  private advanceLevel(): void {
    const nl = this.level$.value + 1;
    if (nl > 5) this.showEnd(true);
    else this.level$.next(nl);
  }

  private showEnd(won: boolean): void {
      this.loopSub?.unsubscribe();
      // Delay para permitir animación final
      setTimeout(() => {
      // Overlay que ocupa toda la ventana
      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: '9999'
      });

      // Imagen de fondo
      const bg = document.createElement('div');
      Object.assign(bg.style, {
        background: `url('/assets/bean-counters/Assets/${won ? 'WinBeanCounter' : 'GameOverBeanCounter'}.png') center/cover no-repeat`,
        position: 'absolute',
        top: '0', left: '0',
        width: '100%', height: '100%'
      });
      overlay.appendChild(bg);

      // Caja semitransparente negra para el texto y botones
      const box = document.createElement('div');
      Object.assign(box.style, {
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0,0,0,0.75)',
        padding: '40px',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#fff',
        maxWidth: '80%',
        boxSizing: 'border-box'
      });

      // Título
      const title = document.createElement('h1');
      title.textContent = won ? '¡Eres un Maestro Carguero!' : 'Eres un Aprendiz Carguero';
      title.style.fontSize = '3rem';
      title.style.marginBottom = '20px';
      box.appendChild(title);

      // Puntuación
      const scoreEl = document.createElement('p');
      scoreEl.textContent = 'Score: ' + this.score$.value;
      scoreEl.style.fontSize = '1.5rem';
      scoreEl.style.marginBottom = '30px';
      box.appendChild(scoreEl);

      // Botones
      const btnPlay = document.createElement('button');
      btnPlay.textContent = 'Volver a Jugar';
      Object.assign(btnPlay.style, {
        margin: '10px',
        padding: '12px 24px',
        fontSize: '1.2rem',
        cursor: 'pointer'
      });
      btnPlay.onclick = () => window.location.reload();
      box.appendChild(btnPlay);

      const btnExit = document.createElement('button');
      btnExit.textContent = 'Salir';
      Object.assign(btnExit.style, {
        margin: '10px',
        padding: '12px 24px',
        fontSize: '1.2rem',
        cursor: 'pointer'
      });
      btnExit.onclick = () => window.location.href = '/';
      box.appendChild(btnExit);

      overlay.appendChild(box);
      document.body.appendChild(overlay);
    }, 500);
  }

  public updatePlayerPosition(x: number): void {
    this.playerX = x;
  }

  public getObjects(): DroppingObject[] {
    return this.objects;
  }

  public get score(): number   { return this.score$.value; }
  public get level(): number   { return this.level$.value; }
  public get lives(): number   { return this.lives$.value; }
  public get heldBags(): number{ return this.heldBagCount; }
}
