import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { PopoverListComponent } from './popover/popover.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [HeaderComponent, PopoverListComponent],
  exports: [HeaderComponent, PopoverListComponent]
})
export class SharedModule { }
