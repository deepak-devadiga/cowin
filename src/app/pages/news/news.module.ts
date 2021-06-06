import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news';
import { NewsPageRoutingModule } from './news-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    NewsPage,
  ]
})
export class NewsModule { }
