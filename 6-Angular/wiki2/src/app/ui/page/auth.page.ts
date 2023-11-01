import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth.page',
  template: `
<div style="display: flex; align-items: center; justify-content: center; height: 60%">
        <ng-container *ngIf="$user | async as user; else templateB">
            <div>
                <pre>{{user | json}}</pre>
                <footer>
                    <button (click)="onLogOut()">log out</button>
                </footer>
            </div>
        </ng-container>
        <ng-template #templateB>
            <form  #authForm="ngForm" (ngSubmit)="onSubmit(authForm)" >
                <div>
                    <input type="email" class="form-control" name="username" [(ngModel)]="temp.username" #validUsername="ngModel"   required>
                    <small *ngIf="validUsername.errors && validUsername.touched && validUsername.errors['required']" class="text-danger">username is required.</small>
                </div>
                <div style="margin-top: 5px">
                    <input class="form-control"  name="password" [(ngModel)]="temp.password"  required>
                </div>
                <footer style="margin-top: 20px; text-align: center">
                    <input type="submit" [disabled]="authForm.invalid">
                </footer>
            </form>
        </ng-template>
</div>
  `,
  styles: [

  ]
})
export class AuthPage implements OnInit {
    // todo add dirty class
    $user: Observable<firebase.User | null>;
    temp = {
        username:'toto@gmail.com',
        password:'184jai'
    }
    constructor( private auth: AngularFireAuth) {
        this.$user =  this.auth.authState.pipe()
    }
     ngOnInit(): void {

    }
    onSubmit(form: NgForm) {
        this.auth.signInWithEmailAndPassword(form.value.username,form.value.password).catch(err=>{
            alert(err.code)
        })
    }
    async onLogOut(){
        await this.auth.signOut()
    }
}
