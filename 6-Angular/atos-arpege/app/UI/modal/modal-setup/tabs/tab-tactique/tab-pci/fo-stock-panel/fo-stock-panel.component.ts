import { Component, OnInit } from '@angular/core';
import { SetupFormService } from '../../../../../../../shared/services/setup-form.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getFoAll, getFoLoading } from '../../../../../../../store/featureStates/fo/fo.reducer';
import { FoModel } from '@arpege/models';

@Component({
  selector: 'app-fo-stock-panel',
  templateUrl: './fo-stock-panel.component.html'
})
export class FoStockPanelComponent implements OnInit {
  foList$: Observable<FoModel[]>;
  loading$: Observable<boolean>;

  constructor(private setupFormService: SetupFormService, private store: Store<any>) {

    this.foList$ = this.store.pipe(select(getFoAll));
    this.loading$ = this.store.pipe(select(getFoLoading));
  }

  ngOnInit() {
  }

  onAttach(id: string, title: string) {
    this.setupFormService.addItem('fo-attached', { id, title });
  }


}
