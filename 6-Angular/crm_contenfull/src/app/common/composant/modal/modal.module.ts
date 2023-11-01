import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ModalComponent} from "./modal.component";
import {TitleContentComponent} from "./title-content/title-content.component";
import {ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";


@NgModule({
    declarations: [ModalComponent, TitleContentComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '', component: ModalComponent, children: [
                    {path: 'titleContent', component: TitleContentComponent}
                ]
            }
        ])
    ]
})
export class ModalModule {
}
