import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMenuComponent } from './modal-menu/modal-menu.component';
import { ModalSetupListComponent } from './modal-setup-list/modal-setup-list.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalComponent, ModalMenuComponent, ModalSetupListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '', component: ModalComponent, children: [
        {
          path: 'setup',
          loadChildren: './modal-setup/setup.module#SetupModule'
        },
        { path: 'menu', component: ModalMenuComponent },
        { path: 'setup/list', component: ModalSetupListComponent }
      ]
    }])
  ]
})
export class ModalModule {
}
