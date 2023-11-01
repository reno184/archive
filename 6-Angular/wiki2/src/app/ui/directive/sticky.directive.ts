import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {
 sticky = function(){
     const element = document.querySelector('[data-element-id]') as HTMLElement
     const sourceId = element.dataset['elementId']
     const target = document.querySelector(`[data-target-id="${sourceId}"]`) as HTMLElement
     if (target && element) {
         const posY = `top:${ target.getBoundingClientRect().bottom}px`
         const posX = `right:${window.innerWidth - target.getBoundingClientRect().right }px`
         element.setAttribute('style', `${element.getAttribute('style')};${posX};${posY}`)
     }
 }
  constructor() {
      console.log('init')
      setTimeout(()=>{
          this.sticky()
      },1)

  }
    @HostListener('window:resize', ['$event'])
    onScroll(event:Event) {
        this.sticky()
    }
}
