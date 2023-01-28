import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      // alert('Username is required!!');
      this.snackbar.open('Username is required!', 'OK', {
        duration: 2000,
        // verticalPosition: 'top'
      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (resp) => {
        console.log(resp);
        Swal.fire('Sucess', 'User registered successfully!', 'success').then(result => {
          this.clearForm();
          this.router.navigate(['login']);
        });
      },
      error: (e) => {
        console.log(e);
        this.snackbar.open('Something went wrong!', 'OK', {
          duration: 2000,
          // verticalPosition: 'top'
        });
      },
      complete: () => {
        console.log('completed');
      },
    });

  }

  clearForm() {
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

}
