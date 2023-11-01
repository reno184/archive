import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-select',
  template: `
    <div class="mb-3" [formGroup]="parentGroupForm">
      <label for="i-{{controlKeyName}}">{{title}}</label>
      <select id="i-{{controlKeyName}}" [formControlName]="controlKeyName" class="form-select">
        <option *ngIf="!isUpdate" value="choisir"
                [selected]="onSelected('choisir',this.parentGroupForm.get(controlKeyName).value)">Choisir
        </option>
        <option *ngFor="let item of items"
                [selected]="onSelected(item.id,this.parentGroupForm.get(controlKeyName).value)"
                [value]="item.id">{{ item[fieldName] }}</option>
      </select>
      <small class="fw-lighter" *ngIf="additionnalText">{{additionnalText}}</small>
    </div>
  `,
  styles: []
})
export class InputSelectComponent implements OnInit {
  @Input() title: string;
  @Input() controlKeyName: string;
  @Input() parentGroupForm: FormGroup;
  @Input() additionnalText: string | null;
  @Input() items: any[];
  @Input() fieldName: string;
  @Input() isUpdate: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelected(id: string, value: string) {
    if (value) {
      return id === value
    }
  }
}
