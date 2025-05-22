import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssetService {
  imgPath = '/assets/sled-racing/images';
  sndPath = '/assets/sled-racing/sounds';

  loadImage(name: string): HTMLImageElement {
    const img = new Image();
    img.src = `${this.imgPath}/${name}`;
    return img;
  }

  loadSound(name: string): HTMLAudioElement {
    const audio = new Audio(`${this.sndPath}/${name}`);
    audio.load();
    return audio;
  }
}
