import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as sceneReducer from './store/featureStates/SceneState/SceneReducer';
import { MenuRightComponent } from './UI/right/menu-right.component';
import { PciEffects } from './store/featureStates/SceneState/pci/pci.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppInitService } from './app.init.service';
import { SetupEffect } from './store/featureStates/setup-mission/setup.effect';
import { FEATURE_SETUP, SetupReducer } from './store/featureStates/setup-mission/setup.reducer';
import * as reducerApp from './store/app/app.reducer';
import { FoEffect } from './store/featureStates/fo/fo.effect';
import { MainMapComponent } from './UI/map/main-map.component';
import { GeoElementEffect } from './store/featureStates/geo-element/geo-element.effect';
import { NavTopModule } from './UI/top/nav-top/nav-top.module';
import { BarBottomModule } from './UI/bottom/bar-bottom.module';
import { RootRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FEATURE_UNIT_SETTING, UnitSettingReducer } from './store/featureStates/unit-setting/unit-setting.reducer';
import { FEATURE_FO, FoReducer } from './store/featureStates/fo/fo.reducer';
import { FEATURE_GEO_ELEMENT, GeoElementReducer } from './store/featureStates/geo-element/geo-element.reducer';
import { TrackEffect } from './store/featureStates/track/track.effect';
import * as reducerTrack from './store/featureStates/track/track.reducer';
import { PisteListComponent } from './UI/right/piste-list/piste-list.component';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketArp } from './app.socket.service';
import * as infoPciReducer from './store/featureStates/pci-info/pci-info.reducer';
import { PciInfoEffects } from './store/featureStates/pci-info/pci-info.effect';
import * as missionReducer from './store/featureStates/mission/mission.reducer';

export function init_app(appLoadService: AppInitService, socketService: SocketArp) {
  return () => appLoadService.init().then(() => socketService.initSocket(appLoadService.confFromServer.WS_URL));
}

@NgModule({
  declarations: [
    AppComponent,
    MenuRightComponent,
    MainMapComponent,
    PisteListComponent
  ],
  imports: [
    NavTopModule,
    BarBottomModule,
    BrowserModule,
    HttpClientModule,
    SocketIoModule,
    ReactiveFormsModule,
    RootRoutingModule,
    StoreModule.forRoot({ err: reducerApp.Reducer }),
    StoreModule.forFeature(sceneReducer.FEATURE_SCENE, sceneReducer.SceneReducers),
    StoreModule.forFeature(FEATURE_FO, FoReducer),
    StoreModule.forFeature(FEATURE_GEO_ELEMENT, GeoElementReducer),
    StoreModule.forFeature(FEATURE_SETUP, SetupReducer),
    StoreModule.forFeature(FEATURE_UNIT_SETTING, UnitSettingReducer),
    StoreModule.forFeature(reducerTrack.FEATURE_KEY, reducerTrack.Reducer),
    StoreModule.forFeature(infoPciReducer.FEATURE_KEY, infoPciReducer.Reducer),
    StoreModule.forFeature(missionReducer.FEATURE_KEY, missionReducer.Reducer),
    EffectsModule.forRoot([
      PciEffects,
      SetupEffect,
      FoEffect,
      GeoElementEffect,
      TrackEffect,
      PciInfoEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    AppInitService,
    SocketArp,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService, SocketArp],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
