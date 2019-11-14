import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const name = authForm.value.name;
    const lastName = authForm.value.lastName;
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    this.authService.signup(name, lastName, email, password)
      .subscribe(resData => {
        this.isLoading = false;
         this.router.navigate(['/system/find']);
      }, errorMessage => {
        this.error= errorMessage;
        this.isLoading = false;
      });
    authForm.reset();
  }
}
