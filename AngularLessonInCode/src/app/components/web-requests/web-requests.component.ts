import { Posts } from './../../posts';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from 'src/services/posts.service';
import { AppError } from 'src/app/app-error';

@Component({
  selector: 'app-web-requests',
  templateUrl: './web-requests.component.html',
  styleUrls: ['./web-requests.component.css']
})
export class WebRequestsComponent implements OnInit {

  posts: Posts[];

  constructor(private /* makes member of class */ postService: PostsService ) {
  }

  /*
   * Angular lifecycle method. This is an override of OnInit interface implmemented by
   * class definition. Like OnInit, there are other liefcycle interfaces/methods -
   * OnChange
   * DoCheck
   * AfterContentInit .. . 
   */
  ngOnInit() {
    this.getPosts();
  }


  getPosts() {
    this.postService.getPosts().subscribe(response => {
      this.posts = response as /* typecasting */ Posts[];
    });
  }

  addPost(postElement: HTMLInputElement) {
    let post: any = {title: postElement.value};
    this.postService.addPost(post).subscribe(response => {
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

  updatePost(post) {
    this.postService.updatePost(post, { isRead: true }).subscribe(response => {
      /* If trying it out, look for response payload. Base object remains same */
      console.log(response);
    })
  }

  deletePost(post) {
    this.postService.deletePost(post).subscribe(response => {
      /* case specific code to remove deleted element from collection */
      this.posts.splice(this.posts.indexOf(post), 1);
    },
    /* Add exception handling on the called http method */
    error => {
      /* 
       * Instead of manually checking status and handling error in component
       * better standards suggest including exception handling as a separate
       * concern in service and just use instances defined there to handle 
       * errors in components. 
       */ 
      if (error instanceof AppError)
        alert("Resource you are looking for is not found.");      
      /* 
       * Necessary to rethrow the error that will be handled by ErrorHandler
       * or custom global error handler if any 
       */
      else throw error;
    });
  }
}
