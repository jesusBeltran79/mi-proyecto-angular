import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// Importa el launcher y destructor TypeScript desde tu módulo Game.ts
import { launchPizzatron, destroyPizzatron } from '../phaser/Game';

@Component({
  selector: 'app-play-pizzatron',
  template: `
    <div #gameContainer class="game-full"></div>
  `,
  standalone: false,
  styles: [`
    .game-full {
      width: 100%;
      height: calc(100vh - 64px); /* Ajusta si tu navbar mide distinto */
      overflow: hidden;
    }
  `]
})
export class PlayPizzatronComponent implements OnInit, OnDestroy {
  @ViewChild('gameContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    // Aseguramos contenedor vacío
    this.container.nativeElement.innerHTML = '';
    // Arrancamos el juego usando el módulo TS
    launchPizzatron(this.container.nativeElement);
  }

  ngOnDestroy(): void {
    // Destruimos la instancia de Phaser
    destroyPizzatron();
    // Limpiamos el div
    this.container.nativeElement.innerHTML = '';
  }
}
