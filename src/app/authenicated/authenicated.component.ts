import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authenicated',
  templateUrl: './authenicated.component.html',
  styleUrls: ['./authenicated.component.css']
})
export class AuthenicatedComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
