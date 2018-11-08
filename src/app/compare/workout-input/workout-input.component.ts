import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { ContactRequest } from '../../../models/contact-request';
import { Workout } from '../../models/workout';
import { CompareService } from '../compare.service';
import * as moment from 'moment';


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
      'date': result['workoutData']['date'].toString()
    };

    // Do useful stuff with the gathered data
    this.compareService.onStoreData1(data)
  }

}
