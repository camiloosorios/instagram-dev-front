import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  private postService : PostService = inject(PostService);
  public followingPosts! : IPost[];
  public token : string = localStorage.getItem('token')!;

  ngOnInit(): void {
    this.postService.findFollowingPosts(Number(localStorage.getItem('id')))
    .subscribe({
      next : (resp : IPost[]) => {
        this.followingPosts = resp;           
      }
    })
  }

}
