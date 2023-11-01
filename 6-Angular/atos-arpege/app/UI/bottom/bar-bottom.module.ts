import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarBottomComponent } from './bar-bottom.component';
import { PanelAltitudeComponent } from './elevation/panel-altitude.component';

@NgModule({
  declarations: [BarBottomComponent, PanelAltitudeComponent],
  imports: [
    CommonModule
  ],
  exports: [BarBottomComponent]
})
export class BarBottomModule {
}
