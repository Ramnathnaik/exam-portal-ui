import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //current user: get current logged in user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate-token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Save token to local storage
  public loginUser(token: any) {
    localStorage.setItem("token", token);
  }

  //Check whether user logged in or not
  public loggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //Logout user
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //Get token
  public getToken() {
    return localStorage.getItem("token");
  }

  //Save user details
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Get user 
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null)
    {
      return JSON.parse(userStr);
    }
    else
    {
      this.logout();
      return null;
    }
  }

  //Get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
