import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SetupFormService } from '../../../../../shared/services/setup-form.service';
import { StaticDatas } from '../../../../../labels.static';

@Component({
  selector: 'app-mission-generale',
  templateUrl: './tab-general.component.html'
})
export class MissionGeneraleComponent implements OnInit {
  rootGroup: FormGroup;


  get pciArray() {
    return this.rootGroup.get('pci-list') as FormArray;
  }

  constructor(private setupFormService: SetupFormService, public staticDatas: StaticDatas) {
  }

  ngOnInit() {
    this.rootGroup = this.setupFormService.rootFormGroup();
  }


}
