import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalLayout} from "../layout/modal.layout";
import {WikiModal} from "../modal/wiki.modal";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ModalLayout,WikiModal],
  imports: [
    CommonModule,RouterModule, ReactiveFormsModule
  ]
})
export class ModalModule { }
