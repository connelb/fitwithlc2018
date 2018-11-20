import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { CompareData } from './compare-data.model';
//import { Workout } from '../models/workout';
import { Workout1 } from '../models/workout1';
import { BalanceData } from '../models/balance';
import { AuthService } from '../auth/service';

@Injectable()
export class CompareService {
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<CompareData[]>();
  dataLoadFailed = new Subject<boolean>();
  userData: CompareData;
  //workoutData: Workout;
  //balance: BalanceData;
  constructor(private http: Http, private http1: HttpClient,
    private authService: AuthService) {
  }


  private productsUrl = 'https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api';

  getProducts(): Observable<BalanceData> {
    //return this.http1.get<Workout1[]>(this.productsUrl)
    return this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        return;
      }
      return this.http1.get<BalanceData>('https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api', {
        headers: new HttpHeaders({ 'Authorization': session.getIdToken().getJwtToken() })
      })
        .pipe(
          tap(data => JSON.stringify(data)),
        catchError(this.handleError)
      );
  });
}


onStoreData(data: CompareData) {
  this.dataLoadFailed.next(false);
  this.dataIsLoading.next(true);
  this.dataEdited.next(false);
  //this.userData = data;
  this.authService.getAuthenticatedUser().getSession((err, session) => {
    if (err) {
      return;
    }
    this.http.post('https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api', data, {
      headers: new Headers({ 'Authorization': session.getIdToken().getJwtToken() })
    })
      .subscribe(
        (result) => {
          this.dataLoadFailed.next(false);
          this.dataIsLoading.next(false);
          this.dataEdited.next(true);
        },
        (error) => {
          this.dataIsLoading.next(false);
          this.dataLoadFailed.next(true);
          this.dataEdited.next(false);
        }
      );
  });
}

onStoreData1(data: BalanceData) {
  this.dataLoadFailed.next(false);
  this.dataIsLoading.next(true);
  this.dataEdited.next(false);
  //this.workoutData = data;
  this.authService.getAuthenticatedUser().getSession((err, session) => {
    if (err) {
      return;
    }
    this.http.post('https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api', data, {
      headers: new Headers({ 'Authorization': session.getIdToken().getJwtToken() })
    })
      .subscribe(

        (result) => {
          //console.log('success?', data);
          this.dataLoadFailed.next(false);
          this.dataIsLoading.next(false);
          this.dataEdited.next(true);
        },
        (error) => {
          //console.log('error?', data);
          this.dataIsLoading.next(false);
          this.dataLoadFailed.next(true);
          this.dataEdited.next(false);
        }
      );
  });
}

onRetrieveData(all = true) {
  this.dataLoaded.next(null);
  this.dataLoadFailed.next(false);
  this.authService.getAuthenticatedUser().getSession((err, session) => {
    const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
    // let urlParam = 'all';
    // if (!all) {
    //   urlParam = 'single';
    // }
    this.http.get('https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api', {
      // this.http.get('https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api' + urlParam + queryParam, {
      headers: new Headers({ 'Authorization': session.getIdToken().getJwtToken() })
    })
      .map(
        (response: Response) => response.json()
      )
      .subscribe(
        (data) => {
          if (all) {
            this.dataLoaded.next(data);
          } else {
            console.log(data);
            if (!data) {
              this.dataLoadFailed.next(true);
              return;
            }
            //this.userData = data[0];
            this.dataEdited.next(true);
          }
        },
        (error) => {
          console.log(error);
          this.dataLoadFailed.next(true);
          this.dataLoaded.next(null);
        }
      );
  });
}
  // onDeleteData() {
  //   this.dataLoadFailed.next(false);
  //   this.authService.getAuthenticatedUser().getSession((err, session) => {
  //     this.http.delete('https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api?accessToken=XXX', {
  //       headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
  //     })
  //       .subscribe(
  //         (data) => {
  //           console.log(data);
  //         },
  //         (error) => this.dataLoadFailed.next(true)
  //       );
  //   });
  // }


  private handleError(err) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
  }
  console.error(err);
  return throwError(errorMessage);
}
}
