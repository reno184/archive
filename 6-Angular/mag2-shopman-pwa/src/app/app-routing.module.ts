import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ProductPageComponent} from './view/feature/product/product-page.component'

import {AuthPageComponent} from './view/authPage.component'
import {ModalLayoutComponent} from './view/layout/modalLayout.component'
import {ProductModalComponent} from './view/feature/product/product-modal.component'
import {AppLayoutComponent} from './view/layout/appLayout.component'
import {TodoPageComponent} from './view/feature/todo/todo-page.component'
import {MenuLeftComponent} from './view/layout/menu-left.component'

const addBodyStyle = function () {
    document.body.setAttribute('style', 'overflow:hidden')
}
const removeBodyStyle = function () {
    document.body.removeAttribute('style')
}
const routes: Routes = [
    {
        path: 'app', component: AppLayoutComponent, children: [
            {path: '6-products', component: ProductPageComponent, title: 'page products'},
            {path: 'todo', component: TodoPageComponent, title: 'page todos'},
            {path: '', redirectTo: '6-products', pathMatch: 'full'}
        ]
    },
    {path: 'auth', component: AuthPageComponent},
    {
        path: 'modal',
        outlet: 'modal',
        component: ModalLayoutComponent,
        canActivate: [addBodyStyle],
        canDeactivate: [removeBodyStyle],
        children: [
            {path: '6-products', component: ProductModalComponent}
        ]
    },
    {
        path: 'menuLeft',
        outlet: 'menu',
        canActivate: [addBodyStyle],
        canDeactivate: [removeBodyStyle],
        component: MenuLeftComponent,
        data: {animation: 'slideLeft'}
    },
    {path: '', redirectTo: 'auth', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
