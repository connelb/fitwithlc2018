import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../service';
import { Router } from '@angular/router';
import { SignupForm } from '../types';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
//import {FormsModule} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
// export class InputErrorsExample {
//   emailFormControl = new FormControl('', [
//     Validators.required,
//     Validators.email,
//   ]);
// }


@Component({
  selector: 'app-signin',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class SigninComponent implements OnInit {
  showSpinner = false;
  username: string;
  password: string;
  submissionError: string;
  submitted = false;
  formErrors: SignupForm = {};
  statusMessage: string;
  statusClass: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router) { }

  signin($event) {
    this.submitted = true;
    // Disable default submission.
    $event.preventDefault();
    this.showSpinner = true;

    this.authService.authenticate({
      username: this.username,
      password: this.password
    },
      (err, statusCode) => {
        this.submitted = false;
        console.log('statusCode: ',statusCode, 'AuthService.statusCodes: ',AuthService.statusCodes)
        if (statusCode === AuthService.statusCodes.newPasswordRequired) {
          this.router.navigate(['first-time-password']);
        } else if (statusCode === AuthService.statusCodes.signedIn) {
          //console.log('statusCode is :', statusCode);
          //this.router.navigate(['settings']);
          this.authService.handleRedirect();
          return;
        } else if (statusCode === AuthService.statusCodes.noSuchUser) {
          this.submissionError = 'Email or password is not valid.';
        } else if (statusCode === AuthService.statusCodes.unknownError) {
          this.submissionError = err.message;
        }
      });
  }

  ngOnInit() {
    this.authService.setPreviousAppParams(this.router.routerState.snapshot.root.queryParams);
    this.authService.getCurrentUser((err, currentSignedInUser) => {
      if (currentSignedInUser && currentSignedInUser.signedIn) {
        console.log('logging',currentSignedInUser, currentSignedInUser.signedIn)
        this.authService.handleRedirect();
      }
    });


  }
}



