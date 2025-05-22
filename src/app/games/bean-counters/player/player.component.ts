import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  standalone: false,
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() x = 0;
  currentSprite = 0;      // índice de saco
  animSprite: string| null = null;

  constructor(private game: GameStateService) {}

  ngOnInit(): void {
    this.game.hitAnim$.subscribe(hit => {
      if (hit==='anvil')   this.animSprite = 'Anvil_Dead.png';
      else if (hit==='fish')this.animSprite = 'Fish_Dead.png';
      else                  this.animSprite = null;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.animSprite) {
      this.currentSprite = this.game.heldBags;
    }
  }
}
