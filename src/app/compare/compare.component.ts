import { Component, OnInit, ViewChild } from '@angular/core';
import { CompareService } from './compare.service';
import { Workout1 } from 'app/models/workout1';

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
  workoutData: Workout1[] = [];
  workoutData1: any = [
    { date: 'Tue Nov 13 2018 00:00:00 GMT-0600 (CST)', effort: 1 },
    { date: 'Wed Nov 14 2018 00:00:00 GMT-0600 (CST)', effort: 2 },
    { date: 'Thur Nov 15 2018 00:00:00 GMT-0600 (CST)', effort: 3 },
    { date: 'Fri Nov 16 2018 00:00:00 GMT-0600 (CST)', effort: 4 },
    { date: 'Sat Nov 17 2018 00:00:00 GMT-0600 (CST)', effort: 3 },
    { date: 'Sun Nov 18 2018 00:00:00 GMT-0600 (CST)', effort: 3 },
    { date: 'Mon Nov 19 2018 00:00:00 GMT-0600 (CST)', effort: 2 },
    { date: 'Tue Nov 20 2018 00:00:00 GMT-0600 (CST)', effort: 1 },
  ]
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  constructor(private compareService: CompareService, protected eventService: EventSesrvice) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data
      };
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
//}
