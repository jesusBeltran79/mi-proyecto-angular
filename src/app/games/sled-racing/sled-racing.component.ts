import { Component } from '@angular/core';
import { GameStateService } from './services/game-state.service';

type Stage = 'start' | 'instructions' | 'playing' | 'end';

@Component({
  selector: 'app-sled-racing',
  templateUrl: './sled-racing.component.html',
  standalone: false,
  styleUrls: ['./sled-racing.component.css']
})
export class SledRacingComponent {
  stage: Stage = 'start';

  constructor(private state: GameStateService) {
    this.state.gameOver$.subscribe(() => this.stage = 'end');
  }

  onPlay(): void {
    this.stage = 'playing';
  }

  onShowInstructions(): void {
    this.stage = 'instructions';
  }

  onCloseInstructions(): void {
    this.stage = 'start';
  }

  onPlayAgain(): void {
    this.stage = 'playing';
  }

  onToMenu(): void {
    this.stage = 'start';
  }
}
