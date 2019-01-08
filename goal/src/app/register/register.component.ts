import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { UserDataService } from '../service/data/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidRegister = false;
  errorMessage = '';
  pass1 = '';
  pass2 = '';
  userName: string;
  emailAddress: string;
  user: User;

  @ViewChild('f') signupForm: NgForm;

  constructor(
    private userDataService: UserDataService,
    private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (this.signupForm.valid === false) {
      this.invalidRegister = true;
      this.errorMessage = 'You must fill in all the fields!';
    } else if (this.pass1 !== this.pass2) {
      this.invalidRegister = true;
      this.errorMessage = 'The passwords do not match!';
    } else {
      this.user = new User(this.userName, this.emailAddress, this.pass1);
      console.log(this.user);
      this.userDataService.addUser(this.user).subscribe(
        data => {
          console.log(data);
        }, 
        error => {
          if (error.error.email === "duplicated") {
            this.invalidRegister = true;
            this.errorMessage = 'The email address you have used is already registered!';
          } else if (error.error.username === "duplicated") {
            this.invalidRegister = true;
            this.errorMessage = 'The username is not available!';
          }
        },
        () => {
          this.invalidRegister = false;
          this.router.navigate(['login'], { queryParams: { registered: 'true' } });
        })
    }
  }

}
