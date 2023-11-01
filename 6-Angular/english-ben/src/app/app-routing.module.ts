import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EpisodePageComponent} from "./view/feature/episode/episodePage.component";
import {QuizPageComponent} from "./view/feature/quiz/quizPage.component";
import {AuthPageComponent} from "./view/authPage.component";
import {ModalLayoutComponent} from "./view/layout/modalLayout.component";
import {EpisodeModalComponent} from "./view/feature/episode/episodeModal.component";
import {UnauthorizedComponent} from "./view/401Page.component";
import {Error500Component} from "./view/500Page.component";
import {AppLayoutComponent} from "./view/layout/appLayout.component";
import {VocabularyModalComponent} from "./view/feature/vocabulary/vocabularyModal.component";
import {VocabularyPageComponent} from "./view/feature/vocabulary/vocabularyPage.component";

const routes: Routes = [
    {path : 'app', component : AppLayoutComponent, children : [
        {path : 'episode', component : EpisodePageComponent},
        {path : 'vocabulary', component : VocabularyPageComponent },
        {path : 'quiz', component : QuizPageComponent},
        {path: '', redirectTo: 'episode', pathMatch: 'full'}
    ]},
    {path: 'auth', component: AuthPageComponent },
    {path: '401', component: UnauthorizedComponent },
    {path: '500', component: Error500Component },
    {path: 'modal', outlet: 'modal', component: ModalLayoutComponent,children : [
        { path: 'episode', component: EpisodeModalComponent},
        { path: 'vocabulary', component: VocabularyModalComponent}
    ] },
    {path: '', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
