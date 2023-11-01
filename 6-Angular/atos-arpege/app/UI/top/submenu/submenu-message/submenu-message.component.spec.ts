import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmenuMessageComponent } from './submenu-message.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Message } from '../../../../store/featureStates/MessageState/message.interface';
import {
    getMessageLoading,
    MessageState,
    selectAllMessages
} from '../../../../store/featureStates/MessageState/message.reducer';
import { By } from '@angular/platform-browser';

describe('SubmenuMessageComponent', () => {
    let component: SubmenuMessageComponent;
    let fixture: ComponentFixture<SubmenuMessageComponent>;
    let mockStore: MockStore<MessageState>;
    let mockLoading: MemoizedSelector<MessageState, boolean>;
    let mockMessage: MemoizedSelector<MessageState, Message[]>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmenuMessageComponent],
            providers: [provideMockStore()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmenuMessageComponent);
        mockStore = TestBed.get(Store);
        component = fixture.componentInstance;
        mockMessage = mockStore.overrideSelector(selectAllMessages, [
            {
                id: 0,
                body: 'lorem ipsum',
                read: true,
                category: 'warn',
            },
        ]);
        mockLoading = mockStore.overrideSelector(getMessageLoading, true);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should message loading icon if state.loading is true', () => {
        expect(fixture.debugElement.query(By.css('.fa-spinner'))).toBeTruthy();
    });

    it('should not message loading icon if state.loading is false', () => {
        mockLoading.setResult(false);
        mockStore.refreshState();
        fixture.detectChanges();
        expect(
            fixture.debugElement.query(By.css('.fa-spinner')),
        ).not.toBeTruthy();
    });
});
