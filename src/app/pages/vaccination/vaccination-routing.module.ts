import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VaccinationPage } from './vaccination';
const routes: Routes = [
  {
    path: '',
    component: VaccinationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinationPageRoutingModule { }
