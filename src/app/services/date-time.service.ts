// date-time.service
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class DateTimeService
{
  public getFormat(): string
  {
    return "YYYY-MM-DD"; 
    //return "MM-YYYY"; // add you own logic here
  }
  public getLocale(): string
  {
    return "en-US"; // add you own logic here
  }  
}