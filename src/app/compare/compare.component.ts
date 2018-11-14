import { Component, OnInit } from '@angular/core';
import { CompareService } from './compare.service';
import { Workout1 } from 'app/models/workout1';
import { Calendar } from 'fullcalendar' 

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
    var srcCalendarEl = document.getElementById('source-calendar');

    var srcCalendar = new Calendar(srcCalendarEl, {
      editable: true,
      defaultDate: '2018-10-12',
      events: [
        {
          title: 'event1',
          start: '2018-10-11T10:00:00',
          end: '2018-10-11T16:00:00'
        },
        {
          title: 'event2',
          start: '2018-10-13T10:00:00',
          end: '2018-10-13T16:00:00'
        }
      ]
    });

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
