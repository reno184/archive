import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import staticDatas from './static-datas.json';
import configDatas from './config-datas.json';
import { IServerConf } from '@arpege/models';
import { StaticDatasModel } from './static-datas';
import { ConfigDatasModel } from './config-datas';


@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  configDatas: ConfigDatasModel = configDatas;
  staticDatas: StaticDatasModel = staticDatas;
  confFromServer: IServerConf;

  constructor(private httpClient: HttpClient) {
  }

  public init() {
    const promises = [];
    promises.push(this.httpClient.get('api/server/config').toPromise());

    return Promise.all(promises)
      .then(data => {
        if (data[0]) {
          this.confFromServer = data[0] as IServerConf;
        } else {
          throw new Error('api/login/config return null');
        }
      })
      .then(() => {
        const promises2 = [];
        promises2.push(
          new Promise((resolve, reject) => {
              try {
                fetch(this.confFromServer.MAP_URL + this.configDatas.providers.basic.url_part2 + this.configDatas.providers.basic.url_part3_test
                ).then(rep => rep.ok ? resolve() : reject({ message: rep.url + ' ' + rep.statusText })).catch(err => reject({ message: err.message }));
              } catch (e) {
                reject({ message: e.message });
              }
            }
          )
        );
        promises2.push(
          new Promise((resolve, reject) => {
              try {
                fetch(this.confFromServer.MAP_URL + this.configDatas.providers.satellite.url_part2 + this.configDatas.providers.satellite.url_part3_test
                ).then(rep => rep.ok ? resolve() : reject({ message: rep.url + ' ' + rep.statusText })).catch(err => reject({ message: err.message }));
              } catch (e) {
                reject({ message: e.message });
              }
            }
          )
        )
        ;
        return Promise.all(promises2);
      })
      .catch(err => {
        document.body.innerHTML = `<div style="color:red" >${err.message}</div>`;
      });
  }

}


