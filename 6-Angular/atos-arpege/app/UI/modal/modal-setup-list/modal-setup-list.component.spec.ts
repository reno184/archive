import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSetupListComponent } from './modal-setup-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';

import { selectLoading, SelectSetupAll, SetupState } from '../../../store/featureStates/setup-mission/setup.reducer';
import { Setup } from '@arpege/models';

describe('ModalSetupListComponent', () => {
  let component: ModalSetupListComponent;
  let fixture: ComponentFixture<ModalSetupListComponent>;

  let mockStore: MockStore<SetupState>;
  let mockMissions: MemoizedSelector<SetupState, Setup[]>;
  let mockLoading: MemoizedSelector<SetupState, boolean>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSetupListComponent],
      providers: [provideMockStore()],
      /*            schemas: [CUSTOM_ELEMENTS_SCHEMA],*/
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetupListComponent);

    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    mockMissions = mockStore.overrideSelector(SelectSetupAll, [
      {
        id: 'rr',
        'mission-name': 'lorem ipsum',
        'mission-mode': '0',
        'pci-list': [],
        'kill-info': {
          'kill-auto': false,
          'msg-lvc16': false,
          'kill-external': false,
          'kill-internal': false
        },
        'geo-attached': [],
        participants: {
          0: [],
          1: [],
          2: []
        }
      }
    ])
    ;
    mockLoading = mockStore.overrideSelector(selectLoading, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
