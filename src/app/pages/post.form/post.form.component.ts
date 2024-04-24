import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post.form',
  templateUrl: './post.form.component.html',
  styleUrl: './post.form.component.scss'
})
export class PostFormComponent {

  messageCreatePost : string = '';

  constructor( private fb : FormBuilder,
               private router : Router,
               private imageService : ImageService,
               private postService : PostService ) {}

  public formPost : FormGroup = this.fb.group({
    image: [, [Validators.required]],
    description : [, [Validators.required]]
  });

  public formValidate( campo : string ) {
    return this.formPost.controls[campo].invalid && this.formPost.controls[campo].touched
        ? true
        : false
  }

  public styleValidate ( campo : string ) {
    return this.formPost.controls[campo].invalid && this.formPost.controls[campo].touched
        ? 'form__field-input form__field-error'
        : 'form__field-input'
  }

  public onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.formPost.controls['image'].patchValue(file);
    }
  }

  public create() {
    if (this.formPost.invalid) {
      this.formPost.markAllAsTouched();
      return;
    }
    
    const formData = new FormData();
    formData.append('imageData', this.formPost.get('image')!.value);
    
    this.imageService.create(formData).subscribe({
      next: () => {
        const post : IPost = {
          image : this.formPost.controls['image'].value.name,
          description : this.formPost.controls['description'].value,
          userId : Number(localStorage.getItem('id'))
        }

        this.postService.create(post).subscribe({
          next : () => {
            const username : string = localStorage.getItem('username')!;
            this.router.navigateByUrl(`home/user/${username}`);
          },
          error : (err) => {
            console.log(err);          
          }
        })    
      },
      error : (err) => {
        console.log(err);
      }
    });
    
  }

}
