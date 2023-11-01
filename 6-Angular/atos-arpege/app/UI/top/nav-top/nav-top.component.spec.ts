import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavTopComponent } from './nav-top.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as sceneReducer from '../../../store/featureStates/SceneState/SceneReducer';
import { By } from '@angular/platform-browser';
import * as messageReducer from '../../../store/featureStates/MessageState/message.reducer';
import { Message } from '../../../store/featureStates/MessageState/message.interface';
import { AppInitService } from '../../../app.init.service';

describe('NavTopComponent', () => {
  let component: NavTopComponent;
  let fixture: ComponentFixture<NavTopComponent>;

  let mockStore: MockStore<sceneReducer.SceneState>;
  let networkStatusMock: MemoizedSelector<sceneReducer.SceneState, string>;

  let mockMessage: MemoizedSelector<messageReducer.MessageState, Message[]>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavTopComponent],
      providers: [
        provideMockStore(), { provide: AppInitService, useValue: { confFromServer: { USER_ROLE: 'PPSRM' } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTopComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    networkStatusMock = mockStore.overrideSelector(
      sceneReducer.getPciAllNetworkState,
      'complete'
    );

    mockMessage = mockStore.overrideSelector(
      messageReducer.selectAllMessages,
      [
        {
          id: 0,
          body: 'lorem ipsum',
          read: true,
          category: 'warn'
        }
      ]
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has class text-success if status network is success', () => {
    expect(
      fixture.debugElement.query(By.css('.fa-truck.text-success'))
    ).toBeTruthy();
  });

  it('should has class text-danger if status network is danger', () => {
    networkStatusMock.setResult('error');
    mockStore.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.fa-truck.text-danger'))
    ).toBeTruthy();
  });
});
