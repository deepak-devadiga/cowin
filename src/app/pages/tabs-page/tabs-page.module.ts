import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { HealthModule } from '../health/health.module';
import { NewsModule } from '../news/news.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { VaccinationModule } from '../vaccination/vaccination.module';



@NgModule({
  imports: [
    HealthModule,
    CommonModule,
    IonicModule,
    NewsModule,
    AnalyticsModule,
    SessionDetailModule,
    SpeakerDetailModule,
    VaccinationModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TabsModule { }
