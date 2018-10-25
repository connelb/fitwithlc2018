import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { Subject} from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

import { CompareData } from './compare-data.model';
import { AuthService } from '../../fw/auth/service';

@Injectable()
export class CompareService {
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<CompareData[]>();
  dataLoadFailed = new Subject<boolean>();
  userData: CompareData;
  constructor(private http: Http,
    private authService: AuthService) {
  }

  onStoreData(data: CompareData) {
    this.dataLoadFailed.next(false);
    this.dataIsLoading.next(true);
    this.dataEdited.next(false);
    this.userData = data;

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        return;
      }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', session.getIdToken().getJwtToken());
      
      this.http.post('https://0rn2tbhuaf.execute-api.us-east-2.amazonaws.com/dev/api/', data, {
        //https://0rn2tbhuaf.execute-api.us-east-2.amazonaws.com/dev/
      //this.http.post('https://6gyxwl591h.execute-api.us-east-2.amazonaws.com/dev/api/', data, {
        headers: new Headers({ 'Authorization': session.getIdToken().getJwtToken() })
      })
      //https://hb2tyki4xh.execute-api.us-east-2.amazonaws.com/dev
      //https://hb2tyki4xh.execute-api.us-east-2.amazonaws.com/dev
      // this.http.post('https://qa038q5ty8.execute-api.us-east-2.amazonaws.com/dev/api/', { headers: headers })
      // .map(res => res.json())
        .subscribe(
          (result) => {
            console.log('the returned result: ', result);
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


  onRetrieveData(all = true) {
    //   this.dataLoaded.next(null);
    //   this.dataLoadFailed.next(false);
    //   this.authService.getAuthenticatedUser().getSession((err, session) => {
    //     const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
    //     let urlParam = 'all';
    //     if (!all) {
    //       urlParam = 'single';
    //     }
    //     //console.log('test',session.getAccessToken().getJwtToken(),urlParam);
    //     //https://ugdthwgm7a.execute-api.us-east-2.amazonaws.com/dev/
    //     //this.http.get('https://ugdthwgm7a.execute-api.us-east-2.amazonaws.com/dev/' + urlParam + queryParam, {
    //     this.http.get('https://ugdthwgm7a.execute-api.us-east-2.amazonaws.com/dev/', {
    //       headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
    //     })
    //       .map(
    //         (response: Response) => response.json()
    //       )
    //       .subscribe(
    //         (data) => {
    //           if (all) {
    //             this.dataLoaded.next(data);
    //           } else {
    //             console.log(data);
    //             if (!data) {
    //               this.dataLoadFailed.next(true);
    //               return;
    //             }
    //             this.userData = data[0];
    //             this.dataEdited.next(true);
    //           }
    //         },
    //         (error) => {
    //           console.log(error);
    //           this.dataLoadFailed.next(true);
    //           this.dataLoaded.next(null);
    //         }
    //       );
    //   });
  }
  onDeleteData() {
    //   this.dataLoadFailed.next(false);
    //   this.authService.getAuthenticatedUser().getSession((err, session) => {
    //     this.http.delete('https://ugdthwgm7a.execute-api.us-east-2.amazonaws.com/dev/?accessToken=XXX', {
    //       headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
    //     })
    //       .subscribe(
    //         (data) => {
    //           console.log(data);
    //         },
    //         (error) => this.dataLoadFailed.next(true)
    //       );
    //   });
  }
}
