import { Component, EventEmitter, Output } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  standalone: false,
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent {
  @Output() playAgain = new EventEmitter<void>();
  @Output() toMenu    = new EventEmitter<void>();

  constructor(public gameState: GameStateService) {}

  onPlayAgain(): void {
    this.playAgain.emit();
  }

  onToMenu(): void {
    this.toMenu.emit();
  }
}
