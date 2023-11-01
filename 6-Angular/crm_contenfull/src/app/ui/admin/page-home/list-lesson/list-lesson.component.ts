import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectList, selectLoading} from "../../../../store/lesson.reducer";
import {delete_request} from "../../../../store/lesson.action";

@Component({
  selector: 'app-list-lesson',
  template: `
    <h1 class="lead">Lesson</h1>
    <ng-container *ngIf="loading$ | async as course_loading; else noCourseLoading">
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
          <th scope="col">Course</th>
          <th scope="col">Durée</th>
          <th scope="col">Niveau</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <ng-container *ngIf="items$ | async as items">
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
                <a [routerLink]="['../lesson-detail',item.id]" class="text-reset" title="update">
                    <i class="far fa-edit"></i>
                </a>
                  <app-confirm-delete (clickedEvent)="onDelete($event)" [id]="item.id"></app-confirm-delete>
              </td>
            </tr>
          </ng-container>
        </ng-container>
        </tbody>
      </table>
      <div class="d-flex justify-content-center"><a routerLink="../lesson-detail/new" class="btn btn-primary"
                                                    title="Ajouter">Ajouter</a></div>
    </ng-template>
  `,
  styles: []
})
export class ListLessonComponent implements OnInit {

  loading$: Observable<boolean>
  items$: Observable<any>

    constructor(private store: Store<any>) {
        this.items$ = this.store.select(selectList);
        this.loading$ = this.store.select(selectLoading)
    }

    ngOnInit(): void {

    }

    onDelete(id) {
        this.store.dispatch(delete_request({id}))
    }

}
