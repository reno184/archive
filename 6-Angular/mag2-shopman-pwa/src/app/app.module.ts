import {isDevMode, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {ProductPageComponent} from './view/feature/product/product-page.component'
import {HttpClientModule} from '@angular/common/http'
import {AuthPageComponent} from './view/authPage.component'
import {ModalLayoutComponent} from './view/layout/modalLayout.component'
import {ProductModalComponent} from './view/feature/product/product-modal.component'
import {AppLayoutComponent} from './view/layout/appLayout.component'
import {TodoPageComponent} from './view/feature/todo/todo-page.component'
import {PopoverDirective} from './view/directive/popover.directive'
import {ServiceWorkerModule} from '@angular/service-worker'
import {MenuLeftComponent} from './view/layout/menu-left.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
    declarations: [
        AppComponent,
        ProductPageComponent,
        AuthPageComponent,
        ModalLayoutComponent,
        ProductModalComponent,
        AppLayoutComponent,
        TodoPageComponent,
        PopoverDirective,
        MenuLeftComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
