import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMapComponent } from './main-map.component';
import { AppInitService } from '../../app.init.service';
import { provideMockStore } from '@ngrx/store/testing';


describe('MainMapComponent', () => {
  let component: MainMapComponent;
  let fixture: ComponentFixture<MainMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainMapComponent],
      providers: [provideMockStore(), AppInitService, {
        provide: AppInitService,
        useValue: { configFromServer: { MAP_URL: '' }, configDatas: { providers: { basic: '', satellite: '' } } }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

