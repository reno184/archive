import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-right',
  templateUrl: './menu-right.component.html',
  styleUrls: ['./menu-right.component.sass']
})
export class MenuRightComponent implements OnInit {

  obs$: Observable<string | undefined>;


  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.obs$ = this.activatedRoute.queryParams.pipe(map(params => params['menu-right']));
  }


}
