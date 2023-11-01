import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EpisodePageComponent} from './view/feature/episode/episodePage.component';
import {QuizPageComponent} from './view/feature/quiz/quizPage.component';
import {HttpClientModule} from "@angular/common/http";
import { AuthPageComponent } from './view/authPage.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { ModalLayoutComponent } from './view/layout/modalLayout.component';
import { EpisodeModalComponent } from './view/feature/episode/episodeModal.component';
import { UnauthorizedComponent } from './view/401Page.component';
import { Error500Component } from './view/500Page.component';
import { AppLayoutComponent } from './view/layout/appLayout.component';
import { VocabularyModalComponent } from './view/feature/vocabulary/vocabularyModal.component';
import { VocabularyPageComponent } from './view/feature/vocabulary/vocabularyPage.component';

@NgModule({
    declarations: [
        AppComponent,
        EpisodePageComponent,
        QuizPageComponent,
        AuthPageComponent,
        ModalLayoutComponent,
        EpisodeModalComponent,
        UnauthorizedComponent,
        Error500Component,
        AppLayoutComponent,
        VocabularyModalComponent,
        VocabularyPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
