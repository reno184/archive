import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading, SelectSetupAll } from '../../../store/featureStates/setup-mission/setup.reducer';
import { MissionSetupModel } from '@arpege/models';


@Component({
  selector: 'app-mission-old',
  templateUrl: './modal-setup-list.component.html',
  styleUrls: ['./modal-setup-list.component.sass']
})

export class ModalSetupListComponent implements OnInit {
  list$: Observable<MissionSetupModel[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.list$ = this.store.pipe(select(SelectSetupAll));
    this.loading$ = this.store.pipe(select(selectLoading));
  }

  ngOnInit() {
  }

}
