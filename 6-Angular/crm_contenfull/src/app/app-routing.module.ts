import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./ui/page-not-found/page-not-found.component";
import {PageLoginComponent} from "./ui/page-login/page-login.component";
import {AuthGuardService as AuthGuard} from "./common/service/auth.guard.service";
import {PageHomeComponent} from "./ui/admin/page-home/page-home.component";
import {LayoutAdminComponent} from "./ui/admin/layout-admin/layout-admin.component";
import {PageCourseDetailComponent} from "./ui/admin/page-course-detail/page-course-detail.component";
import {PageLessonDetailComponent} from "./ui/admin/page-lesson-detail/page-lesson-detail.component";
import {ListCarouselComponent} from "./ui/modal/list-carousel/list-carousel.component";
import {LayoutModalComponent} from "./ui/modal/layout-modal/layout-modal.component";
import {SelectImageComponent} from "./ui/modal/select-image/select-image.component";

const routes: Routes = [
    {path: 'login', component: PageLoginComponent},
    {
        path: 'admin', data: {role: 'admin'}, canActivate: [AuthGuard], component: LayoutAdminComponent, children: [
            {path: 'home', component: PageHomeComponent},
            {path: 'course-detail/:id', component: PageCourseDetailComponent},
            {path: 'lesson-detail/:id', component: PageLessonDetailComponent}
        ]
    },
    {
        path: 'modal', outlet: 'modal', children: [
            {
                path: '', component: LayoutModalComponent, children: [
                    {path: 'carousel', component: ListCarouselComponent},
                    {path: 'select-image', component: SelectImageComponent}
                ]
            }
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
