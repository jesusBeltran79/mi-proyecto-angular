import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  standalone: false,
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {
  constructor(public game: GameStateService) { }

  ngOnInit(): void {
    // Empieza a emitir objetos desde el servicio
  }
}
