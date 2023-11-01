import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  template: `
    <div style="width:20%;margin: 20px; padding: 20px">
        <panel-tag></panel-tag>
    </div>
  `,
  styles: [
  ]
})
export class SettingPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
