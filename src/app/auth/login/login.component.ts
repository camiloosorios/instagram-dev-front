import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../interfaces/auth.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public messageLogin : string;

  constructor( private fb : FormBuilder,
               private router : Router,
               private authService : AuthService) {
    this.messageLogin = "";
  }

  public formLogin : FormGroup = this.fb.group({
    email: [, [Validators.required]],
    password: [, [Validators.required]]
  });

  public formValidate( campo : string ) : boolean {
    return this.formLogin.controls[campo].invalid && this.formLogin.controls[campo].touched
        ? true
        : false
  }

  public styleValidate( campo : string ) : string {
    return this.formLogin.controls[campo].invalid && this.formLogin.controls[campo].touched
        ? 'form__field-input form__field-error'
        : 'form__field-input'
  }

  public login() : void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.authService.login(this.formLogin.value).subscribe({
      next: (resp: IResponse) => {
        if (resp.token != null) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        const message : string = err.error.message.split(":");
        this.messageLogin = message[message.length - 1];
        this.formLogin.controls['password'].reset();
      }       
      
    })
  }

}
