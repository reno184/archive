import {Directive, ElementRef, HostListener, OnDestroy} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {delay, filter, map, Subscription, take} from 'rxjs'

@Directive({
    selector: '[appPopover]'
})
export class PopoverDirective implements OnDestroy {
    sub = new Subscription()

    constructor(private elementRef: ElementRef, private activatedRoute: ActivatedRoute) {

        this.sub = this.activatedRoute.queryParams.pipe(
            filter(params => !!params['popover'])
            , take(1)
            , delay(500)
            , map(params => params['popover'])).subscribe(targetId => {
            this.sticky(this.elementRef, targetId)
        })
    }

    sticky = function (elementRef: ElementRef, targetId: number) {
        const element = elementRef.nativeElement
        const target = document.getElementById(`popover_${targetId}`) as HTMLElement
        if (target) {
            const posY = `top:${target.getBoundingClientRect().bottom}px`
            const posX = `right:${window.innerWidth - target.getBoundingClientRect().right}px`
            element.setAttribute('style', `${element.getAttribute('style')};${posX};${posY}`)
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        // this.sticky()
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

}
