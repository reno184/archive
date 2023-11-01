import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {AuthPage} from "./ui/page/auth.page";
import {PageLayout} from "./ui/layout/page.layout";
import {SearchAlgoliaPage} from "./ui/page/search-algolia.page";
import {EditPage} from "./ui/page/edit.page";
import {SettingPage} from "./ui/page/setting/setting.page";
import {ModalLayout} from "./ui/layout/modal.layout"
import {UrlModal} from "./ui/modal/url.modal";
import {WikiModal} from "./ui/modal/wiki.modal";
@NgModule({
  imports: [RouterModule.forRoot([
      {
          path: 'page',
          component : PageLayout,
          children : [
              {path: 'setting', component : SettingPage, data : { title : 'setting'}},
              {path: 'edit', component: EditPage, data : { title : 'Update'}},
              {path: 'new', component: EditPage, data : { title : 'New'}},
              {path: 'algolia', component: SearchAlgoliaPage, data : { title : 'wiki list'}},
          ],
          canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectUnauthorizedTo(['auth'])}
      },
      {
          path: 'auth',
          component: AuthPage,
      },
      {
          path: 'modal', outlet: 'modal', component: ModalLayout,children : [{ path: 'url', component: UrlModal},{ path: 'wiki', component: WikiModal}]
      },
      {path: '', redirectTo: 'auth', pathMatch: 'full'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
