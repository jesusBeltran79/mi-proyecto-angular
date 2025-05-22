import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  standalone: false,
  styleUrls: ['./hud.component.css']
})
export class HudComponent implements OnInit {
  lives = 0;
  score = 0;
  level = 1;

  constructor(private game: GameStateService) {}

  ngOnInit(): void {
    this.game.lives$.subscribe(l => this.lives = l);
    this.game.score$.subscribe(s => this.score = s);
    this.game.level$.subscribe(lv => this.level = lv);
  }
}
