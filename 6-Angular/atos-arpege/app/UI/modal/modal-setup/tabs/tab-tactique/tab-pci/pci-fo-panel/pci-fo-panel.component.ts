import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { selectFoById } from '../../../../../../../store/featureStates/fo/fo.reducer';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AppInitService } from '../../../../../../../app.init.service';
import { FoModel } from '@arpege/models';
import { StaticDatas } from '../../../../../../../labels.static';

@Component({
  selector: 'app-pci-fo-panel',
  templateUrl: './pci-fo-panel.component.html'
})
export class PciFoPanelComponent implements OnInit, OnChanges {

  foInfo: FoModel;
  @Input() foDetailId: string;

  constructor(private store: Store<any>, public appInitService: AppInitService, public staticDatas: StaticDatas) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    of(changes.foDetailId.currentValue).pipe(
      mergeMap(x => this.store.pipe(select(selectFoById, { id: x })))
    ).subscribe(element => {
      this.foInfo = element;
    });
  }

}
