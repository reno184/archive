import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {updateScreenSize} from "../../../store/root.action";
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-size-detector',
    template: `
        <div data-role="sizeDetector">
            <div id="XS" class="d-block d-sm-none is-XS">xs</div>
            <div id="SM" class="d-none d-sm-block d-md-none is-SM">sm</div>
            <div id="MD" class="d-none d-md-block d-lg-none is-MD">md</div>
            <div id="LG" class="d-none d-lg-block d-xl-none is-LG">lg</div>
            <div id="XL" class="d-none d-xl-block is-XL">xl</div>
        </div>
    `,
    styles: [`
        :host{
            display: none;
        }
    `]
})
export class SizeDetectorComponent implements OnInit {

    /// Attention ne jamais mettre les listeners des composants écoutant dans le constructor, uniqument dans les ngOnInit
    constructor(private elementRef: ElementRef, private store: Store<any>) {
    }

    ngOnInit(): void {
        this.detectScreenSize();
    }


    @HostListener("window:resize", [])
    private onResize() {
        this.detectScreenSize();
    }

    private detectScreenSize() {
        const elements = this.elementRef.nativeElement.querySelectorAll('[data-role=sizeDetector] div');
        var size = 'XS';

        for (let ele of elements) {
            if (window.getComputedStyle(ele).display !== 'none') {
                size = ele.id
            }
        }
        this.store.dispatch(updateScreenSize({size}))
    }

}
