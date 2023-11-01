import { Component } from '@angular/core';
import { SetupFormService } from '../../../../../shared/services/setup-form.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-mission-situtactique',
  templateUrl: './tab-tactique.component.html',
  styleUrls: ['./tab-tactique.component.sass']
})
export class MissionSitutactiqueComponent {
  constructor(private setupFormService: SetupFormService) {
  }

  get formArr() {
    return this.setupFormService.rootGroup.get('pci-list') as FormArray;
  }


}
