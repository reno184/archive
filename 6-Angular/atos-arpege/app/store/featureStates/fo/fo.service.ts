import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class FoService {
    constructor(private httpClient: HttpClient) {}

    getAll() {
        return this.httpClient.get('api/fo');
    }

    post(body) {
        return this.httpClient.post('api/fo', body);
    }

    put(body, id) {
        return this.httpClient.put('api/fo/' + id, body);
    }
}
