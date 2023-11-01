import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as foAction from '../../../../store/featureStates/fo/fo.action';
import { Subscription } from 'rxjs';
import { FoDetailLabel } from './fo-detail.label';
import Labels from './fo-detail.label.json';
import * as foReducer from '../../../../store/featureStates/fo/fo.reducer';
import { StaticDatas } from '../../../../labels.static';

@Component({
  selector: 'app-fo-detail',
  templateUrl: './fo-detail.component.html'
})
export class FoDetailComponent implements OnInit, OnDestroy {

  labels: FoDetailLabel = Labels;
  formGroup: FormGroup;
  sub1: Subscription;
  sub2: Subscription;
  queryParams$ = this.activatedRoute.queryParams;
  submitting$ = this.store.pipe(select(foReducer.selectFOSubmitting));


  // todo voir pour le virer le button histoiry back, passer un parametre pour conntaire le referer soit le formulaire setup soit la library fo list
  constructor(private store: Store<any>, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              public staticDatas: StaticDatas, private router: Router) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: '0',
      FO_COLOR: 'blue',
      FO_NAME: ['', Validators.required],
      FO_STATUS: true,
      FO_MODE: '0',
      FO_FREQ: 8000,
      FO_PRI: 1000,
      FO_LI: 0,
      FO_RT: 6,
      FO_ATTEN: 5,
      FO_CLASS: '0',
      FO_MAX_TARGET: 1,
      FO_KILL_STATUS: 'true',
      FO_KILL: 7,
      FO_ALT_MIN: 8,
      FO_ALT_MAX: 9,
      FO_RAD_MIN: 10,
      FO_RAD_MAX: 11
    });

    this.sub1 = this.activatedRoute.queryParams
      .pipe(
        filter(params => (params.id)),
        switchMap(params => this.store.select(foReducer.selectFoById, { id: params.id })),
        filter(result => result)
      ).subscribe((result) => {
        this.formGroup.patchValue(result);
      });

    this.sub2 = this.store.select(foReducer.getNewSetup).pipe(filter(x => !!x), take(1)).subscribe(id => {
      this.router.navigate(['/', { outlets: { front: 'front/fo/detail' } }], { queryParams: { id } });
      this.store.dispatch(foAction.idReset());
    });
  }

  onSubmit() {
    const body = this.formGroup.value;
    if (this.formGroup.get('id').value === '0') {
      this.store.dispatch(foAction.POSTRequest({ body }));
    } else {
      this.store.dispatch(foAction.PUTRequest({ body, id: this.formGroup.get('id').value }));
    }
  }

  onColorChosen($event: Event) {
    this.formGroup.patchValue({ FO_COLOR: $event });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
