import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import labelData from './labelData.json';
import { Message } from '../../../../store/featureStates/MessageState/message.interface';
import * as frmAction from '../../../../store/featureStates/MessageState/message.action';
import * as frmReducer from '../../../../store/featureStates/MessageState/message.reducer';
import { MessageState } from '../../../../store/featureStates/MessageState/message.reducer';
import { Update } from '@ngrx/entity';
import { take } from 'rxjs/operators';
import { LabelMessage } from './labelData';

@Component({
  selector: 'app-submenu-message',
  templateUrl: './submenu-message.component.html',
  styleUrls: ['./submenu-message.component.sass']
})
export class SubmenuMessageComponent implements OnInit {
  labelMessage: LabelMessage = labelData;

  messageArray$: Observable<Message[]> = this.store.pipe(
    select(frmReducer.selectAllMessages)
  );

  loading$: Observable<boolean> = this.store.pipe(
    select(frmReducer.getMessageLoading)
  );

  constructor(private store: Store<MessageState>) {
  }

  ngOnInit() {
    this.store.dispatch(frmAction.LoadRequestAction());
  }

  markAsRead(messageId) {
    const message: Update<Message> = {
      id: messageId,
      changes: {
        read: true
      }
    };
    this.store.dispatch(frmAction.markAsRead({ message }));
  }

  markAllRead(e) {
    e.preventDefault();
    this.messageArray$.pipe(take(1)).subscribe(datas => {
      const messages: Update<Message>[] = datas.map(item => {
        return {
          id: item.id,
          changes: {
            read: true
          }
        };
      });
      this.store.dispatch(frmAction.markAllRead({ messages }));
    });
  }


  getClassIcon(category: string): string {
    if (category === 'default') {
      return 'fa-check-circle text-default';
    } else if (category === 'warn') {
      return 'fa-info-circle text-warn';
    } else {
      return 'fa-exclamation-triangle text-danger';
    }
  }
}
