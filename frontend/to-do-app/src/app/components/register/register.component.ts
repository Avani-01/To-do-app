import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  password: String = '';
  email: String ='';
  username: String= '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userData = {
      username: this.username,
      email: this.email,
      password:this.password
    }
    this.authService.register(userData)
      .subscribe({
        next: (res) => {
          // alert('Registration successful!')
          this.router.navigate(['/login']);
        },

        error: (err) =>{
          const errorMessage = err.error?.msg;
          // alert(errorMessage);
        }
      });
  }

}
