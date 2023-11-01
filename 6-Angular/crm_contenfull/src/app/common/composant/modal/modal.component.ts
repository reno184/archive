import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-modal',
    template: `
        <style>
            .rhe-modal {
                width: 400px;
            }

            @media (max-width: 575.98px) {
                .rhe-modal {
                    width: 300px;
                }
            }
        </style>
        <div style="position: fixed;top:0;height: 100vh;  width: 100vw;  background: rgba(53, 53, 0, .3);  display: flex;  align-items: center;  justify-content: center">
            <div class="bg-white pt-4 pb-2 shadow rhe-modal"
                 style="border-radius: 5px;position: relative;margin-top: -10%;">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: []
})
export class ModalComponent implements OnInit {
    formGroup: FormGroup;
    params$: Observable<Params>;

    editorConfig = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            ['link'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
        ]
    };

    constructor(private formBuilder: FormBuilder, private router: Router, private  activatedRoute: ActivatedRoute) {
        this.formGroup = this.formBuilder.group({
            desc: ['', Validators.required],
            url: [''],
            content: [''],
        })
        this.params$ = this.activatedRoute.queryParams;
    }

    ngOnInit(): void {
    }

}
