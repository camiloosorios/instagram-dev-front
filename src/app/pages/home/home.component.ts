import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/profile.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  username! : string;
  showModal: boolean = false;
  @ViewChild('menu') menu! : ElementRef;
  @ViewChild('modal') modal! : ElementRef;
  private debouncer: Subject<string> = new Subject<string>();
  users! : IUser[];


  constructor( private userService : UserService,
               private router : Router ){
    this.username = localStorage.getItem('username')!;
    this.debouncer.pipe(
      debounceTime(500),
    ).subscribe((value) => {
      userService.findByUsernameOrFullname(value)
      .subscribe({
        next : (resp : IUser[]) => {
          this.users = resp;          
        }
      })
    });   
  }

  public showMenu() : void {
    this.menu.nativeElement.classList.toggle('active');
  }

  public closeMenu() : void {
    this.menu.nativeElement.classList.remove('active');
  }

  openModal() : void {
    this.showModal = true;
    this.modal.nativeElement.classList.add('active');
    this.closeMenu();
  }

  closeModal() : void {
    this.showModal = false;
    this.modal.nativeElement.classList.remove('active');
  }

  search(value: string): void {
    this.debouncer.next(value);    
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');

    this.router.navigateByUrl('auth');
  }

}
