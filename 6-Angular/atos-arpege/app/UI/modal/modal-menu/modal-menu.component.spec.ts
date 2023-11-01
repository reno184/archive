import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMenuComponent } from './modal-menu.component';
import { AppInitService } from '../../../app.init.service';


describe('ModalMenuComponent', () => {
    let component: ModalMenuComponent;
    let fixture: ComponentFixture<ModalMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalMenuComponent],
            providers: [{
                provide: AppInitService,
                useValue: { configFromServer: { USER_ROLE: '' } }
            }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalMenuComponent);
        component = fixture.componentInstance;
        // spyOn(component, 'user').and.returnValue('PPSRM');
        fixture.detectChanges();
    });

});
