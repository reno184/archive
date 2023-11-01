import { Component, OnInit } from '@angular/core';
import { SetupFormService } from '../../../../../../../shared/services/setup-form.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppInitService } from '../../../../../../../app.init.service';
import { StaticDatas } from '../../../../../../../labels.static';


@Component({
  selector: 'app-arc-attached-panel',
  templateUrl: './arc-attached-panel.component.html'
})
export class ArcAttachedPanelComponent implements OnInit {
  rootGroup: FormGroup;


  get pciList() {
    return this.rootGroup.get('pci-list') as FormArray;
  }

  getArcAttached(fg): FormArray {
    return fg.get('arc-attached') as FormArray;
  }

  constructor(private setupFormService: SetupFormService, public appInitService: AppInitService, public staticDatas: StaticDatas) {
  }

  ngOnInit() {
    this.rootGroup = this.setupFormService.rootFormGroup();
  }

  onAttach() {
    this.setupFormService.addItem('arc-attached', {
      color: new FormControl('', [Validators.required]),
      trait: '1',
      rayon: 0,
      type: '0'
    });
  }

  onColorChosen(color: Event, arc) {
    arc.patchValue({ color });
  }

  onDetach(index) {
    this.setupFormService.removeItem('arc-attached', index);
  }

  idRequired(formGroup) {
    return (formGroup.controls.color as FormControl).hasError('required');
  }

  get pciSelected(): number {
    return this.setupFormService.pciSelected;
  }
}
