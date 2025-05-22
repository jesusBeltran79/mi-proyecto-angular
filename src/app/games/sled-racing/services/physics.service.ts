import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class PhysicsService {
  private playerX = 368;
  private playerY = 500;
  private vy = 0;
  private gravity = 0.5;

  private shieldEnd = 0;
  private boostEnd = 0;

  constructor(private state: GameStateService) {}

  handleKey(e: KeyboardEvent): void {
    const speed = this.isBoostActive() ? 12 : 8;
    if (e.key === 'ArrowLeft')  { this.playerX = Math.max(0, this.playerX - speed); }
    if (e.key === 'ArrowRight') { this.playerX = Math.min(800 - 64, this.playerX + speed); }
    if (e.key === 'ArrowUp' && this.vy === 0) { this.vy = -12; }
  }

  update(): void {
    // salto y gravedad
    this.vy += this.gravity;
    this.playerY = Math.min(500, this.playerY + this.vy);
    if (this.playerY === 500) this.vy = 0;

    // aquí se podrían limpiar efectos expirados, pero isActive() los consulta
  }

  getPlayerPos(): { x: number; y: number } {
    return { x: this.playerX, y: this.playerY };
  }

  activateShield(durationMs: number): void {
    this.shieldEnd = performance.now() + durationMs;
  }

  activateBoost(durationMs: number): void {
    this.boostEnd = performance.now() + durationMs;
  }

  isShieldActive(): boolean {
    return performance.now() < this.shieldEnd;
  }

  isBoostActive(): boolean {
    return performance.now() < this.boostEnd;
  }
}
