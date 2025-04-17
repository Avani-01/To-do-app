import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'to-do-app';
}
