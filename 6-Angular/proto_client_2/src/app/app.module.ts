import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found.component";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {HttpClientModule} from "@angular/common/http";
import {CoreComponent} from "./ui/core.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        CoreComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterModule.forRoot([
            {
                path: 'resto',
                component: CoreComponent
            },
            {
                path: 'modal',
                outlet: 'modal',
                loadChildren: () => import('./ui/modal/modal.module').then(m => m.ModalModule),
            },
            {path: '', redirectTo: 'resto', pathMatch: 'full'},
            {path: '**', component: PageNotFoundComponent}
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
