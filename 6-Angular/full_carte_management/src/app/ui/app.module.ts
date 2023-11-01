import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {environment} from "../../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from "@angular/router";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {StoreModule} from "@ngrx/store";
import * as rootReducer from "../store/root.reducer";
import {ModalComponent} from './modal/modal.component';
import {ToastComponent} from './toast/toast.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import { OrderComponent } from './order/order.component';

/*export function init_app() {
     moment.locale('fr');
}*/

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ModalComponent,
        ToastComponent,
        AuthComponent,
        OrderComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot({root: rootReducer.Reducer}),
        RouterModule.forRoot([
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
                canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectUnauthorizedTo(['auth'])}
            },
            {
                path: 'order',
                component: OrderComponent,
                canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectUnauthorizedTo(['auth'])}
            },
            {
                path: 'auth',
                component: AuthComponent,
            },
            {
                path: 'modal',
                outlet: 'modal',
                loadChildren: () => import('./modal/modal.module').then(m => m.ModalModule),
            },
            {path: '', redirectTo: 'auth', pathMatch: 'full'},
            {path: '**', component: PageNotFoundComponent}
        ])
    ],
    /*    providers: [{
            provide: APP_INITIALIZER,
            useFactory: init_app
        }],*/
    bootstrap: [AppComponent]
})
export class AppModule {
}
