import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { constants } from '../shared/constants';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  submitProfile: FormGroup;
  userProfile: any;
  handleUnavailable: boolean = false;
  message: string;
  photoUrl: string;
  baseUrl: string;
  default_image = constants.default_img;

  private _unsubscribe = new Subject();
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.baseUrl = this.utilityService.s3Url;
    this.submitProfile = new FormGroup({
      'handle': new FormControl(null, [Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.email]),
      'password': new FormControl(null, [Validators.minLength(10)]),
      'displayName': new FormControl(null),
    });

    const id = this.authService.getUserId()
    const curHandle = this.authService.getUserHandle();

    this.profileService.getUserProfile(id).pipe(takeUntil(this._unsubscribe)).subscribe(result => {
      this.userProfile = result;
    })

    this.submitProfile.get('handle')!.valueChanges.subscribe(data => {
      this.handleUnavailable = false;
      if (data !== curHandle) {
        setTimeout(() =>{
          this.authService.checkHandle(data).pipe(takeUntil(this._unsubscribe)).subscribe(res=> {
              this.handleUnavailable = !!res;
          })
        }, 500)
      }
    })
  }

  onSubmit(){
    this.profileService.updateAccount(this.submitProfile.value).pipe(take(1)).subscribe(result =>{
      this.userProfile = result
      this.message = 'Profile is updated.'

      setTimeout(() => {
        this.message = ''
      }, 5000)
    })
  }

  upload(file) {
    const userId = this.userProfile._id;
    const oldPhoto = this.userProfile.photoUrl
    this.utilityService.uploadFile(userId, file[0], 'user/images/').subscribe(result=>{
      this.userProfile['photoUrl'] =  result['key']
    }, (error)=> {console.log(error)},
    ()=>{
      this.profileService.updateAccount({photoUrl: this.userProfile['photoUrl']}).pipe(take(1)).subscribe(res=>{
        console.log(res)
      })
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
