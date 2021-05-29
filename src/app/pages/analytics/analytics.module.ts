import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AnalyticsPage } from './analytics';
import { AnalyticsPageRoutingModule } from './analytics-routing.module';
import { ChartComponent } from '../../shared/chart/chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyticsPageRoutingModule,
    ChartsModule
  ],
  declarations: [
    AnalyticsPage,
    ChartComponent
  ],
  entryComponents: [
  ]
})
export class AnalyticsModule { }
