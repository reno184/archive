import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLoadingButton]'
})
export class LoadingButtonDirective {
  @Input() libelle: string;

  @Input() set appLoadingButton(condition: boolean) {
    const elem = this.element.nativeElement;
    if (condition) {
      elem.style.width = elem.getBoundingClientRect().width + 'px';
      elem.innerHTML = '<i class="far fa-spinner fa-spin"></i>';
      // elem.querySelector('span').style.display = 'none';
    } else {
      elem.innerHTML = this.libelle;
    }
  }

  constructor(private element: ElementRef) {
  }

}
