import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AssetService } from '../../services/asset.service';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    standalone: false,
    styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit, OnDestroy {
  @Output() play = new EventEmitter<void>();
  @Output() instructions = new EventEmitter<void>();

  private bgMusic!: HTMLAudioElement;

  constructor(private assets: AssetService) {}

  ngOnInit(): void {
    // Carga y reproduce música invernal en loop
    this.bgMusic = this.assets.loadSound('bg-music.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
    this.bgMusic.play();
  }

  ngOnDestroy(): void {
    this.bgMusic.pause();
  }

  onPlay(): void {
    this.bgMusic.pause();
    this.play.emit();
  }

  onShowInstructions(): void {
    this.instructions.emit();
  }
}
