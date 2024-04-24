import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IResponse } from '../../interfaces/auth.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public messageRegister : string = '';

  constructor( private fb : FormBuilder,
               private authService : AuthService ) {}

  public formRegister : FormGroup = this.fb.group({
    name: [, [Validators.required]],
    lastname : [, [Validators.required]],
    username : [, [Validators.required]],
    email : [, [Validators.required]],
    password : [, [Validators.required]]
  });
  
  public formValidate( campo : string ) {
    return this.formRegister.controls[campo].invalid && this.formRegister.controls[campo].touched
        ? true
        : false
  }

  public styleValidate ( campo : string ) {
    return this.formRegister.controls[campo].invalid && this.formRegister.controls[campo].touched
        ? 'form__field-input form__field-error'
        : 'form__field-input'
  }

  public register() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }

    this.authService.register(this.formRegister.value).subscribe({
      next : ( resp : IResponse ) => {
        if (resp.token != null) {
          localStorage.setItem("token", resp.token);
        }
      },
      error : (err) => {
        const message = err.error.message.split(':');
        this.messageRegister = message[message.length - 1];
      }
    })

  }

}
