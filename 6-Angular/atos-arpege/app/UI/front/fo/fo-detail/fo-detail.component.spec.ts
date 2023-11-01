import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FoDetailComponent } from './fo-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as reducerFO from '../../../../store/featureStates/fo/fo.reducer';
import { MemoizedSelectorWithProps, Store } from '@ngrx/store';
import { FoModel } from '@arpege/models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalComponent } from '../../../modal/modal.component';
import { ModalMenuComponent } from '../../../modal/modal-menu/modal-menu.component';
import { FrontComponent } from '../../front.component';
import { FormDirectivesModule } from '../../../../shared/directives/form-directives.module';
import { AppInitService } from '../../../../app.init.service';

// todo refaire fonctionner les tests untaires avec les routes
describe('FoDetailComponent', () => {
  let component: FoDetailComponent;
  let fixture: ComponentFixture<FoDetailComponent>;

  let mockStore: MockStore<reducerFO.FoState>;
  let router: Router;
  let location: Location;
  let foMock: MemoizedSelectorWithProps<reducerFO.FoState, { id }, FoModel>;
  let t: FoModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoDetailComponent, ModalComponent, ModalMenuComponent, FrontComponent],
      providers: [provideMockStore(), { provide: AppInitService, useValue: { staticDatas: { labels: {} } } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormDirectivesModule,
        ReactiveFormsModule,

        RouterTestingModule.withRoutes([
          {
            path: 'modal',
            component: ModalComponent,
            children: [
              {
                path: 'menu',
                component: ModalMenuComponent
              }
            ]
          },
          {
            path: 'front',
            outlet: 'front',
            component: FrontComponent,
            children: [
              { path: 'fo/:id', component: FoDetailComponent },
              {
                path: 'fo/new',
                component: FoDetailComponent,
                pathMatch: 'full'
              }
            ]
          }
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(FoDetailComponent);
    router.initialNavigation();

    t = {
      id: '0',
      FO_COLOR: '',
      FO_NAME: '',
      FO_STATUS: true,
      FO_MODE: '0',
      FO_FREQ: 0,
      FO_LI: 0,
      FO_PRI: 0,
      FO_RT: 0,
      FO_ATTEN: 0,
      FO_CLASS: '0',
      FO_MAX_TARGET: 0,
      FO_KILL_STATUS: 'true',
      FO_KILL: 0,
      FO_ALT_MIN: 0,
      FO_ALT_MAX: 0,
      FO_RAD_MIN: 0,
      FO_RAD_MAX: 0
    };

    foMock = mockStore.overrideSelector(reducerFO.selectFoById, t);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it ('should create', () => {
  //     expect(component).toBeTruthy();
  // });

  /*  it('should navigate to proper path', fakeAsync(() => {
      router.navigate(['/', { outlets: { front: 'front/fo/new' } }]);
      tick(1000);
      expect(location.path()).toBe('/(front:front/fo/new)');
      expect(
        fixture.debugElement.queryAll(By.css('.test-id'))[0].nativeElement.value
      ).toBe('0');
      expect(
        fixture.debugElement.queryAll(By.css('h4'))[0].nativeElement.innerText
      ).toBe('Update forme d onde');
    }));

    it('should navigate to update element', fakeAsync(() => {
      router.navigate(['/', { outlets: { front: 'front/fo/3' } }]);
      tick(1000);
      foMock.setResult({
        id: '3',
        FO_COLOR: '',
        FO_NAME: '',
        FO_STATUS: true,
        FO_MODE: 0,
        FO_FREQ: 1,
        FO_LI: 0,
        FO_PRI: 0,
        FO_RT: 0,
        FO_ATTEN: 0,
        FO_CLASS: 0,
        FO_MAX_TARGET: 0,
        FO_KILL_STATUS: 'true',
        FO_KILL: 0,
        FO_ALT_MIN: 0,
        FO_ALT_MAX: 0,
        FO_RAD_MIN: 0,
        FO_RAD_MAX: 0
      });
      mockStore.refreshState();
      fixture.detectChanges();
      expect(location.path()).toBe('/(front:front/fo/3)');
      expect(
        fixture.debugElement.queryAll(By.css('.test-id'))[0].nativeElement.value
      ).toBe('3');
    }));*/
});
