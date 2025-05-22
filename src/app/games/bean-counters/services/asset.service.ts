import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private images: { [key: string]: HTMLImageElement } = {};
  private sounds: { [key: string]: HTMLAudioElement } = {};

  /**
   * Precarga todas las imágenes y sonidos necesarios.
   */
  preload(): Promise<void> {
    const imgList = [
      // Obstáculos y bolsas
      'Assets/Hazards/Bag_1.png',
      'Assets/Hazards/Bag_2.png',
      'Assets/Hazards/Bag_3.png',
      'Assets/Hazards/Anvil.png',
      'Assets/Hazards/Fish.png',
      'Assets/Hazards/Vase.png',
      'Assets/Hazards/Life.png',
      // Jugador (estados normales y “muerto”)
      'Assets/Player/0.png',
      'Assets/Player/1.png',
      'Assets/Player/2.png',
      'Assets/Player/3.png',
      'Assets/Player/4.png',
      'Assets/Player/5.png',
      'Assets/Player/Anvil_Dead.png',
      'Assets/Player/Fish_Dead.png',
      // Camión y plataforma
      'Assets/Truck.png',
      'Assets/Platform.png',
      // Fondos de end screen
      'Assets/WinBeanCounter.png',
      'Assets/GameOverBeanCounter.png'
    ];

    const soundList = [
      // Música
      'Assets/Sounds/Music.mp3',
      // Efectos de recoger y colocar
      'Assets/Sounds/Catch.mp3',
      'Assets/Sounds/Hit.mp3',
      'Assets/Sounds/Place.mp3',
      'Assets/Sounds/Life.mp3',
      // Sonidos al caer
      'Assets/Sounds/Bag_Land.mp3',
      'Assets/Sounds/Anvil_Land.mp3',
      'Assets/Sounds/Fish_Land.mp3',
      'Assets/Sounds/Vase_Land.mp3'
    ];

    const loadImage = (path: string) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.src = `/assets/bean-counters/${path}`;
        img.onload = () => {
          this.images[path] = img;
          res();
        };
        img.onerror = () => {
          console.warn('Failed to load image:', path);
          res();
        };
      });

    const loadSound = (file: string) =>
      new Promise<void>((res) => {
        const audio = new Audio(`/assets/bean-counters/${file}`);
        audio.oncanplaythrough = () => {
          this.sounds[file] = audio;
          res();
        };
        audio.onerror = () => {
          console.warn('Failed to load sound:', file);
          res();
        };
      });

    return Promise
      .all([
        ...imgList.map(p => loadImage(p)),
        ...soundList.map(s => loadSound(s))
      ])
      .then(() => {});
  }

  /**
   * Recupera una imagen precargada.
   */
  getImage(path: string): HTMLImageElement {
    return this.images[path];
  }

  /**
   * Reproduce un sonido. Clona el audio para permitir solapamientos.
   */
  playSound(
    fileName:
      'Music.mp3'       |
      'Catch.mp3'       |
      'Hit.mp3'         |
      'Place.mp3'       |
      'Life.mp3'        |
      'Bag_Land.mp3'    |
      'Anvil_Land.mp3'  |
      'Fish_Land.mp3'   |
      'Vase_Land.mp3'
  ): void {
    const key = `Assets/Sounds/${fileName}`;
    const s = this.sounds[key];
    if (!s) return;
    const copy = s.cloneNode(true) as HTMLAudioElement;
    copy.play();
  }
}
