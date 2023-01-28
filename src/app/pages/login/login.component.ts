import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: any = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null)
    {
      this.snack.open("Username is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null)
    {
      this.snack.open("Password is required!", "OK", {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.loginService.loginUser(resp.token);

        this.loginService.getCurrentUser().subscribe({
          next: (user:any) => {
            this.loginService.setUser(user);
            console.log(user);

            if (this.loginService.getUserRole() == 'NORMAL') {
              // window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == 'ADMIN') {
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout();
            }

          },
          error: (error) => {
            this.snack.open("Please enter valid details!", "OK", {
              duration: 3000
            });
          }
        });

      },
      error: (error) => {
        this.snack.open("Something went wrong! Please try again", 'OK', {
          duration: 3000
        });
      },
      complete: () => {

      }
    })

  }

}
