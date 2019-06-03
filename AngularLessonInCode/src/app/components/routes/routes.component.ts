import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  /*
   * ActivatedRoute provides way to extract Route Parameters from URL
   */
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    /* 
     * ActiveatedRoute provides parameter map from which we can extract
     * route parameters. Provide the parameter name variable given in 
     * app.module.ts while mapping routes usings RouteModule.forRoot/Child()
     */
    this.route.paramMap.subscribe(params => {
      console.log(params.get("routeId"));
    });

    /*
     * An alternate method of getting route param is through snapshot  instance. 
     * ng destroys a component whenever user navigates away from page and re-initializes
     * it when a page is invoked again. However, if a route call just stays in the same 
     * context of component ng doesnot destroy component instance. This instance can then 
     * be accessed via snapshot instance. 
     */
    let routeId = this.route.snapshot.paramMap.get("routeId");
    let routeName = this.route.snapshot.paramMap.get("routeName");
    console.log(routeName);

    /* 
     * Similar to route param, query param details can be extracted from ActivatedRoute
     * instance using queryParams that returns an observable. 
     */
    let queryParamUsername = this.route.queryParams.subscribe(param => {
      console.log(param['username']);
    });

    /*
     * Instead of having multiple observables to subscribe to, these observables can be
     * combined together to create a single observable factory and use it to get the 
     * necessary values through a single subscription
     *
     * Sample Code (giving error as of now ) 
     * 
     * Observable.combineLatest([
     *    this.route.paramMap,
     *    this.route.queryParamMap
     * ]).subscribe(param => {
     *    console.log(param[0].get("routeId"));
     * });
     */     
  }

 /* 
  * Programmatic Routing:
  * To programmatically route to a path you need a Router instance instead of ActivatedRoute.
  * With router instance use navigate method to navigate to a link.
  * 
  * params on navigate(..)
  * route params array - [0] = link, [1+] = route params
  * query params object - queryParams: { key: value }
  */
  submit() {
    this.router.navigate(['/route', 98234, 'someRandom'], 
    {queryParams: {username: 'Pennyzai', town: 'Tinseltown'}});
  }

}
