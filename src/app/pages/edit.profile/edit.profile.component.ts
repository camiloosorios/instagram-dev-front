import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/profile.interfaces';

@Component({
  selector: 'app-edit.profile',
  templateUrl: './edit.profile.component.html',
  styleUrl: './edit.profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  public username : string;
  public isDifferentPassword : boolean;
  public errorMessage : string;
  @ViewChild('passwordConfirmation') passwordConfirmation! : ElementRef;

  constructor( private fb : FormBuilder,
               private userService : UserService,
               private router : Router ) {
    this.username = localStorage.getItem('username')!;
    this.errorMessage = '';
    this.isDifferentPassword = false;
  }
  ngOnInit(): void {
    this.userService.findByUsername(this.username)
    .subscribe({
      next : (resp : IUser) => {
        this.formEditUser.controls['id'].setValue(resp.id);
        this.formEditUser.controls['name'].setValue(resp.name);
        this.formEditUser.controls['lastname'].setValue(resp.lastname);
        this.formEditUser.controls['username'].setValue(resp.username);
        this.formEditUser.controls['email'].setValue(resp.email);        
      },
      error : (err) => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;        
      }
    })
  }

  public formEditUser : FormGroup = this.fb.group({
    id: [],
    name: [, [Validators.required]],
    lastname : [, [Validators.required]],
    username : [, [Validators.required]],
    email : [, [Validators.required]],
    password : [, [Validators.required]]
  });
  
  public formValidate( campo : string ) {
    return this.formEditUser.controls[campo].invalid && this.formEditUser.controls[campo].touched
        ? true
        : false
  }

  public styleValidate ( campo : string ) {
    return this.formEditUser.controls[campo].invalid && this.formEditUser.controls[campo].touched
        ? 'form__field-input form__field-error'
        : 'form__field-input'
  }

  public passwordValidation() {    
    if (this.formEditUser.controls['password'].value != this.passwordConfirmation.nativeElement.value) {
      this.isDifferentPassword = true;
    } else {
      this.isDifferentPassword = false;
    }
    
  }

  public edit() {
    this.passwordValidation();
    if (this.formEditUser.invalid) {
      this.formEditUser.markAllAsTouched();
      return;
    }
    this.userService.edit(this.formEditUser.value)
    .subscribe({
      next : () => {
        this.router.navigateByUrl(`/home/user/${this.username}`);
      },
      error : (err) => {
        const message : string[] = err.error.message.split(':');
        this.errorMessage = message[message.length - 1];
      }
    })
}
}
