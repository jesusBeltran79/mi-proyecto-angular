import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  standalone: false,
  styleUrls: ['./hud.component.css']
})
export class HudComponent implements OnInit, OnDestroy {
  time = '00:00:000';
  lives = 0;
  score = 0;
  position = '1/4';

  private sub!: Subscription;

  constructor(
    public state: GameStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Refresca el HUD cada 100ms
    this.sub = interval(100).subscribe(() => {
      this.time = this.state.getTimeElapsed();
      this.lives = this.state.lives;
      this.score = this.state.score;
      // si implementas posición dinámica, reemplaza este placeholder:
      this.position = `${this.state.finalPosition}/4`;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
