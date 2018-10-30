import { Component, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth';
import {
  FileObject,
  ContainerEvents,
  FileObjectStatus,
} from '../types';
import { Router } from '@angular/router';
import { UploadService } from '../service';
import { Subscription } from 'rxjs';
import { S3 } from 'aws-sdk';
/**
 * Single file upload component.
 */

 //https://nu-datascience-bootcamp-files.s3.us-east-2.amazonaws.com/?list-type=2&prefix=connellbl/us-east-2:ce4169b0-1c8d-4f16-ae19-945cf0288c3e
//https://s3.us-east-2.amazonaws.com/nu-datascience-bootcamp-files/connellbl/us-east-2%3Ace4169b0-1c8d-4f16-ae19-945cf0288c3e/2018/9/28/avatar.png

 @Component({
  moduleId: module.id,
  selector: 'app-file-upload',
  templateUrl: 'component.html',
  styleUrls: ['component.scss']
})
export class FileUploadComponent implements OnDestroy {
  @Input() fileObject: FileObject;
  @Input() oddRow: boolean;
  FileObjectStatus = FileObjectStatus;
  progress = 0;
  speed = 0;
  uploadError: string;
  containerEventSubscription: Subscription;
  uploadHandle: any;

  constructor(private uploadService: UploadService, private router: Router) {
    this.containerEventSubscription = uploadService.uploadContrainerEvent$.subscribe(
      containerEvent => this.handleContainerEvent(containerEvent)
    );
  }

  private handleContainerEvent(containerEvent: ContainerEvents) {
    if (containerEvent === ContainerEvents.Upload) {
      return this.fileObject.status === FileObjectStatus.NotStarted && this.upload();
    } else if (containerEvent === ContainerEvents.Cancel) {
      return this.fileObject.status === FileObjectStatus.Uploading && this.cancel();
    } else if (containerEvent === ContainerEvents.Delete) {
      return this.clear();
    }
  }

  upload() {
    this.fileObject.status = FileObjectStatus.Uploading;
    this.uploadError = undefined;
    this.progress = 0;
    this.uploadHandle = this.uploadService.upload(this.fileObject.file, this.handleS3UploadProgress());
  }

  private handleS3UploadProgress() {
    return (error: Error, progress: number, speed: number) => {
      if (error) {
        this.progress = 0;
        this.speed = 0;
        this.uploadError = error.message;
        this.fileObject.status = FileObjectStatus.Failed;
      } else {
        this.progress = progress || this.progress;
        this.speed = speed || this.speed;
        if (this.progress === 100) {
          this.fileObject.status = FileObjectStatus.Uploaded;
        }
      }
    };
  }

  cancel() {
    if (this.fileObject.status === FileObjectStatus.Uploading) {
      this.fileObject.status = FileObjectStatus.Canceled;
      this.uploadService.cancel(this.uploadHandle);
    }
  }

  clear() {
    if (this.fileObject.status !== FileObjectStatus.Uploading) {
      this.fileObject.status = FileObjectStatus.Deleted;
      this.uploadService.publishFileUploadEvent(this.fileObject);
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.containerEventSubscription.unsubscribe();
  }
}
