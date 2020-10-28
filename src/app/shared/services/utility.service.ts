import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  s3Url = constants.aws_s3;

  constructor(
  ) { }


  uploadBufferFile(id, file, path, filetype): Observable<any> {

    const unixtime = new Date().getTime()/1000

    const params = {
      Bucket: environment.AWS_BUCKET_NAME,
      Key: path+id.slice(0,5)+unixtime+"."+filetype,
      Body: file,
      ACL: 'public-read',
      ContentType: `image/${filetype}`
    };

    const bucket = this._getS3Bucket();

    return Observable.create(observer => {
      bucket.upload(params, function (err, data) {
        if (err) {
          observer.error(err);
        }
        observer.next(data);
        observer.complete();
      });
    });
  }

  uploadFile(id, file, path): Observable<any> {
    // does photo need to resize?

    const contentType = file.type;
    const unixtime = new Date().getTime()/1000

    const params = {
      Bucket: environment.AWS_BUCKET_NAME,
      Key: path+id.slice(0,5)+unixtime+"."+contentType.split('/')[1],
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    const bucket = this._getS3Bucket();

    return Observable.create(observer => {
      bucket.upload(params, function (err, data) {
        if (err) {
          observer.error(err);
        }
        observer.next(data);
        observer.complete();
      });
    });
  }

  deleteFile(Key) {
    const bucket = this._getS3Bucket();
    const params = {
      Bucket: environment.AWS_BUCKET_NAME,
      Key
  };

    return Observable.create(observer => {
      bucket.deleteObject(params, function (err, data) {
        if (err) {
          observer.error(err);
        }
        observer.next(data);
        observer.complete();
      });
    });
  }

  private _getS3Bucket(): any {
    return new S3(
      {
        accessKeyId: 'AKIAZEXQSKEPFVVOOPQI',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );
  }
}
