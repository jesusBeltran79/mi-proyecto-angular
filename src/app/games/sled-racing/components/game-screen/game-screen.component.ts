// src/app/games/sled-racing/components/game-screen/game-screen.component.ts

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener
} from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { PhysicsService }   from '../../services/physics.service';
import { AssetService }     from '../../services/asset.service';

type ObjType = 'obstacle' | 'turbo' | 'shield' | 'coin';
interface GameObject {
  img: HTMLImageElement;
  x: number;
  y: number;
  type: ObjType;
}

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  standalone: false,
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private bg!: HTMLImageElement;
  private playerImg!: HTMLImageElement;
  private lastSpawn = 0;
  private objects: GameObject[] = [];
  private rafId!: number;

  // Declaraciones de sonido sin inicializar
  private sndCrash!: HTMLAudioElement;
  private sndShield!: HTMLAudioElement;
  private sndBoost!: HTMLAudioElement;
  private sndCoin!: HTMLAudioElement;

  constructor(
    private state:   GameStateService,
    private physics: PhysicsService,
    private assets:  AssetService
  ) {}

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Carga de imágenes
    this.bg        = this.assets.loadImage('track.png');
    this.playerImg = this.assets.loadImage('sled.png');

    // Carga de sonidos
    this.sndCrash  = this.assets.loadSound('crash.mp3');
    this.sndShield = this.assets.loadSound('shield.mp3');
    this.sndBoost  = this.assets.loadSound('boost.mp3');
    this.sndCoin   = this.assets.loadSound('coin.mp3');

    // Iniciar estado y bucle
    this.state.initGame(canvas);
    this.rafId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    this.physics.handleKey(event);
  }

  private gameLoop(timestamp: number): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar nivel
    this.state.updateLevel();

    // Scroll de fondo
    const offsetY = (timestamp / 4) % canvas.height;
    this.ctx.drawImage(this.bg, 0, offsetY - canvas.height, canvas.width, canvas.height);
    this.ctx.drawImage(this.bg, 0, offsetY, canvas.width, canvas.height);

    // Spawn según intervalo dinámico
    if (!this.lastSpawn || timestamp - this.lastSpawn > this.state.spawnInterval) {
      this.spawnObject();
      this.lastSpawn = timestamp;
    }

    // Física y jugador
    this.physics.update();
    const { x, y } = this.physics.getPlayerPos();
    this.ctx.drawImage(this.playerImg, x, y, 64, 64);

    // Objetos: caída con velocidad dinámica y colisiones
    this.objects = this.objects.filter(o => o.y < canvas.height + 48);
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i];
      obj.y += this.state.objectSpeed;
      this.ctx.drawImage(obj.img, obj.x, obj.y, 48, 48);

      // AABB collision
      if (
        x < obj.x + 48 &&
        x + 64 > obj.x &&
        y < obj.y + 48 &&
        y + 64 > obj.y
      ) {
        switch (obj.type) {
          case 'obstacle':
            if (this.physics.isShieldActive()) this.sndShield.play();
            else { this.state.loseLife(); this.sndCrash.play(); }
            break;
          case 'shield':
            this.physics.activateShield(5000);
            this.sndShield.play();
            break;
          case 'turbo':
            this.physics.activateBoost(3000);
            this.sndBoost.play();
            break;
          case 'coin':
            this.state.addScore(100);
            this.sndCoin.play();
            break;
        }
        this.objects.splice(i, 1);
      }
    }

    this.rafId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  private spawnObject(): void {
    const r = Math.random() * 100;
    let type: ObjType;

    if (r < 10)      type = 'turbo';
    else if (r < 20) type = 'shield';
    else if (r < 30) type = 'coin';
    else             type = 'obstacle';

    const imgMap: Record<ObjType,string> = {
      obstacle: 'rock.png',
      turbo:    'turbo.png',
      shield:   'shield.png',
      coin:     'coin.png'
    };

    const img = this.assets.loadImage(imgMap[type]);
    const x   = Math.random() * (800 - 48);
    this.objects.push({ img, x, y: -48, type });
  }
}
