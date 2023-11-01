import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getStorage, provideStorage} from '@angular/fire/storage';

import {USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/compat/firestore';
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {ApiClientService} from "./core/dal/apiClient";
import {TagFeatureManager} from "./core/bll/tagFeature/tagFeature.manager";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ],
  providers: [
      TagFeatureManager,
      ApiClientService,
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099', 9099] : undefined },
      { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
      { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:5001', 5001] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
