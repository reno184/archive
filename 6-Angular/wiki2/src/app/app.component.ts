import {Component, isDevMode} from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
<div style="position: relative;height: 100%"  >
  <div style="height:100%;display: flex;flex-direction: column">
      <header style="width: 100%; text-align: center">
          <ul>
              <a [routerLink]="['/']">Auth</a>
              <a [routerLink]="['/wiki']">|wiki</a>
              <a [routerLink]="['/setting']">|setting</a>
          </ul>
      </header>
      <div style="flex: 1;">
          <router-outlet></router-outlet>
      </div>
      <footer style="margin-bottom: 30px">
          <small>isDev: {{isDev}}</small>
      </footer>
  </div>
  <router-outlet name="modal" ></router-outlet> 
</div>
  `,
  styles: [
      'input[type=submit] { border:solid 1px #ccc }',
      `a{color: inherit; text-decoration: none}`
  ]
})
export class AppComponent {
  isDev= false;
  constructor() {
      this.isDev=  isDevMode()
  }
}
