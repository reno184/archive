import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[AutoFocusInput]'
})
export class AutofocusInputDirective implements OnInit {
    @Input() public appAutoFocus: boolean;

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        setTimeout(() => {
            this.el.nativeElement.focus();
        }, 500);
    }
}
