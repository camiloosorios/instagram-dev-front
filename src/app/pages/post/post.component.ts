import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../interfaces/post.interface';
import { combineLatest } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/profile.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { IComment, ICommentResponse } from '../../interfaces/comment.interfaces';
import { IImageResponse } from '../../interfaces/image.interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  
  base64Image! : string;
  postId : number;
  post! : IPost;
  username : string;
  user! : IUser;
  comments! : ICommentResponse[];

  constructor( private postService : PostService,
               private imageService : ImageService,
               private userService: UserService,
               private commentService : CommentService,
               private fb : FormBuilder,
               private route : ActivatedRoute ) {
                this.postId = this.route.snapshot.params['post'];
                this.username = this.route.snapshot.params['profile'];
               }

  ngOnInit(): void {
    combineLatest([
      this.postService.findById(this.postId),
      this.userService.findByUsername(localStorage.getItem('username')!),
      this.commentService.findComments(this.postId)
    ]).subscribe({
      next : ([post, user, comments]: [IPost, IUser, ICommentResponse[]]) => {
        this.post = post;
        this.user = user;
        this.comments = comments;
        console.log(comments);
        
        this.imageService.get(post.image)
        .subscribe({
          next : (resp : IImageResponse) => {
            this.base64Image = resp.imageData;            
          },
          error : (err) => {
            console.log(err);            
          }
        });
      },
      error : (err) => {
        console.log(err);        
      }
    });
  }

  public formComment : FormGroup = this.fb.group({
    comment : [,[Validators.required]]
  });

  public formValidate() {
    return this.formComment.controls['comment'].invalid && this.formComment.controls['comment'].touched
        ? true
        : false
  }

  public comment() {
    if (this.formComment.invalid) {
      return   
    }

    const comment : IComment = {
      content : this.formComment.controls['comment'].value,
      postId : this.post.id!,
      userId : this.user.id!
    }
    
    this.commentService.create(comment)
    .subscribe({
      next : () => {
        const comment : ICommentResponse = {
          content : this.formComment.controls['comment'].value,
          postId : this.post.id!,
          user : this.user.username,
          createdAt : new Date()
        }
        this.comments.push(comment);
        this.formComment.controls['comment'].reset();
        console.log(comment);
        
      }
    })

  }

}
