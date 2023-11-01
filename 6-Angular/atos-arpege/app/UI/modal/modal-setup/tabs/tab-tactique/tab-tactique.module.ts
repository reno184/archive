import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabPciComponent } from './tab-pci/tab-pci.component';
import { TabParticipantComponent } from './tab-participant/tab-participant.component';
import { MissionSitutactiqueComponent } from './tab-tactique.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PciFoPanelComponent } from './tab-pci/pci-fo-panel/pci-fo-panel.component';
import { FoStockPanelComponent } from './tab-pci/fo-stock-panel/fo-stock-panel.component';
import { FoAttachedPanelComponent } from './tab-pci/fo-attached-panel/fo-attached-panel.component';
import { FoCoveragePanelComponent } from './tab-pci/fo-coverage-panel/fo-coverage-panel.component';
import { ArcAttachedPanelComponent } from './tab-pci/arc-attached-panel/arc-attached-panel.component';
import { FormDirectivesModule } from '../../../../../shared/directives/form-directives.module';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';


@NgModule({
  declarations: [MissionSitutactiqueComponent, TabParticipantComponent, TabPciComponent, PciFoPanelComponent,
    FoStockPanelComponent,
    FoAttachedPanelComponent,
    FoCoveragePanelComponent,
    ArcAttachedPanelComponent],
  imports: [
    CommonModule,
    FormDirectivesModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MissionSitutactiqueComponent, children: [
          { path: 'pci/:pci', component: TabPciComponent },
          { path: 'participant', component: TabParticipantComponent },
          { path: '', redirectTo: 'pci/pci1', pathMatch: 'full' }
        ]
      }]
    )
  ]
})
export class TabTactiqueModule {
}
