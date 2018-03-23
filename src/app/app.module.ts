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
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
