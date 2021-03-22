import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameModule } from './game/game.module';
import { LoginComponent } from './login/login.component';
import { CanAccessGamePageGuard } from './guards/can-access-game-page.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => GameModule,
    canActivate: [CanAccessGamePageGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
