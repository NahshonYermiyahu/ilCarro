import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

const url = 'https://rent-cars-app.herokuapp.com';

export interface AuthResponseData {
  "first_name": string,
  "second_name": string,
  "registration_date": string,
  "comments": [],
  "own_cars": [],
  "booked_cars": [],
  "history": []
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  token: string;
  email: string;
  password: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  signup(name: string, lastName: string, email: string, password: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'Basic ' + btoa(email + ':' + password)
      })
    };
    this.token = options.headers.get('Authorization');
    this.email = email;
    this.password = password;
    return this.http.post<AuthResponseData>(url + '/registration', {
      first_name: name,
      second_name: lastName
      }, options
    ).pipe(catchError(this.handleError),
      tap(resData=> {
        this.handleAuthentication(
          resData.first_name,
          resData.second_name,
          resData.registration_date
        )
      }));
  }


  login(email: string, password: string) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(email + ':' + password)
      })
    };
    this.token = options.headers.get('Authorization');
    this.email = email;
    this.password = password;
    return this.http.get<AuthResponseData>(url + '/user/login', options
    ).pipe(catchError(this.handleError),
      tap(resData=> {
        this.handleAuthentication(
          resData.first_name,
          resData.second_name,
          resData.registration_date
        )
      }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.message) {
      case 'User exists':
        errorMessage = 'This email exists already.';
        break;
      case 'Unauthorized':
        errorMessage = 'This email does not exist.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    name: string,
    lastName: string,
    registration_date: string
  ) {
    const expirationDate = new Date(new Date()
      .getTime() + 36000000);
    const token = this.token;
    const email = this.email;
    const password = this.password;
    const user = new User(
      name,
      lastName,
      email,
      password,
      token,
      expirationDate,
      registration_date
    );
    this.user.next(user);
    console.log(user);
    this.autoLogout(36000000);
     localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      name: string;
      lastName: string;
      email: string;
      password:string;
      _token: string;
      _tokenExpirationDate: string;
      registration_date: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadingUser = new User(
      userData.name,
      userData.lastName,
      userData.email,
      userData.password,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.registration_date
    );
    if (loadingUser.token) {
      this.user.next(loadingUser);
       const expirationDuration =
         new Date(userData._tokenExpirationDate).getTime() -
         new Date().getTime();
         this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}

