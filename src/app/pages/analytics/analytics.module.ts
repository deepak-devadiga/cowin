import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AnalyticsPage } from './analytics';
import { AnalyticsPageRoutingModule } from './analytics-routing.module';
import { ChartComponent } from '../../shared/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { DataIssueComponent } from '../../shared/data-issue/data-issue.component';

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
    ChartComponent,
    DataIssueComponent
  ],
  entryComponents: [
  ]
})
export class AnalyticsModule { }
