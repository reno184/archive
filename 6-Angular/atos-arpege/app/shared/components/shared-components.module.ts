import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';


@NgModule({
  declarations: [IconPickerComponent, ColorPickerComponent],
  imports: [
    CommonModule
  ],
  exports: [IconPickerComponent, ColorPickerComponent]
})
export class SharedComponentsModule {
}
