import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFoAll, getFoLoading } from '../../../../store/featureStates/fo/fo.reducer';
import { StaticDatas } from '../../../../labels.static';

@Component({
  selector: 'app-fo-list',
  templateUrl: './fo-list.component.html'
})
export class FoListComponent implements OnInit {

  FoList$ = this.store.pipe(select(getFoAll));
  loading$ = this.store.pipe(select(getFoLoading));

  constructor(private store: Store<any>, public staticDatas: StaticDatas) {
  }

  ngOnInit() {
  }
}
