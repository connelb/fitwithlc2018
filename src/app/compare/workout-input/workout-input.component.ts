import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { ContactRequest } from '../../../models/contact-request';
//import { Workout } from '../../models/workout';
import { BalanceData, BalanceDataClass } from '../../models/balance';
import { CompareService } from '../compare.service';
import * as moment from 'moment';


export interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-workout-input',
  templateUrl: './workout-input.component.html',
  styleUrls: ['./workout-input.component.css']
})
export class WorkoutInputComponent implements OnInit {
  //@ViewChild('compareForm') form: NgForm;
  isLoading = false;
  couldNotLoadData = false;
  balance = new BalanceDataClass();
  workoutForm: FormGroup;

  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

  constructor(private compareService: CompareService, private fb: FormBuilder) {
    this.workoutForm = this.createFormGroupWithBuilderAndModel(this.fb);
  }

  //workout = new Workout();
 

  ngOnInit() {
    
    //private workout = new Workout()
    this.createFormGroupWithBuilderAndModel(this.fb);
    console.log('what is this.workoutForm',this.workoutForm )

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

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      workoutData: formBuilder.group(this.balance)
    });
  }

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

  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result: BalanceData = Object.assign({}, this.workoutForm.value);

    const data: BalanceData = {
      "userId":"abeeee",
      "group":"default",
        "timestamp": result['workoutData']['timestamp'].toString(),
        "groupId": "a",
        "duration": "a",
        "desc": "a",
        "weight": "a",
        "chest": "a",
        "leftArm": "a",
        "rightArm": "a",
        "waist": "a",
        "hips": "a",
        "leftThigh": "a",
        "rightThigh": "a"
      };
    //console.log(data);

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
    this.compareService.onStoreData1(data)
  }

}
