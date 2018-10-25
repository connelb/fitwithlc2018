import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import {FormControl, Validators} from '@angular/forms';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})


export class MyProfileComponent implements OnInit {
  private myData;
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', []);
  lastName = new FormControl('', []);

  tiles: Tile[] = [
    {text: 'pic', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'First', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Last', cols: 1, rows: 1, color: 'lightpink'}
  ];

  constructor(private authService: AuthService) {}
  

  ngOnInit() {
    this.myData = this.authService.cognitoAwsCredentials.params['LoginId'];
    // console.log('myData', this.myData, this.authService.cognitoAwsCredentials.params['LoginId']);

    
  }

 
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
