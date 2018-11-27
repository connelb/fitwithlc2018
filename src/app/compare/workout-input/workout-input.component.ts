import { Component, Input, ViewChild, AfterViewInit,OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { ContactRequest } from '../../../models/contact-request';
//import { Workout } from '../../models/workout';
import { BalanceData, BalanceDataClass } from '../../models/balance';
import { CompareService } from '../compare.service';
// import * as moment from 'moment';
import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';
import { assertDataInRangeInternal } from '@angular/core/src/render3/util';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


export interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-workout-input',
  templateUrl: './workout-input.component.html',
  styleUrls: ['./workout-input.component.css']
})
export class WorkoutInputComponent implements AfterViewInit, OnInit {
  //@ViewChild('compareForm') form: NgForm;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Moment>;
  isValidMoment: boolean = false;
  isLoading = false;
  couldNotLoadData = false;
  balance = new BalanceDataClass();
  workoutForm: FormGroup;
  workoutData: FormGroup;

  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  //dateControl =  new FormControl(moment([2017, 0, 1]));


  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];

  // messageValue: any;

  // @Input()
  // get timestamp() {
  //   return this.messageValue;
  // }

  // set timestamp(val) {
  //   this.messageValue = moment(val).unix();
  //   //this.messageValue = (moment(val).month()+1)+' '+moment(val).day()+' '+moment(val.year())
  // }



  constructor(private compareService: CompareService, private fb: FormBuilder) {
    this.workoutForm = fb.group({
        "userId": ['a'],
        "group": ['a'],
        "timestamp": [''],
        "groupId": ['a'],
        "duration": ['a'],
        "desc": ['a'],
        "weight": ['a'],
        "chest": ['a'],
        "leftArm": ['a'],
        "rightArm": ['a'],
        "waist": ['a'],
        "hips": ['a'],
        "leftThigh": ['a'],
        "rightThigh": ['a']
      });
    
    //this.createFormGroupWithBuilderAndModel(this.fb);
  }

  ngAfterViewInit(){
    // this.picker.
    // this.picker._selectedChanged.subscribe(
    //   (newDate: Moment) => {
    //     this.isValidMoment = moment.isMoment(newDate);
    //   },
    //   (error) => {
    //     throw Error(error);
    //   }
    // );
    
  }


  ngOnInit() {
    //console.log('dateControl', this.messageValue, this.timestamp);

    //private workout = new Workout()
    //this.createFormGroupWithBuilderAndModel(this.fb);
    //console.log('what is this.workoutForm onInit',this.workoutForm )

    this.compareService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.compareService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );

    this.compareService.onRetrieveData();


  }

  // createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
  //   return formBuilder.group({
  //     workoutData: formBuilder.group({
  //       "userId": [''],
  //       "group": [''],
  //       "timestamp": [''],
  //       "groupId": [''],
  //       "duration": [''],
  //       "desc": [''],
  //       "weight": [''],
  //       "chest": [''],
  //       "leftArm": [''],
  //       "rightArm": [''],
  //       "waist": [''],
  //       "hips": [''],
  //       "leftThigh": [''],
  //       "rightThigh": ['']
  //     })
  //   });
  // }

  // this.userForm = this.formBuilder.group({
  //   'name': ['', Validators.required],
  //   'email': ['', [Validators.required, ValidationService.emailValidator]],
  //   'profile': ['', [Validators.required, Validators.minLength(10)]]
  // });

  // createFormGroup() {
  //   return new FormGroup({
  //     personalData: new FormGroup({
  //       email: new FormControl(),
  //       mobile: new FormControl(),
  //       country: new FormControl()
  //      }),
  //     requestType: new FormControl(),
  //     text: new FormControl()
  //   });
  // }
  //new Date()).toISOString()

  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result: BalanceData = Object.assign({}, this.workoutForm.value);
    // const currentDate = moment().format("ddd, hA")
    
    // console.log('the form date is: ', result);
    //console.log('moment', this.workoutForm.controls['timestamp']['_i'])

    // const data: BalanceData = {
    //   "userId": "abeeee",
    //   "group": "default",
    //   // "timestamp": moment(result['workoutData']['timestamp']).unix(),
    //   "timestamp": this.messageValue,
    //   "groupId": "a",
    //   "duration": "30",
    //   "desc": "a",
    //   "weight": "a",
    //   "chest": "a",
    //   "leftArm": "a",
    //   "rightArm": "a",
    //   "waist": "a",
    //   "hips": "a",
    //   "leftThigh": "a",
    //   "rightThigh": "a"
    // };
    // console.log('the form date is: ', data);

    // {
    //   "userId": "02",
    //   "timestamp": "a",
    //   "group": "ll",
    //   "groupId": "b",
    //   "duration": "k",
    //   "desc": "l",
    //   "weight": "j",
    //   "chest": "c",
    //   "leftArm": "d",
    //   "rightArm": "e",
    //   "waist": "f",
    //   "hips": "g",
    //   "leftThigh": "h",
    //   "rightThigh": "i"
    // }

    // Do useful stuff with the gathered data
    this.compareService.onStoreData1(result)
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    //const result: BalanceData = Object.assign({}, this.workoutForm.value);
    //const currentDate = moment().format("ddd, hA")
    
    
    this.workoutForm.controls.timestamp.setValue((moment(this.workoutForm.controls.timestamp.value).format()));
//console.log( this.workoutForm);
  }

}
