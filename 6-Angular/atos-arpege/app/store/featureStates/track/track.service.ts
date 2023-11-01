import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketArp } from 'src/app/app.socket.service';
import { throttleTime } from 'rxjs/operators';
import { StaticConfig } from '../../../config.static';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private httpClient: HttpClient, private socket: SocketArp, private staticConfig: StaticConfig) {

  }

  getAll() {
    return this.socket.fromEvent('trackToClient').pipe(throttleTime(this.staticConfig.intervalWebsocket));
  }

  /*  changeIdentity(id, value) {
      return this.httpClient.put('api/geo-element/' + id, body);
    }*/

  kill(id) {
    return this.httpClient.get('api/cmd/kill?id=' + id);
  }

  toggleActive(id, val) {
    return this.httpClient.get(`api/cmd/status?id=${id}&val=${val}`);
  }
}
