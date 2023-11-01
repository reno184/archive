import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from "../environments/environment";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {NgAisModule} from "angular-instantsearch";

import {FormsModule} from "@angular/forms";
import {AuthPage} from "./ui/page/auth.page";
import {SettingPage} from "./ui/page/setting/setting.page";
import {SearchAlgoliaPage} from "./ui/page/search-algolia.page";
import {UrlModal} from "./ui/modal/url.modal";
import {WikiModal} from "./ui/modal/wiki.modal";
import {ModalLayout} from "./ui/layout/modal.layout";
import {PageLayout} from "./ui/layout/page.layout";
import {EditPage} from "./ui/page/edit.page";

@NgModule({
  declarations: [
    AppComponent,
    AuthPage,
    SettingPage,
    SearchAlgoliaPage,
    UrlModal,
    WikiModal,
    ModalLayout,
    PageLayout,
    EditPage
  ],
    imports: [
        BrowserModule,
        FormsModule,
        NgAisModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
