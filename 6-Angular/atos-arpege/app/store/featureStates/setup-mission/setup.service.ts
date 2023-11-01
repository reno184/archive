import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SetupService {
    constructor(private httpClient: HttpClient) {
    }

    getAll() {
        return this.httpClient.get('api/setup');
    }

    post(body) {
        return this.httpClient.post('api/setup', body);
    }

    put(body, id) {
        return this.httpClient.put('api/setup/' + id, body);
    }


}
