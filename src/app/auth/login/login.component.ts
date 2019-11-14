import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private authSevice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    this.authSevice.login(email, password)
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
