import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";


const config: SocketIoConfig = { url: 'http://localhost:3000', options: { path : '/ws'}};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,  SocketIoModule.forRoot(config),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
