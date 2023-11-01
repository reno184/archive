import { Directive, HostListener, NgModule } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appLocationBack]'
})
export class LocationBackDirective {

  constructor(private location: Location) {
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}

@NgModule({
  declarations: [LocationBackDirective],
  exports: [LocationBackDirective]
})
export class LocationBackDirectiveModule {
}
