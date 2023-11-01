import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthPage} from "../page/auth.page";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AuthPage],
  imports: [
    CommonModule,FormsModule
  ]
})
export class AuthModule { }
