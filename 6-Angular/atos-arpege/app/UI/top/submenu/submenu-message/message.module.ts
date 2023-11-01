import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmenuMessageComponent } from './submenu-message.component';
import { StoreModule } from '@ngrx/store';
import * as messageReducer from '../../../../store/featureStates/MessageState/message.reducer';
import { MessageService } from '../../../../store/featureStates/MessageState/message.service';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from '../../../../store/featureStates/MessageState/message.effect';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SubmenuMessageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      messageReducer.FEATURE_MESSAGE,
      messageReducer.MessageReducer
    ),
    EffectsModule.forFeature([MessageEffects]),
    RouterModule
  ],
  exports: [SubmenuMessageComponent],
  providers: [MessageService]
})
export class MessageModule {}
