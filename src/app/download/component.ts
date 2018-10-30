import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownLoadService } from './service';
import { AuthService, User } from './../auth';
import { S3 } from 'aws-sdk'
import { FileSizeUtil, MonthUtil } from '../../utils'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface downloadFiles {
  name: string;
  year: string;
  size: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  moduleId: module.id,
  selector: 'app-download',
  templateUrl: 'component.html',
  styleUrls: ['component.scss']
})

export class DownloadComponent implements OnInit {
  signedInUser: any;

  myTest: any;

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Size' },
    { name: 'Year' },
    { name: 'Month' },
    { name: 'Day' }
  ];


  constructor(private authService: AuthService,
    private router: Router,
    private downloadService: DownLoadService) {
  }

  displayedColumns: string[] = ['name', 'year', 'size'];
  dataSource = this.rows;

  ngOnInit(): void {

    if (this.authService.isAuthenticated) {
      // this.downloadService.listFiles1().then((response) => {
      //   //this.myTest = response.Contents
      //   this.rows = response.Contents.map((data) => {
      //     //console.log(data.Key,this.downloadService.getUrl(data.Key))
      //     const row: any = {};
      //     //row.url = this.downloadService.getUrl(data.Key);
      //     row.key = data.Key.split('/').pop();
      //     row.year = data.LastModified.getUTCFullYear();
      //     row.size = FileSizeUtil.transform(data.Size);
      //     return row;
      //   })
      // })
    }
  }


}
