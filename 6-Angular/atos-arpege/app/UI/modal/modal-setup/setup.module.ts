import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDirectivesModule } from '../../../shared/directives/form-directives.module';
import { ModalMissionComponent } from './modal-setup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MissionGeneraleComponent } from './tabs/tab-general/tab-general.component';
import { MissionPoszoneComponent } from './tabs/tab-zone/tab-zone.component';

@NgModule({
  declarations: [
    ModalMissionComponent,
    MissionGeneraleComponent,
    MissionPoszoneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormDirectivesModule,

    RouterModule,
    RouterModule.forChild([
      {
        path: 'detail',
        component: ModalMissionComponent,
        children: [
          {
            path: 'general',
            component: MissionGeneraleComponent
          },
          {
            path: 'tactique',
            loadChildren: './tabs/tab-tactique/tab-tactique.module#TabTactiqueModule'
          },
          {
            path: 'zone/:type',
            component: MissionPoszoneComponent
          },
          { path: '', redirectTo: 'general', pathMatch: 'full' }
        ]
      }
    ])
  ]
})
export class SetupModule {
}
