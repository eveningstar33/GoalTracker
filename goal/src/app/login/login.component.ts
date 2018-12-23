import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { JWTAuthenticationService } from '../service/jwt-authentication.service';

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
  constructor(
    private router: Router, 
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService,
    private jwtAuthenticationService: JWTAuthenticationService) { }

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

  // When we are using hardcodedAuthenticationService.authenticate() it is a synchronous call, because
  // you call this method and it returns true or false. But in the case of BasicAuth.. calls we'll use
  // Observables and this will be an asynchronous call. So in this case we'll need to define the methods
  // to handle both the success and the failure.
  
  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

  // We disable basic authentication and we'll use JWT authentication

  handleJWTAuthLogin() {
    console.log('here 1');
    this.jwtAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

}
