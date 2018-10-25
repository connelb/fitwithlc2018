import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  img: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  tiles: Tile[] = [
    // {text: 'Be Healthy', cols: 3, rows: 1, color: 'lightblue'},
    // {text: 'My Stats', cols: 1, rows: 2, color: 'lightgreen'},
    // {text: 'Be Happy', cols: 1, rows: 1, color: 'lightpink'},
    // {text: 'Be You', cols: 2, rows: 1, color: '#DDBDF1'},

    {text: 'Be Healthy', cols: 1, rows: 1, color: 'lightblue', img:'./assets/be_healthy.png'},
    {text: 'My Stats', cols: 1, rows: 2, color: 'lightgreen', img:'./../../../assets/be_healthy.png'},
    {text: 'Be Happy', cols: 1, rows: 3, color: 'lightpink', img:'./../../../assets/be_happy.png'},
    {text: 'Be You', cols: 1, rows: 4, color: '#DDBDF1', img:'./../../../assets/be_you.png'},
  ];

  ngOnInit() {
  }
}


