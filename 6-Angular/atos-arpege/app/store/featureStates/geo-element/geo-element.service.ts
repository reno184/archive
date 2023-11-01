import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeoElementService {

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get('api/geo-element');
  }

  post(body) {
    return this.httpClient.post('api/geo-element', body);
  }

  put(body, id) {
    return this.httpClient.put('api/geo-element/' + id, body);
  }
}
