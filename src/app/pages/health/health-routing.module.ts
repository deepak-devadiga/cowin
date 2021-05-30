import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthPage } from './health';

const routes: Routes = [
  {
    path: '',
    component: HealthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthPageRoutingModule { }
