import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as messageReducer from '../../../store/featureStates/MessageState/message.reducer';
import * as sceneReducer from '../../../store/featureStates/SceneState/SceneReducer';
import { map, mergeMap } from 'rxjs/operators';
import { AppInitService } from '../../../app.init.service';
import { ActivatedRoute } from '@angular/router';
import { StaticDatas } from '../../../labels.static';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.sass']
})
export class NavTopComponent implements OnInit {

  routeParamsMenuTop$ = this.activatedRoute.queryParams.pipe(map(params => params['menu-top']));
  counter$: Observable<number> = this.storeMessage.pipe(
    select(messageReducer.selectAllMessages),
    map(f => f.filter(item => item.read === false)),
    mergeMap(message => {
      return of(message.length);
    })
  );

  network$: Observable<string> = this.storeScene.pipe(
    select(sceneReducer.getPciAllNetworkState)
  );

  constructor(
    public appInitService: AppInitService,
    private storeMessage: Store<messageReducer.MessageState>,
    private storeScene: Store<sceneReducer.SceneState>,
    private activatedRoute: ActivatedRoute,
    public staticDatas: StaticDatas
  ) {
  }

  ngOnInit() {
  }


  getColorIcon(wifiState: string) {
    let str: string;
    switch (wifiState) {
      case  'pending' :
        str = 'text-warn';
        break;
      case  'inherit':
        str = 'text-dark';
        break;
      case  'error':
        str = 'text-danger';
        break;
      default:
        str = 'text-success';
    }
    return str;
  }

}
