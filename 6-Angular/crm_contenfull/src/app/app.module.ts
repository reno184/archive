import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ToastComponent} from './common/composant/toast/toast.component';
import {HttpClientModule} from "@angular/common/http";
import * as rootReducer from "./store/root.reducer";
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from "@ngrx/store";
import {PageLoginComponent} from './ui/page-login/page-login.component';
import {SizeDetectorComponent} from './common/composant/size-detector/size-detector.component';
import {BlockerComponent} from './common/composant/blocker/blocker.component';
import {EffectsModule} from "@ngrx/effects";

import {ErrorComponent} from './common/composant/error/error.component';
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";

import * as courseReducer from "./store/course.reducer";
import * as lessonReducer from "./store/lesson.reducer";
import * as carouselReducer from "./store/carousel.reducer";
import * as categoryReducer from "./store/category.reducer";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageNotFoundComponent} from "./ui/page-not-found/page-not-found.component";
import {LayoutAdminComponent} from './ui/admin/layout-admin/layout-admin.component';
import {PageHomeComponent} from "./ui/admin/page-home/page-home.component";
import {PageCourseDetailComponent} from './ui/admin/page-course-detail/page-course-detail.component';
import {PageLessonDetailComponent} from './ui/admin/page-lesson-detail/page-lesson-detail.component';
import {CourseEffects} from "./store/course.effect";
import {QuillModule} from "ngx-quill";
import {CategoryEffects} from "./store/category.effect";
import {ListCourseComponent} from './ui/admin/page-home/list-course/list-course.component';
import {ListLessonComponent} from './ui/admin/page-home/list-lesson/list-lesson.component';
import {LessonEffects} from "./store/lesson.effect";
import {InputTextComponent} from './common/composant/form/input-text/input-text.component';
import {InputSelectComponent} from './common/composant/form/input-select/input-select.component';
import {ListCarouselComponent} from './ui/modal/list-carousel/list-carousel.component';
import {CarouselEffects} from "./store/carousel.effect";
import {LayoutModalComponent} from './ui/modal/layout-modal/layout-modal.component';
import {FormAddCarouselComponent} from './ui/modal/form-add-carousel/form-add-carousel.component';
import {SelectImageComponent} from './ui/modal/select-image/select-image.component';
import {ConfirmDeleteComponent} from "./common/composant/confirm-delete/confirm-delete.component";

@NgModule({
    declarations: [
        AppComponent,
        ToastComponent,
        PageLoginComponent,
        BlockerComponent,
        ErrorComponent,
        SizeDetectorComponent,
        PageNotFoundComponent,
        LayoutAdminComponent,
        PageHomeComponent,
        PageCourseDetailComponent,
        PageLessonDetailComponent,
        ListCourseComponent,
        ListLessonComponent,
        InputTextComponent,
        InputSelectComponent,
        ListCarouselComponent,
        LayoutModalComponent,
        FormAddCarouselComponent,
        SelectImageComponent,
        ConfirmDeleteComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        StoreModule.forRoot({root: rootReducer.Reducer}),
        StoreModule.forFeature(courseReducer.FEATURE_KEY, courseReducer.Reducer),
        StoreModule.forFeature(lessonReducer.FEATURE_KEY, lessonReducer.Reducer),
        StoreModule.forFeature(categoryReducer.FEATURE_KEY, categoryReducer.Reducer),
        StoreModule.forFeature(carouselReducer.FEATURE_KEY, carouselReducer.Reducer),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([CourseEffects, CategoryEffects, LessonEffects, CarouselEffects])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
