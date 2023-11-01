import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  {
    path: 'modal',
    loadChildren: './UI/modal/modal.module#ModalModule'
  },
  {
    path: 'front',
    outlet: 'front',
    loadChildren: './UI/front/front.module#FrontModule'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {
}
