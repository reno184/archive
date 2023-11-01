import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ModalComponent} from "./modal.component";
import {QuestionStockComponent} from '../admin/feature/carte/article/question-stock.component';
import {ReponseListComponent} from "../admin/feature/carte/question/reponse-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionConfirmDeleteComponent} from "../admin/feature/carte/question/question-confirm-delete.component";
import {ModalPriceComponent} from "./modal-price.component";
import {ModalArticleDetailComponent} from './modal-article-detail.component';
import { ModalSortComponent } from './modal-sort.component';


@NgModule({
    declarations: [QuestionStockComponent, ModalArticleDetailComponent, QuestionConfirmDeleteComponent, ModalArticleDetailComponent, ModalSortComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '', component: ModalComponent, children: [
                {path: 'formule-stock', component: ModalPriceComponent},
                {path: 'answer-list', component: ReponseListComponent},
                {path: 'modal-question', component: QuestionStockComponent},
                {path: 'modal-article-detail', component: ModalArticleDetailComponent},
                {path: 'question-confirm-delete', component: QuestionConfirmDeleteComponent},
                {path: 'modal-sort', component: ModalSortComponent}
            ]
        }])
    ]
})
export class ModalModule {
}
