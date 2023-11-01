import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SetupFormService } from '../../../../../../../shared/services/setup-form.service';

@Component({
  selector: 'app-fo-coverage-panel',
  templateUrl: './fo-coverage-panel.component.html'
})
export class FoCoveragePanelComponent implements OnInit {
  rootGroup: FormGroup;

  // todo passer le champs actif de string à boolean
  get pciArray() {
    return this.rootGroup.get('pci-list') as FormArray;
  }

  constructor(private setupFormService: SetupFormService) {
  }

  ngOnInit() {
    this.rootGroup = this.setupFormService.rootFormGroup();
  }

  get pciSelected(): number {
    return this.setupFormService.pciSelected;
  }
}
