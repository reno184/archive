import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRightComponent } from './menu-right.component';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuRightComponent', () => {
  let component: MenuRightComponent;
  let fixture: ComponentFixture<MenuRightComponent>;
  // let activatedRoute: ActivatedRoute;
  // let router: Router;
  // let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRightComponent],
      imports: [RouterTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          queryParams: EMPTY
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRightComponent);
    // activatedRoute = TestBed.get(ActivatedRoute);
    // router = TestBed.get(Router);
    // fixture.ngZone.run(() => {
    // router.initialNavigation();
    // });
    // location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should open panel', () => {
    component.obs$ = of('piste');
    fixture.detectChanges();
    const r = fixture.debugElement.query(By.css('.test_1')).nativeElement;
    expect(r.classList.contains('is-open')).toBe(true);
  });

  it('should close panel', () => {
    component.obs$ = EMPTY;
    fixture.detectChanges();
    const r = fixture.debugElement.query(By.css('.test_1')).nativeElement;
    expect(r.classList.contains('is-open')).not.toBe(true);
  });


  it('should show section piste cards', () => {
    // fixture.ngZone.run(async () => {
    // await router.navigate(['/'], { queryParams: { 'menu-right': 'piste' } });
    // expect(location.path()).toBe('/?menu-right=piste');
    component.obs$ = of('piste');
    fixture.detectChanges();
    const r = fixture.debugElement.query(By.css('.test_2')).nativeElement;
    expect(r.classList.contains('is-active')).toBe(true);
  });
  it('should hide section piste cards', () => {
    component.obs$ = of('log');
    fixture.detectChanges();
    const r = fixture.debugElement.query(By.css('.test_2')).nativeElement;
    expect(r.classList.contains('is-active')).not.toBe(true);
  });
  it('should show section log cards', () => {
    component.obs$ = of('log');
    fixture.detectChanges();
    const r = fixture.debugElement.query(By.css('.test_3')).nativeElement;
    expect(r.classList.contains('is-active')).toBe(true);
  });
  it('should hide section log cards', () => {
    component.obs$ = of('piste');
    fixture.detectChanges();
    const r = fixture.debugElement.query(By.css('.test_3')).nativeElement;
    expect(r.classList.contains('is-active')).not.toBe(true);
  });
});
