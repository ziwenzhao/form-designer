import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DraggingComponent } from './dragging/dragging.component';
import { FormcanvasComponent } from './formcanvas/formcanvas.component';
import { FormsettingComponent } from './formsetting/formsetting.component';
import { HeadActionsComponent } from './head-actions/head-actions.component';
import { HeaderComponent } from './header/header.component';
import { MainLeftComponent } from './main-left/main-left.component';
import { SettingComponent } from './setting/setting.component';
import { WidgetsettingsComponent } from './widgetsettings/widgetsettings.component';
import { EventService } from 'app/event.service';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
import { DataService } from 'app/data-service';
// firebase.initializeApp({
//   apiKey: "AIzaSyDl8FtLlnZZEB7LK1UyKwyRo3-u9O876AI",
//   authDomain: "crossingapp-8c987.firebaseapp.com",
//   databaseURL: "https://crossingapp-8c987.firebaseio.com",
//   projectId: "crossingapp-8c987",
//   storageBucket: "crossingapp-8c987.appspot.com",
//   messagingSenderId: "569648553346"
// });

@NgModule({
  declarations: [
    AppComponent,
    DraggingComponent,
    FormcanvasComponent,
    FormsettingComponent,
    HeadActionsComponent,
    HeaderComponent,
    MainLeftComponent,
    SettingComponent,
    WidgetsettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    EventService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
