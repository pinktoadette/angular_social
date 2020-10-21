import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  submitProfile: FormGroup;
  userProfile: any;
  handleUnavailable: boolean = true;

  private _unsubscribe = new Subject<any>();
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.submitProfile = new FormGroup({
      'displayName': new FormControl(null),
      'handle': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl()
    });

    const id = this.authService.getUserId()
    this.profileService.getUserProfile(id).pipe(takeUntil(this._unsubscribe)).subscribe(result => {
      this.userProfile = result;
    })
  }

  onSubmit(){
    this.profileService.updateAccount(this.submitProfile.value).pipe(take(1)).subscribe(result =>{
      this.userProfile = result
    })
  }

  checkHandle() {
    this.profileService.checkHandleExist(this.submitProfile['handle'].value).pipe(take(1)).subscribe(result=> {
      console.log(result);
    })
  }

}
