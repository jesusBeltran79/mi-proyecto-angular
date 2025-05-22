import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeanCountersRoutingModule } from './bean-counters-routing.module';

import { StartScreenComponent } from './start-screen/start-screen.component';
import { InstructionModalComponent } from './instruction-modal/instruction-modal.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { EndScreenComponent } from './end-screen/end-screen.component';
import { TruckComponent } from './truck/truck.component';
import { PlayerComponent } from './player/player.component';
import { PlatformComponent } from './platform/platform.component';
import { HudComponent } from './hud/hud.component';

@NgModule({
  declarations: [
    StartScreenComponent,
    InstructionModalComponent,
     GameScreenComponent,
    EndScreenComponent,
    TruckComponent,
    PlayerComponent,
    PlatformComponent,
    HudComponent
  ],
  imports: [
    CommonModule,
    BeanCountersRoutingModule,

  ]
})
export class BeanCountersModule { }
