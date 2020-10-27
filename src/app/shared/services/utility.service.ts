import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  s3Url = constants.aws_s3;

  constructor() { }

  uploadFile(id, file, path): Observable<any> {
    const contentType = file.type;
    const unixtime = new Date().getTime()/1000

    const params = {
      Bucket: 'buzzspit',
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
