import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as action_category from "../../../store/category.action";
import * as action_course from "../../../store/course.action";
import * as action_lesson from "../../../store/lesson.action";
import * as action_carousel from "../../../store/carousel.action";

@Component({
    selector: 'app-layout-admin',
    template: `

        <router-outlet></router-outlet>
 
    `,
    styles: []
})
export class LayoutAdminComponent implements OnInit {

    constructor(private store: Store<any>) {
        this.store.dispatch(action_category.load_request())
        this.store.dispatch(action_course.load_request())
        this.store.dispatch(action_lesson.load_request())
        this.store.dispatch(action_carousel.load_request())
    }

    ngOnInit(): void {
    }


}
