import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  standalone: false,
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {
  finalScore = 0;
  finalLevel = 1;
  won = false;

  constructor(
    private game: GameStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.finalScore = this.game.score;
    this.finalLevel = this.game.level;
    this.won        = this.game.lives > 0;
  }

  onPlayAgain(): void {
    this.router.navigate(['games/bean-counters']);
  }

  onExit(): void {
    this.router.navigate(['']);
  }
}
