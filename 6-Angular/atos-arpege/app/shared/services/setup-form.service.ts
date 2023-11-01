import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppInitService } from '../../app.init.service';
import { MissionSetupModel, PciInfo } from '@arpege/models';
import { StaticDatas } from '../../labels.static';


@Injectable({
  providedIn: 'root'
})
export class SetupFormService {
  pciInfos: PciInfo[];
  pciSelected: number;
  rootGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public appInitService: AppInitService, private staticDatas: StaticDatas) {

  }

  // Permet de voir si un pci est actif
  isActive(value) {
    const temp = this.rootGroup.get('pci-list') as FormArray;
    for (let j = 0; j < temp.length; j++) {
      if (j === value) {
        return (temp.controls[j] as FormGroup).value['pci-actif'];
      }
    }
  }

  initForm() {
    this.pciSelected = 0;
    this.rootGroup = this.formBuilder.group({
      id: '0',
      'mission-name': new FormControl('', [Validators.required]),
      'mission-mode': '0',
      'all-pci-connected': '3',
      'kill-info': this.formBuilder.group({
        'kill-auto': false,
        'msg-lvc16': false,
        'kill-external': false,
        'kill-internal': false
      }),
      'geo-attached': this.formBuilder.array([]),
      participants: this.formBuilder.group({}),
      'pci-list': this.formBuilder.array([])
    });

    const participants = this.rootGroup.get('participants') as FormGroup;
    for (const key of Object.keys(this.staticDatas.objects.trackIdentity)) {
      participants.addControl(key, this.formBuilder.array([]));
    }

    /*   for (let i = 0; i < this.appInitService.configDatas.maxPci; i++) {
         (this.rootGroup.controls['pci-list'] as FormArray).push(this.formBuilder.group({
           'pci-name': '',
           'pci-actif': true,
           'pci-mode': 0,
           'pci-is-180': true,
           'pci-degree': 0,
           'fo-attached': this.formBuilder.array([]),
           'arc-attached': this.formBuilder.array([])
         }));
       }*/

  }

  updateForm(setup: MissionSetupModel) {

    this.rootGroup.patchValue({
      id: setup.id,
      'mission-mode': setup['mission-mode'],
      'mission-name': setup['mission-name'],
      'all-pci-connected': '3',
      'kill-info': {
        'kill-auto': setup['kill-info']['kill-auto'],
        'msg-lvc16': setup['kill-info']['msg-lvc16'],
        'kill-external': setup['kill-info']['kill-external'],
        'kill-internal': setup['kill-info']['kill-internal']
      }
    });

    this.rootGroup.removeControl('geo-attached');
    const temp = this.formBuilder.array([]);
    for (const item of setup['geo-attached']) {
      temp.push(this.formBuilder.control(item));
    }
    this.rootGroup.addControl('geo-attached', temp);

    this.rootGroup.removeControl('pci-list');
    const tempPci = this.formBuilder.array([]);
    for (const pci of setup['pci-list']) {
      const newGroup = this.formBuilder.group({
        'pci-name': pci['pci-name'],
        'pci-actif': pci['pci-actif'],
        'pci-mode': pci['pci-mode'],
        'pci-is-180': pci['pci-is-180'],
        'pci-degree': pci['pci-degree'],
        'pci-connected': '3',
        'fo-attached': this.formBuilder.array([]),
        'arc-attached': this.formBuilder.array([])
      });
      for (const foAttached of pci['fo-attached']) {
        (newGroup.controls['fo-attached'] as FormArray).push(this.formBuilder.group(foAttached));
      }
      for (const arcAttached of pci['arc-attached']) {
        (newGroup.controls['arc-attached'] as FormArray).push(this.formBuilder.group(arcAttached));
      }

      tempPci.push(newGroup);
    }
    this.rootGroup.addControl('pci-list', tempPci);

    const participants = this.rootGroup.get('participants') as FormGroup;
    for (const key of Object.keys(this.staticDatas.objects.trackIdentity)) {
      participants.removeControl(key);

      const tempParticipant = [];
      if (setup.participants) {
        for (const participant of setup.participants[key]) {
          tempParticipant.push(this.formBuilder.group({
            readOnly: true,
            signal: this.formBuilder.control(participant.signal),
            rule: this.formBuilder.control(participant.rule)
          }));
        }
      }
      participants.addControl(key, this.formBuilder.array(tempParticipant));
    }
  }

  addItem(key, item) {
    const a = this.rootGroup.controls['pci-list'] as FormArray;
    const b = a.controls[this.pciSelected] as FormGroup;
    const c = b.controls[key] as FormArray;
    c.push(this.formBuilder.group(item));
  }

  removeItem(key, index) {
    const a = this.rootGroup.controls['pci-list'] as FormArray;
    const b = a.controls[this.pciSelected] as FormGroup;
    const c = b.controls[key] as FormArray;
    c.removeAt(index);
  }

  rootFormGroup(): FormGroup {
    return this.rootGroup;
  }

  updatePci(result: PciInfo[]) {
    this.rootGroup.removeControl('pci-list');
    const tempPci = this.formBuilder.array([]);
    for (const pci of result) {

      const newGroup = this.formBuilder.group({
        'pci-name': pci.name,
        'pci-actif': true,
        'pci-mode': 0,
        'pci-is-180': true,
        'pci-degree': 0,
        'pci-connected': '3',
        'fo-attached': this.formBuilder.array([]),
        'arc-attached': this.formBuilder.array([])
      });
      tempPci.push(newGroup);
    }
    this.rootGroup.addControl('pci-list', tempPci);
  }
}
