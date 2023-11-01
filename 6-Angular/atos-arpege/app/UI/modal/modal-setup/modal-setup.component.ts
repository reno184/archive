import { Component, OnDestroy, OnInit } from '@angular/core';
import { idReset, POSTRequest, PUTRequest } from '../../../store/featureStates/setup-mission/setup.action';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SetupFormService } from '../../../shared/services/setup-form.service';
import * as setupReducer from '../../../store/featureStates/setup-mission/setup.reducer';
import { MissionSetupModel } from '@arpege/models';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { getPciArray } from '../../../store/featureStates/SceneState/SceneReducer';


@Component({
  selector: 'app-modal-mission',
  templateUrl: './modal-setup.component.html'
})
export class ModalMissionComponent implements OnInit, OnDestroy {

  rootGroup: FormGroup;
  submitting$ = this.store.pipe(select(setupReducer.selectSubmitting));
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  params$ = this.activatedRoute.queryParams;

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private setupFormService: SetupFormService
  ) {
  }

  ngOnInit() {

    this.setupFormService.initForm();
    this.rootGroup = this.setupFormService.rootFormGroup();

    // Ecoute si un nouveau setup ajouté si oui alors passage automatique en mode update
    this.sub2 = this.store.select(setupReducer.getNewSetup).pipe(filter(x => !!x), take(1)).subscribe(id => {
      this.router.navigate(['/modal/setup/detail'], {
        queryParams: { id, modeView: 'update' },
        queryParamsHandling: 'merge'
      });
      this.store.dispatch(idReset());
    });

    this.sub1 = this.activatedRoute.queryParams
      .pipe(
        filter(params => params.id),
        map(params => params.id),
        switchMap(id => this.store.select(setupReducer.selectById, { id })),
        filter(result => result)
      )
      .subscribe((result) => {
        this.setupFormService.updateForm(result);
      });
    // si dfskqfj
    this.sub3 = this.activatedRoute.queryParams
      .pipe(
        filter(params => !params.id),
        switchMap(() => this.store.select(getPciArray).pipe(first(pcis => pcis.length > 0)))
      )
      .subscribe((result) => {
        this.setupFormService.pciInfos = result;
        this.setupFormService.updatePci(result);
      });
  }

  onSubmitForm() {
    const body: MissionSetupModel = this.rootGroup.value;
    if (this.rootGroup.get('id').value === '0') {
      this.store.dispatch(POSTRequest({ body }));
    } else {
      this.store.dispatch(PUTRequest({ body, id: this.rootGroup.get('id').value }));
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }


}
