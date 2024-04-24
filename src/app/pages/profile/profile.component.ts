import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/profile.interfaces';
import { combineLatest, switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';
import { ImageService } from '../../services/image.service';
import { IImageResponse } from '../../interfaces/image.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  currentUserUsername : string;
  currentUser! : IUser;
  token : string;
  authUserId : number;
  followers : number;
  following : number;
  canFollow : boolean;
  canUnFollow : boolean;
  posts : IPost[];
  base64Image: Map<number, string>;

  constructor( 
    private userService : UserService,
    private postService : PostService,
    private imageService : ImageService,
    private router : Router,
    private route : ActivatedRoute) {

    this.currentUserUsername = this.route.snapshot.params['profile'];
    this.authUserId = Number(localStorage.getItem('id'));
    this.token = localStorage.getItem('token')!;
    this.followers = 0;
    this.following = 0;
    this.canFollow = true;
    this.canUnFollow = false;
    this.posts = null!;
    this.base64Image = new Map<number, string>();
   }

   ngOnInit(): void {
    this.userService
      .findByUsername(this.currentUserUsername)
      .pipe(
        switchMap((userResp: IUser) => {
          if ( !userResp ) {
            this.router.navigate(['home/404']);        
          }
          this.currentUser = userResp;
          return combineLatest([
            this.userService.findFollowers(userResp.id!),
            this.userService.findFollowing(userResp.id!),
            this.postService.findUserPosts(userResp.id!)
          ]);
        })
      )
      .subscribe({
        next: ([followers, following, posts]: [IUser[], IUser[], IPost[]]) => {        
          this.followers = followers.length;
          this.following = following.length;
          this.posts = posts;

          this.canFollow = !followers.some((follower) => follower.id == this.authUserId);
          this.canUnFollow = !this.canFollow;

          if (this.authUserId == this.currentUser.id) {
            this.canFollow = false;
            this.canUnFollow = false;
          }

          this.posts.forEach((post) => {
            this.imageService.get(post.image)
            .subscribe({
              next : (resp : IImageResponse) => {
                this.base64Image.set(post.id!, resp.imageData);
              },
              error : (err) => {
                console.log(err);                
              }
            });
          });
        },
        error : (err) => {
          console.log(err);          
        }
    });
  }

  public follow() {
    this.userService.follow(this.authUserId, this.currentUser.id! )
      .subscribe({
        next : () => {
          this.canFollow = false;
          this.canUnFollow = true; 
          this.followers++;     
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  public unFollow() {
    this.userService.unFollow(this.authUserId, this.currentUser.id! )
      .subscribe({
        next : () => {
          this.canFollow = true;
          this.canUnFollow = false;  
          this.followers--;     

        },
        error: (err) => {
          console.log(err);
        }
      });
  }

}
