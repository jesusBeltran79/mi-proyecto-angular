import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  lives = 3;
  score = 0;
  finalPosition = 1;
  level = 1;

  private startTime = 0;
  private gameOverSubject = new Subject<void>();
  gameOver$ = this.gameOverSubject.asObservable();

  initGame(canvas: HTMLCanvasElement): void {
    this.reset();
    this.startTime = performance.now();
  }

  // Llama esto en cada frame para ajustar nivel
  updateLevel(): void {
    const elapsed = performance.now() - this.startTime;
    const newLevel = Math.floor(elapsed / 60000) + 1; // cada 60s sube un nivel
    if (newLevel > this.level) {
      this.level = newLevel;
    }
  }

  // Intervalo de spawn en ms, mínimo 300
  get spawnInterval(): number {
    return Math.max(300, 1000 - (this.level - 1) * 100);
  }

  // Velocidad de caída de objetos
  get objectSpeed(): number {
    return 4 + (this.level - 1) * 1.5;
  }

  loseLife(): void {
    this.lives--;
    if (this.lives <= 0) {
      this.endGame(4);
    }
  }

  addScore(points: number): void {
    this.score += points;
  }

  endGame(position: number): void {
    this.finalPosition = position;
    this.gameOverSubject.next();
  }

  getTimeElapsed(): string {
    const ms = performance.now() - this.startTime;
    const d = new Date(ms);
    const pad = (n: number, z = 2) => n.toString().padStart(z, '0');
    return `${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}:${pad(d.getUTCMilliseconds(), 3)}`;
  }

  private reset(): void {
    this.lives = 3;
    this.score = 0;
    this.finalPosition = 1;
    this.level = 1;
  }
}
