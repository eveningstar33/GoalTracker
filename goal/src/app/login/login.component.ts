import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(`The username is: ${this.username}`); 
    if (this.username === 'dgs' && this.password === 'test') {
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}
