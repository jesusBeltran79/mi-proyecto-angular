import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  standalone: false,
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {
  stack: number[] = [];

  constructor(private game: GameStateService) {}

  ngOnInit(): void {
    this.game.platform$.subscribe(count => {
      this.stack = Array(count).fill(0);
    });
  }

  onClick(): void {
    this.game.unload();
  }
}
