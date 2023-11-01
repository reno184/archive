import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalMenuComponent } from './modal-menu/modal-menu.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, ModalMenuComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([{
        path: '', component: ModalComponent, children: [
          { path: 'menu', component: ModalMenuComponent }
        ]
      }])]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalComponent);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });


  it('should nav outlets modal null after click button', fakeAsync(() => {
    router.navigate(['/menu']).then(() => {
      expect(location.path()).toBe('/menu');
    });
  }));
});
