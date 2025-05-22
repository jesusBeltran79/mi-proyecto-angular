import { Component, OnInit, HostListener } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

interface RenderObj { id:number; sprite:string; x:number; y:number; }

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  standalone: false,
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {
  renderObjects: RenderObj[] = [];
  changingLevel = false;

  constructor(public game: GameStateService) {}

  ngOnInit(): void {
    this.game.startGame();
    this.game.level$.subscribe(()=>this.triggerFade());
    setInterval(()=> this.updateRenderObjects(), 16);
  }

  @HostListener('mousemove',['$event'])
  onMouseMove(e:MouseEvent){
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    this.game.updatePlayerPosition(x);
  }

  private updateRenderObjects(): void {
    this.renderObjects = this.game.getObjects().map(o => {
      const x = o.x0 + o.vx*o.t;
      const y = o.y0 + o.vy*o.t + 0.5*(this.game as any).gravity*o.t*o.t;
      return { id:o.id, sprite:o.sprite, x, y };
    });
  }

  onAnimationEnd(id:number): void {
    // no había removeObject; quitamos llamada
  }

  private triggerFade(): void {
    this.changingLevel = true;
    setTimeout(()=>this.changingLevel=false,500);
  }

  trackById(_:number, o:RenderObj):number { return o.id; }
}
