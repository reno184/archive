import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmenuSettingComponent } from './submenu-setting.component';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('SubmenuSettingComponent', () => {
    let component: SubmenuSettingComponent;
    let fixture: ComponentFixture<SubmenuSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmenuSettingComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmenuSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
