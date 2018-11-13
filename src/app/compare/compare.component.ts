import { Component, OnInit } from '@angular/core';
import { CompareService } from './compare.service';
import { Workout1 } from 'app/models/workout1';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent implements OnInit {
  doInput = true;
  workoutData: Workout1[] = [];
  workoutData1:any = [
    {date:'Tue Nov 13 2018 00:00:00 GMT-0600 (CST)', effort:1},
    {date:'Wed Nov 14 2018 00:00:00 GMT-0600 (CST)', effort:2},
    {date:'Thur Nov 15 2018 00:00:00 GMT-0600 (CST)', effort:3},
    {date:'Fri Nov 16 2018 00:00:00 GMT-0600 (CST)', effort:4},
    {date:'Sat Nov 17 2018 00:00:00 GMT-0600 (CST)', effort:3},
    {date:'Sun Nov 18 2018 00:00:00 GMT-0600 (CST)', effort:3},
    {date:'Mon Nov 19 2018 00:00:00 GMT-0600 (CST)', effort:2},
    {date:'Tue Nov 20 2018 00:00:00 GMT-0600 (CST)', effort:1},
  ]
  constructor(private compareService: CompareService) {}
  ngOnInit() {
    this.compareService.dataEdited.subscribe(
      (edited: boolean) => this.doInput = !edited
    );

    this.compareService.getProducts().subscribe(
      products => {
        this.workoutData = products;
      },
      error => console.log(error)//this.errorMessage = <any>error
    );
  }
}
