import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CompareService } from './compare.service';
import { Workout1 } from 'app/models/workout1';
import { BalanceData, BalanceDataClass } from 'app/models/balance';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent implements OnInit {
  doInput = true;
  //@Input() calendarData: any = [];
  @Input() calendarData: any = [];
  graphData: any = [];
  workoutData: BalanceData;
  calendarOptions: Options;
  errorMessage: string;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private compareService: CompareService) {}
 
  ngOnInit() {
    let temp =[];
    
    this.compareService.getProducts().subscribe(
      (data: any) => {
        this.workoutData = data;
      })


    this.compareService.getProducts().subscribe(
      (data: any) => {
        // data = data.Items;
        // console.log('what is date in compare init', data)
        for (let i = 0; i < data.Items.length; i++) {
          for (let j = 0; j < data.Items[i].Workout.L.length; j++) {
            for (let key in data.Items[i].Workout.L[j].M) {
              if(key === 'Duration'){
                temp.push({ "start": moment(data.Items[i].Timestamp.S).format('YYYY-M-DD').toString(), "allDay": true, "duration":parseInt(data.Items[i].Workout.L[j].M.Duration.S)|30})
              }
            }
          };
        };
        this.calendarData = temp;
        // console.log('from get',this.calendarData.length)
      }, // success path
      error => this.errorMessage = error // error path
    );

    this.populateCalendar(this.calendarOptions);
  }

  populateCalendar(data):any{
      return this.calendarOptions = {
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

