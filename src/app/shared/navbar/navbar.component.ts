import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface GameCard {
  key: string;
  title: string;
  img: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // pestañas superiores
  tabs: string[] = ['Inicio', 'Singleplayer', 'Multiplayer'];
  activeTab = 'Inicio';

  // juego que acaba de arrancar (para resaltar)
  selectedGame: string | null = null;

  // datos de juegos
  singleplayer: GameCard[] = [
    { key: 'pizzatron',    title: 'Pizzatron 3000',    img: '/assets/phaser/games/pizzatron.png' },
    { key: 'bean-counters',title: 'Bean Counters',     img: '/assets/phaser/games/BeanCounters.png' }
  ];

  multiplayer: GameCard[] = [
    { key: 'mancala',      title: 'Mancala',           img: '/assets/phaser/games/mancala.png' },
    { key: 'cardjitsu',    title: 'Card Jitsu',        img: '/assets/phaser/games/cardjitsu.png' },
    { key: 'sledracing',      title: 'Sled Racing', img: '/assets/phaser/games/sledRacing.png' },
    { key: 'cuatroenraya', title: 'Cuatro en Raya',    img: '/assets/phaser/games/cuatroenraya.png' }
  ];

  constructor(private router: Router) { }

  // cambia la pestaña superior
  selectTab(tab: string) {
    this.activeTab = tab;
  }

  // lanza el juego, guarda cuál fue y navega
  goToGame(key: string) {
    this.selectedGame = key;
    this.router.navigate([`/games/${key}`]);
  }
}
