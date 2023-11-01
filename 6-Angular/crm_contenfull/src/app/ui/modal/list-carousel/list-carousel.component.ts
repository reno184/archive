import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {CarouselService} from "../../../service/carousel.service";
import {selectList} from "../../../store/carousel.reducer";
import {add_image, delete_image} from "../../../store/carousel.action";

@Component({
  selector: 'app-page-carousel',
  template: `
      <div class="container">
          <h1 class="lead mt-4">Carousel</h1>
          <hr>

          <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="mb-3">
              <input type="text" formControlName="imgUrl">
              <input type="text" formControlName="imgPath">
              <div class="custom-file mt-2">
                  <input type="file" class="form-control" id="i02" (change)="onChange($event)">
                  <div class="progress" style="width: 30%;height: 5px;margin-top: 5px"
                       [ngStyle]="{'opacity': (uploadPercent$ | async) === 0 ? 0 : 1 }">
                      <div id="progress" class="progress-bar  bg-primary" role="progressbar"
                           [ngStyle]="{ 'width' :  (uploadPercent$ | async) +'%' }" style="width: 0;"
                           aria-valuenow="0"
                           aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
          </form>
          <ng-container *ngIf="images$ | async as images">
              <div class="row row-cols-1 row-cols-md-6 g-4">
                  <ng-container *ngFor="let image of images">
                      <div class="col" *ngIf="image.path.indexOf('thumb_') === -1 ">
                          <div class="card">
                              <img [src]="image.url" class="card-img-top" alt="image">
                              <div class="card-body">Card title
                                  <a (click)="onDelete(image.id, image.path)">Suppression</a>
                              </div>
                          </div>
                      </div>
                  </ng-container>
              </div>
          </ng-container>

      </div>
  `,
    styles: []
})
export class ListCarouselComponent implements OnInit {
    images$: Observable<any[]>;
    uploadPercent$: Observable<any>;
    formGroup: FormGroup;
    tt: string;

    constructor(private angularFireStorage: AngularFireStorage, private formBuilder: FormBuilder, private store: Store<any>, public imageService: CarouselService) {
        this.formGroup = new FormGroup({
            'imgUrl': this.formBuilder.control(null, Validators.required),
            'imgPath': this.formBuilder.control(null, Validators.required),
        });
        this.images$ = this.store.pipe(select(selectList));
    }

  ngOnInit(): void {
  }

  onSubmit() {
    const obj = this.formGroup.value

  }


  onChange($event: any) {
      const file = $event.target.files[0];
      const newUrl = 'img_' + Date.now();
    const fileRef = this.angularFireStorage.ref('crm/contentful/' + newUrl);
    const task = fileRef.put(file);
    this.uploadPercent$ = task.percentageChanges();
    task.then((x) => {
      fileRef.getDownloadURL().toPromise().then(value => {
          this.uploadPercent$ = of(0);
          this.formGroup.get('imgUrl').patchValue(value);
          this.formGroup.get('imgPath').patchValue(newUrl);
          this.tt = value;
          this.store.dispatch(add_image({
              obj: {
                  id: Date.now().toString(),
                  url: value,
                  path: 'crm/contentful/' + newUrl
              }
          }))
      })
    });
  }

    onDelete(id, path) {
        console.log(path)
        this.angularFireStorage.ref(path).delete().toPromise().then(() => {
            this.store.dispatch(delete_image({id}));
        });
    }
}
