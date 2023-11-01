import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {ReactiveFormsModule} from "@angular/forms";
import {GroupListComponent} from './feature/carte/group/group-list.component';
import {ArticleListComponent} from './feature/carte/article/article-list.component';
import {QuestionListComponent} from './feature/carte/question/question-list.component';
import {ReponseListComponent} from './feature/carte/question/reponse-list.component';
import {VisuComponent} from './feature/carte/visu/visu.component';
import {DirectivesModule} from "../../shared/directive/directive.module";

import { ModalPriceComponent } from '../modal/modal-price.component';
import {FormuleListComponent} from "./feature/carte/formule/formule-list.component";
import { VisuFolderItemComponent } from './feature/carte/visu/visu-folder-item/visu-folder-item.component';


@NgModule({
    declarations: [ AdminComponent, GroupListComponent, ArticleListComponent, QuestionListComponent, ReponseListComponent, VisuComponent,FormuleListComponent, ModalPriceComponent, VisuFolderItemComponent],
    imports: [
        CommonModule,
        DirectivesModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                            {path: 'formule-list', component: FormuleListComponent},
                            {path: 'group-list', component: GroupListComponent},
                            {path: 'question-list', component: QuestionListComponent},
                            {path: 'question-detail', component: ReponseListComponent},
                            {path: 'article-list', component: ArticleListComponent},
                            {path: 'visu', component: VisuComponent},
                            {path: '', redirectTo: 'visu', pathMatch: 'full'}
                        ]
            }
        ])
    ]
})
export class AdminModule {
}
