import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CompareService } from './compare.service';
import { Workout1 } from 'app/models/workout1';
import { BalanceData, BalanceDataClass } from 'app/models/balance';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent implements OnInit {
  doInput = true;
  @Input() calendarData: any = [];
  graphData: any = [];
  workoutData: BalanceData;
  workoutData1: any = [
    // Object { title: "All Day Event", start: "2018-11-01" }
    { title: "a", start: 'Tue Nov 13 2018 00:00:00 GMT-0600 (CST)' },
    { title: "b", start: 'Wed Nov 14 2018 00:00:00 GMT-0600 (CST)' },
    { title: "c", start: 'Thur Nov 15 2018 00:00:00 GMT-0600 (CST)' },
  ]
  calendarOptions: Options;
  errorMessage: string;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  constructor(private compareService: CompareService, protected eventService: EventSesrvice) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.calendarData) {
      console.log('calendarData changed')
    }
  }

  ngOnInit() {
    this.compareService.getProducts().subscribe(
      (data: BalanceData) => {
        //this.workoutData = data;
        //let temp = [];
        let obj = {};
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        // console.log('data, only what dats and duration?', data['Items'])
        for (let i = 0; i < data['Items'].length; i++) {
          //console.log('element', data['Items'][i].Workout)
          for (let j = 0; j < data['Items'][i].Workout.L.length; j++) {
            for (let key in data['Items'][i].Workout.L[j].M) {
              if(key === 'Duration'){
              //console.log(data['Items'][i].Workout.L[j].M.Duration.S)
              obj[i] = { start: data['Items'][i].Timestamp.S, allDay: true, Duration:parseInt(data['Items'][i].Workout.L[j].M.Duration.S)}
              }
            }
          }

          this.calendarData.push(obj[i])
        };

        this.calendarOptions = {
          editable: true,
          eventLimit: false,
          header: {
            left: 'prev,next,today',
            //left: null,
            center: 'title',
            //right: 'month,agendaWeek,agendaDay,listMonth'
            right: null
          },
          events: this.calendarData
        };

      }, // success path
      error => this.errorMessage = error // error path
    );
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}

