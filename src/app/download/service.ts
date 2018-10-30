import { Injectable } from '@angular/core';
import { User } from '../auth/types';
import { S3Factory } from '../../utils';
import { s3Config } from './../../config/index';
import { AuthService} from './../auth';

@Injectable()
export class DownLoadService {

  private signedInUser: User;
  private defaultRegion: string;
  private signedUrlExpireSeconds = 60 * 5;


  constructor(private authService: AuthService) {
    this.defaultRegion = 'us-east-2';
  }

  // setSignedInUser(user: User) {
  //   this.signedInUser = user;
  // }

  // Upload status updates

  setRegion(region: string) {
    this.defaultRegion = region;
  }

  listFiles() {
    //console.log('listFiles called');
    // var params = { 
    //   Bucket: 'mystore.in',
    //   Delimiter: '',
    //   Prefix: 's/5469b2f5b4292d22522e84e0/ms.files' 
    // }
    //https://nu-datascience-bootcamp-files.s3.us-east-2.amazonaws.com/?list-type=2&prefix=connellbl/us-east-2:ce4169b0-1c8d-4f16-ae19-945cf0288c3e
    return S3Factory.getS3(this.defaultRegion).listObjectsV2({
      Bucket: s3Config[this.defaultRegion],
      Prefix: [this.authService.cognitoAwsCredentials.params['IdentityId']].join('/')//this.authService.cognitoAwsCredentials.params['LoginId'], 
    }).promise();
  }

  listFiles1() {
    return S3Factory.getS3(this.defaultRegion).listObjectsV2({
      Bucket: s3Config[this.defaultRegion],
      Prefix: [this.authService.cognitoAwsCredentials.params['IdentityId']].join('/')//this.authService.cognitoAwsCredentials.params['LoginId'], 
    }, function (err, data) {
      if(err)throw err;
      console.log(data);
     }).promise();
  }


  getUrl(key: string) {
    return S3Factory.getS3(this.defaultRegion).getSignedUrl('getObject', {
      Bucket: s3Config[this.defaultRegion],
      Key: key,
      Expires: this.signedUrlExpireSeconds
    });
  }

}
