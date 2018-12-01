import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'dgs';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  // Router
  // Dependecy Injection
  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(`The username is: ${this.username}`); 
    if (this.username === 'dgs' && this.password === 'test') {
      // Redirect to Welcome Page
      this.router.navigate(['welcome', this.username]);  // We pass username as a parameter
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}
