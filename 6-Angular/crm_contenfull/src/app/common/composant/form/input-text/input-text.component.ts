import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  template: `
    <div [formGroup]="parentGroupForm" class="mb-3">
      <label for="i-{{controlKeyName}}">{{title}}</label>
      <input id="i-{{controlKeyName}}" type="text" [maxlength]="maxLength" [formControlName]="controlKeyName"
             class="form-control">
      <div class="d-flex" *ngIf="maxLength"><small
          class="flex-grow-1">{{textCounter}}</small><small>Maximum {{maxLength}} characters</small></div>
      <small class="fw-lighter" *ngIf="additionnalText">{{additionnalText}}</small>
    </div>
  `,
  styles: []
})
export class InputTextComponent implements OnInit {
  @Input() title: string;
  @Input() controlKeyName: string;
  @Input() parentGroupForm: FormGroup;
  @Input() maxLength: number | null;
  @Input() additionnalText: string | null;
  textCounter: string;

  constructor() {

  }

  ngOnInit(): void {
    this.parentGroupForm.get(this.controlKeyName).valueChanges.subscribe(val => {
      this.textCounter = val.length + ' character' + (val.length > 1 ? 's' : '');
    })
  }

}
