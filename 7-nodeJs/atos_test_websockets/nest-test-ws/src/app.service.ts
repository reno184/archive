import { Injectable } from '@nestjs/common';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable()
export class AppService {
  getHello(): Observable<any> {
    return of({ title : 'Hello World!'}).pipe(delay(1000));
  }
}
