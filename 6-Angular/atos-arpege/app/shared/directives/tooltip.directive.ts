import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})

// implementation  : <span appTooltip [content]="'lorzmdsjdlfjssd s qdfjsjqfl sd f fskdsdjkfsdj'"></span>
export class TooltipDirective implements OnInit {
  @Input() isClickBehavior: boolean;

  constructor(private element: ElementRef) {
    element.nativeElement.style.position = 'relative';
  }

  ngOnInit(): void {

  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isClickBehavior) {
      this.element.nativeElement.querySelector('.tooltip').classList.add('in');
    }
  }

  @HostListener('click')
  click(): void {
    if (this.isClickBehavior) {
      const r = this.element.nativeElement.querySelector('.tooltip').classList;
      r.contains('in') ? r.remove('in') : r.add('in');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isClickBehavior) {
      this.element.nativeElement.querySelector('.tooltip').classList.remove('in');
    }
  }

}
