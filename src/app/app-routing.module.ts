import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  }, 
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule )
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
