import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Game1Component } from './games/game1/game1.component';
import { Game2Component } from './games/game2/game2.component';
import { LandingComponent } from './loading/loading.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'app-game1', component: Game1Component },
  { path: 'app-game2', component: Game2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
