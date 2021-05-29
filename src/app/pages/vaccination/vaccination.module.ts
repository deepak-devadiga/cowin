import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VaccinationPage } from './vaccination';
import { VaccinationPageRoutingModule } from './vaccination-routing.module';
import { FormsModule } from '@angular/forms';
import { AccordionComponent } from '../../shared/accordion/accordion.component';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { NoDataComponent } from '../../shared/no-data/no-data.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VaccinationPageRoutingModule,
    FormsModule,
  ],
  declarations: [VaccinationPage, AccordionComponent, CalendarComponent, NoDataComponent],
})
export class VaccinationModule { }
