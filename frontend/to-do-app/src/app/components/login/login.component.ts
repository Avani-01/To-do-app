import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userData = {
      email: this.email,
      password:this.password
    }
    this.authService.login(userData)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.user.username);  // store username
          this.router.navigate(['/home']);
          
        },
        error: (err) =>{
          // alert('Login failed: ' + err.message)
        }
      });
  }
}
