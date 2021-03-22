import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { MaterialModule } from '../material/material.module';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule
  ]
})
export class GameModule { }
