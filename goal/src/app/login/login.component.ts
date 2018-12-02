import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

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
  constructor(private router: Router, 
              private hardcodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(`The username is: ${this.username}`); 
    // if (this.username === 'dgs' && this.password === 'test') {

    // We are moving the authentication logic out to HardcodedAuthenticationService
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      // Redirect to Welcome Page
      this.router.navigate(['welcome', this.username]);  // We pass username as a parameter
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}
