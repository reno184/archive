import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import * as reducer_course from "../../../../store/course.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-list-course',
  template: `
    <h1 class="lead">Course</h1>
    <ng-container *ngIf="course_loading$ | async as course_loading; else noCourseLoading">
      <div class="text-center">
        <i class="far fa-spin fa-spinner"></i>
      </div>
    </ng-container>
    <ng-template #noCourseLoading>
      <table class="table bg-white">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Categorie</th>
          <th scope="col">Durée</th>
          <th scope="col">Niveau</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <ng-container *ngIf="course_items$ | async as items">
          <tr *ngIf="items.length ===0">
            <td colspan="6" class="text-center"><i class="far fa-box-open fa-2x"></i></td>
          </tr>
          <ng-container *ngIf="items.length >0">
            <tr *ngFor="let item of items; index as i">
              <th scope="row">{{i}}</th>
              <td>{{item['title-US']}}</td>
              <td>{{item['categories']}}</td>
              <td>{{item.duration}}</td>
              <td>{{item.levels}}</td>
              <td class="text-end">
                <a [routerLink]="['../course-detail',item.id]" class="text-reset" title="update"><i
                    class="far fa-edit"></i></a>
                <a routerLink="../course-detail/" class="text-reset ms-2" title="delete"><i
                    class="far fa-trash"></i></a>
              </td>
            </tr>
          </ng-container>
        </ng-container>
        </tbody>
      </table>
      <div class="d-flex justify-content-center"><a routerLink="../course-detail/new" class="btn btn-primary"
                                                    title="Ajouter">Ajouter</a></div>
    </ng-template>
  `,
  styles: []
})
export class ListCourseComponent implements OnInit {
  course_items$: Observable<any>;
  course_loading$: Observable<any>

  constructor(private store: Store<any>) {
    this.course_items$ = this.store.select(reducer_course.selectItems);
    this.course_loading$ = this.store.select(reducer_course.selectLoading)
  }

  ngOnInit(): void {
  }

}
