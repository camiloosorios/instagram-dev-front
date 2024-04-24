import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not.found/not.found.component';
import { PostFormComponent } from './post.form/post.form.component';
import { EditProfileComponent } from './edit.profile/edit.profile.component';
import { PostComponent } from './post/post.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', component: NewsComponent },
      { path: 'user/:profile', component: ProfileComponent },
      { path: 'user/:profile/edit', component: EditProfileComponent },
      { path: 'user/:profile/post/:post', component: PostComponent },
      { path: 'new/post', component: PostFormComponent },
      { path: '404', component: NotFoundComponent },
    ]
  },
  { path: '**', redirectTo: '404' } // Redirige todas las rutas no definidas a la página 404
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
