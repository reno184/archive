import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wiki.page',
  template: `
    <panel-wiki-list></panel-wiki-list>
  `,
  styles: [
  ]
})
export class WikiPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
