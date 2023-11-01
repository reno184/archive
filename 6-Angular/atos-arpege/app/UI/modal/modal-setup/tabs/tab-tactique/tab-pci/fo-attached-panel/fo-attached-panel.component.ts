import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SetupFormService } from '../../../../../../../shared/services/setup-form.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fo-attached-panel',
  templateUrl: './fo-attached-panel.component.html'
})
export class FoAttachedPanelComponent implements OnInit {
  rootGroup: FormGroup;
  @Output() clickedEvent = new EventEmitter();


  get pciList() {
    return this.rootGroup.get('pci-list') as FormArray;
  }

  getFoAttached(fg): FormArray {
    return fg.get('fo-attached') as FormArray;
  }

  constructor(private setupFormService: SetupFormService) {
  }

  ngOnInit() {
    this.rootGroup = this.setupFormService.rootFormGroup();
  }

  onDetach(index: number) {
    this.setupFormService.removeItem('fo-attached', index);
  }

  onClickDetail(id: string) {
    this.clickedEvent.emit(id);
  }

  get pciSelected(): number {
    return this.setupFormService.pciSelected;
  }
}
