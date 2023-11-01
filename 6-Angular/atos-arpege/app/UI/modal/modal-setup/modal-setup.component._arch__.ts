/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMissionComponent } from './modal-setup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SetupFormService } from '../../../shared/services/setup-form.service';
import { FormDirectivesModule } from '../../../shared/directives/form-directives.module';
import { MemoizedSelector, Store } from '@ngrx/store';
import { selectSubmitting, SetupState } from '../../../store/featureStates/setup-mission/setup.reducer';
import { AppInitService } from '../../../app.init';


describe('ModalMissionComponent', () => {
    let component: ModalMissionComponent;
    let fixture: ComponentFixture<ModalMissionComponent>;
    let mockStore: MockStore<SetupState>;

    let submittingMock: MemoizedSelector<SetupState, boolean>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalMissionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                SetupFormService,
                FormBuilder,

                provideMockStore(),
            ],
            imports: [
                FormDirectivesModule,
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalMissionComponent);
        component = fixture.componentInstance;
        mockStore = TestBed.get(Store);
        submittingMock = mockStore.overrideSelector(selectSubmitting, false);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
*/
