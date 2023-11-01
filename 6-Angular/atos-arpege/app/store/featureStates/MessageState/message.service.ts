import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from './message.interface';

@Injectable()
export class MessageService {
    constructor(private httpClient: HttpClient) {}
    getAll(): Observable<Message[]> {
        return this.httpClient.get('api/messages').pipe(
            map(response => {
                return response as Message[];
            }),
        );
    }
}
