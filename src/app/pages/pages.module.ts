import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not.found/not.found.component';
import { PostFormComponent } from './post.form/post.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit.profile/edit.profile.component';
import { PostComponent } from './post/post.component';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    NotFoundComponent,
    PostFormComponent,
    PostComponent,
    NewsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
