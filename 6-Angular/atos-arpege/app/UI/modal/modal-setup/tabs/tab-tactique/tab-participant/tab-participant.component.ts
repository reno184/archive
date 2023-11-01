import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetupFormService } from '../../../../../../shared/services/setup-form.service';
import { AppInitService } from '../../../../../../app.init.service';
import { forbiddenInputValidator } from '../../../../../../shared/directives/regex-input.directive';
import { StaticDatas } from '../../../../../../labels.static';

@Component({
  selector: 'app-tab-participant',
  templateUrl: './tab-participant.component.html'
})
export class TabParticipantComponent implements OnInit {
  rootGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private setupFormService: SetupFormService, public appInitService: AppInitService, public staticDatas: StaticDatas) {
  }

  ngOnInit() {
    this.rootGroup = this.setupFormService.rootFormGroup();
  }

  getFiltersByClan(clans: AbstractControl, key: string): FormArray {
    return clans.get(key) as FormArray;
  }

  onRemoveFilterToClan(clanFilters: FormArray, index: number): void {
    clanFilters.removeAt(index);
  }

  onAddFilterToClan(clanFilters: FormArray, index): void {
    const selectOptionSelected = (document.getElementById('idSignal' + index) as HTMLSelectElement).selectedOptions[0].value;

    clanFilters.push(this.formBuilder.group({
      readOnly: false,
      signal: this.formBuilder.control(selectOptionSelected),
      rule: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(this.appInitService.configDatas.signaux[selectOptionSelected].min),
        Validators.maxLength(this.appInitService.configDatas.signaux[selectOptionSelected].max),
        forbiddenInputValidator(new RegExp(this.appInitService.configDatas.signaux[selectOptionSelected].regex))
      ])
    }));
  }

  getErrorMessage(signal: string, typeMessage: string): string {
    if (typeMessage === 'minlength') {
      return 'Longueur de ' + this.appInitService.configDatas.signaux[signal].min + ' minimun';
    } else if (typeMessage === 'maxlength') {
      return 'Longueur de ' + this.appInitService.configDatas.signaux[signal].min + ' maximun';
    } else if (typeMessage === 'forbiddenInput') {
      return 'Format ' + this.appInitService.configDatas.signaux[signal].regex + ' requis';
    } else {
      return 'Champ obligatoire';
    }
  }


}
