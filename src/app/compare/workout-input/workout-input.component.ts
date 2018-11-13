import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { ContactRequest } from '../../../models/contact-request';
import { Workout } from '../../models/workout';
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

  workout = new Workout();

  ngOnInit() {
    //private workout = new Workout()
    this.createFormGroupWithBuilderAndModel(this.fb);

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
      workoutData: formBuilder.group(this.workout)
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
    const result: Workout = Object.assign({}, this.workoutForm.value);

    const data: Workout = {
      'date': result['workoutData']['date'].toString(),
      'deleted':'false',
      'group':'blah,blah'
    };
    console.log(data);

    // Do useful stuff with the gathered data
    this.compareService.onStoreData1(data)
  }

}
