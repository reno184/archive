import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-visu-folder-item',
  template: `
   <ng-container *ngIf="folders">
     <div class="my-2"  *ngFor="let group of folders | keyvalue ">
       <!--BEGIN FORMULE-->
       <ng-container *ngIf="group.value.type === 'formule' ">
           <a (click)="toggle($event)" href="#" title="{{group.value.name}}" class="text-secondary" ><i class="far fa-folder mr-1"></i>{{group.value.name}}</a>
           <div class="toggle pl-1" >
                <app-visu-folder-item [folders]="group.value.compositions"></app-visu-folder-item>
           </div>
       </ng-container>
       <!--END FORMULE-->
       <!--BEGIN ALACARTE-->
       <ng-container *ngIf="group.value.type === 'group' && group.value.counter > 0">
         <a (click)="toggle($event)" href="#" title="{{group.value.name}}" class="text-secondary" ><i class="far fa-folder mr-1"></i>{{group.value.name}}</a>
           <div class="toggle pl-2" >
             <app-visu-folder-item [folders]="group.value.blocks"></app-visu-folder-item>
           </div>
       </ng-container>
       <!--END ALACARTE-->
       <!--BEGIN BLOCK-->
       <ng-container *ngIf="group.value.type === 'block' && group.value.counter > 0">
        <a (click)="toggle($event)" href="#" title="{{group.value.name}}" class="text-secondary" ><i class="far fa-folder mr-1"></i>{{group.value.name}}</a>
         <div class="toggle pl-3" >
            <div class="my-2" *ngFor="let article of group.value.articles">
              <div class="text-secondary">{{article.name}}<small class="text-primary ml-2">{{article.price}}</small><small class=" ml-2">{{article.desc}}</small></div>
              <app-visu-folder-item [folders]="article.questions"></app-visu-folder-item>
           </div>
         </div>
       </ng-container>
       <!--END BLOCK-->
       <!--BEGIN COMPOSITION-->
       <ng-container *ngIf="group.value.type === 'composition'">
         <a (click)="toggle($event)" href="#" title="{{group.value.name}}" class="text-secondary" ><i class="far fa-folder mr-1"></i>{{group.value.name}}</a>
         <div class="toggle pl-2">
            <app-visu-folder-item [folders]="group.value.blocks"></app-visu-folder-item>
         </div>
       </ng-container>
       <!--END COMPOSITION-->
       <!--BEGIN QUESTION-->
       <ng-container *ngIf="group.value.type == 'question' ">
         <div class="pl-3">
           <a (click)="toggle($event)" href="#" title="{{group.value.name}}" class="text-secondary" >{{group.value.name}}<i class="far fa-question-circle ml-1 text-primary"></i></a>
           <div class="toggle pl-4">
             <app-visu-folder-item [folders]="group.value.answers"></app-visu-folder-item>
           </div>
         </div>
       </ng-container>
       <!--END QUESTION-->
       <!--BEGIN REPONSE-->
       <ng-container *ngIf="group.value.type == 'answer' ">
         <small class="text-secondary" >{{group.value.name}}<small class="text-primary ml-2">{{group.value.price}}</small></small>
       </ng-container>
       <!--END REPONSE-->
       </div>
   </ng-container>
  `,
  styles: [
  ]
})
export class VisuFolderItemComponent implements OnInit {
  @Input() folders: any
  constructor() { }
  ngOnInit(): void {
    //  console.log(this.folders)
  }

  toggle(e:Event) {
    e.preventDefault()
    let elem = e.target as HTMLElement;
    if(elem.getAttribute('title')){
      const folderClose = elem.querySelector('.fa-folder')
      const folderOpen = elem.querySelector('.fa-folder-open')
      if(folderOpen){
        folderOpen.classList.remove('text-primary')
        folderOpen.classList.remove('fa-folder-open');
        folderOpen.classList.add('fa-folder');
      }
      if(folderClose){
        folderClose.classList.remove('fa-folder')
        folderClose.classList.add('fa-folder-open');
        folderClose.classList.add('text-primary');
      }
      elem = elem.parentNode.querySelector('.toggle');
      elem.classList.contains('active') ? elem.classList.remove('active') : elem.classList.add('active');
    }
  }
}
