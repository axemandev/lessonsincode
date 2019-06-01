import { Posts } from './../../posts';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-web-requests',
  templateUrl: './web-requests.component.html',
  styleUrls: ['./web-requests.component.css']
})
export class WebRequestsComponent implements OnInit {

  posts: Posts[];
  url: string = 'http://jsonplaceholder.typicode.com/posts';

  /* Having imported HttpClientModule in app.module.ts ng will allow injecting
   * HttpClient into component.
   *
   * Methods on HttpClient object:
   * get - sends a get request to provided url and returns Observable with response.
   *       Look for json method on response. I couldn't find one so type casted the
   *       known response object to class instance.
   * post - sends a post request.
   */
  constructor(private /* makes member of class */ http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  /* 
   * Example of get method. Get takes url string and returns an Observable instance 
   * with response. 
   */
  getPosts() {
    this.http.get(this.url).subscribe(response => {
      this.posts = response as /* typecasting */ Posts[];
    });
  }

  /* 
   * Example of post method. Post takes url string and returns an Observable instance 
   * with response. 
   */
  addPost(postElement: HTMLInputElement) {
    let post: any = {title: postElement.value};
    this.http.post(this.url, JSON.stringify(post)).subscribe(response => {
      post.id = (response as Posts).id;
      /* splice method on collections 
       * This method allows deleteing or adding an element to collection from/at a 
       * specified position. Below example starts from 0th position in collection
       * select 0 elements for deletion and adds post element to the top.
       */
      this.posts.splice(0, 0, post);
    })
    postElement.value = '';
  }

  /* 
   * Example of update method. Update method can be called either via PUT or PATCH 
   * request. Basic difference between PUT and PATCH is PATCH only updates the values
   * passed leaving other attributes intact. PUT requires whole object to be passed
   * in order to perform an update. From network overhead point of view, PATCH should be 
   * preferred over PUT.
   */
  updatePost(post) {
    let postUrl = this.url + "/" + post.id;
    this.http.patch(postUrl, JSON.stringify({ isRead: true })).subscribe(response => {
      /* If trying it out, look for response payload. Base object remains same */
      console.log(response);
    })
  }

  /*
   * Example of delete method. This method uses DELETE request on http client to remove
   * elements. Delete doesnot have a body as it doesn't really does any altering of the
   * object other than removing it. 
   */
  deletePost(post) {
    let deleteUrl = this.url + "/" + post.id;
    this.http.delete(deleteUrl).subscribe(response => {
      /* case specific code to remove deleted element from collection */
      this.posts.splice(this.posts.indexOf(post), 1);
    });
  }

}
