import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from 'src/app/posts';
import { catchError } from 'rxjs/operators'; /* Patch operators */
import { throwError } from 'rxjs'; /* to throw error after ng 6+ */
import { AppError } from 'src/app/app-error';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url: string = 'http://jsonplaceholder.typicode.com/posts';

  /* 
   * Having imported HttpClientModule in app.module.ts ng will allow injecting
   * HttpClient into component.
   *
   * Methods on HttpClient object:
   * -----------------------------
   * get - sends a get request to provided url and returns Observable with response.
   * Look for json method on response. I couldn't find one so type casted the known response 
   * object to class instance.
   * 
   * post - sends a post request and returns an Observable. 
   * 
   * put/patch - calls an update request using http put or patch method. Patch method 
   * updates only the passed attributes while you need to pass entire object in case of
   * an update to entity.
   * 
   * delete - uses http delete method on posted url. 
   */
  constructor(private http: HttpClient) { }

  /* 
   * Example of get method. Get takes url string and returns an Observable instance 
   * with response. 
   */
  getPosts() {
    return this.http.get(this.url);
  }

  /* 
   * Example of post method. Post takes url string and returns an Observable instance 
   * with response. 
   */
  addPost(post: Posts) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  /* 
   * Example of update method. Update method can be called either via PUT or PATCH 
   * request. Basic difference between PUT and PATCH is PATCH only updates the values
   * passed leaving other attributes intact. PUT requires whole object to be passed
   * in order to perform an update. From network overhead point of view, PATCH should be 
   * preferred over PUT.
   */
  updatePost(post, update) {
    let postUrl = this.url + "/" + post.id;
    return this.http.patch(postUrl, JSON.stringify(update));
  }

  /*
   * Example of delete method. This method uses DELETE request on http client to remove
   * elements. Delete doesnot have a body as it doesn't really does any altering of the
   * object other than removing it. 
   */
  deletePost(post) {
    let deleteUrl = this.url + "/pa" + post.id;
    return this.http.delete(this.url)
               /* 
                * pipe() - part of RxJs, allows clubbing multiple functions together as 
                * a single funciton.
                * 
                * catchError() - method on observable that throws a new observable object
                * or user defined error (like in our case below). catchError takes a method
                * as parameter that should return a Observable.
                * 
                * throwError() - this method is in conjunction with catchError and returns
                * an Observable object instance that is used to throw user defined error.
                */
               .pipe(catchError((errorResponse: Response) => {
                 if (errorResponse.status === 400)
                  return throwError(new AppError(errorResponse));
                 else 
                  return throwError(new Observable());
               }));
  }
}
