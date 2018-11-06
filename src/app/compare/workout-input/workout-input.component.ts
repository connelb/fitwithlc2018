import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { ContactRequest } from '../../../models/contact-request';
import { Workout } from '../../models/workout';


@Component({
  selector: 'app-workout-input',
  templateUrl: './workout-input.component.html',
  styleUrls: ['./workout-input.component.css']
})
export class WorkoutInputComponent implements OnInit {
  workoutForm: FormGroup;

  // countries = ['USA', 'Germany', 'Italy', 'France'];
  // requestTypes = ['Claim', 'Feedback', 'Help Request'];

  constructor(private fb: FormBuilder) {
  this.workoutForm = this.createFormGroupWithBuilderAndModel(this.fb);
   }

  workout = new Workout();

  ngOnInit() {
    //workout = new this.workout()
    this.createFormGroupWithBuilderAndModel(this.fb);
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(this.workout)
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
    // result = Object.assign({}, result);

    // Do useful stuff with the gathered data
    console.log(result);
  }

}
