import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ModalComponent} from "./modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {OrderComponent} from './order.component';
import {BasketComponent} from "./basket.component";

@NgModule({
    declarations: [ModalComponent, BasketComponent, OrderComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '', component: ModalComponent, children: [
                {path: 'order', component: OrderComponent},
                {path: 'basket', component: BasketComponent},
            ]
        }])
    ]
})
export class ModalModule {
}
