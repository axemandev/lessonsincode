import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebRequestsComponent } from './components/web-requests/web-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    WebRequestsComponent
    ],
  imports: [
    BrowserModule,
   /* 
    * HttpClientModule provides handle to http requests like PUT, POST, GET, DELETE, PATCH 
    * via HttpClient. Having imported HttpClientModule, you can inject HttpClient in 
    * components (through constructors). Import this component after browser module. 
    */
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
