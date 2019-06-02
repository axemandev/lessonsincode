import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebRequestsComponent } from './components/web-requests/web-requests.component';
import { AppErrorHandler } from './app-error-handler';
import { RouterModule } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';

@NgModule({
  declarations: [
    AppComponent,
    WebRequestsComponent,
    RoutesComponent
    ],
  imports: [
    BrowserModule,
   /* 
    * HttpClientModule provides handle to http requests like PUT, POST, GET, DELETE, PATCH 
    * via HttpClient. Having imported HttpClientModule, you can inject HttpClient in 
    * components (through constructors). Import this component after browser module. 
    */
    HttpClientModule,
   /*
    * FormsModule provides access to angular's form handling routine. This comes with additional
    * directives like ngForm and ngSumbit that can be used over traditional html form element.
    */
    FormsModule,
   /* 
    * Reactive forms module gives access to dynamic handling for form and its attributes.With this 
    * module elements like FormGroup, FormComponent, FormArray can be used to create dynamic elements
    * and work with existing one. This is very handy as programmatic control provides way add dynamic
    * behavior to otherwise static elements. 
    */
    ReactiveFormsModule,
   /* 
    * Router module provides routes to navigate from one page/component to another. 
    * 
    * forRoot() - path (e.g. posts/:postId) to component (e.g. PostComponent __from declaration 
    * section) mapping at root context level. Use ** as wildcard for any path that is not handled 
    * in the list before **. Declaration should always follow from specific first to more generic 
    * later.
    * 
    * forChild() - 
    * 
    * RouterOutlet <router-outlet> should be added in component's html file to allow angular to 
    * render routed component AFTER this router outlet tag. Angular throws error in case of a 
    * missing router outlet.
    */
    RouterModule.forRoot([
      {path: 'web', component: WebRequestsComponent},
      {path: 'route', component: RoutesComponent}
    ]),
    AppRoutingModule
  ],
  providers: [
    /* 
     * This instruction tells angular to override ErrorHandler provider everywhere with  
     * custom AppErrorHandler provider. Without this declaration only explicit usage of 
     * AppErrorHandler will take effect. Use this method to override provider implementations.
     * 
     * ErrorHandler - default provider that handles global errors.
     * 
     * AppErrorHandler - custom error handler that overrides default one. 
     */
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
