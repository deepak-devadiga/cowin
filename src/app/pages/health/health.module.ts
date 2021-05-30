import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HealthPage } from './health';
import { HealthPageRoutingModule } from './health-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthPageRoutingModule
  ],
  declarations: [HealthPage],
  entryComponents: [],
  bootstrap: [HealthPage],
})
export class HealthModule { }
