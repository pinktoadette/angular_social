import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { constants } from '../shared/constants';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: any;
  loading: boolean = false;
  userHandle: string;
  profileHandle: string;
  viewThis: String = 'posted';
  stats: {} = {
    'posted': 0,
    'comments': 0,
    'following': 0,
    'followers': 0
  }

  baseUrl: string;
  default_image = constants.default_img;


  private _unsubscribe = new Subject();
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { 
  }

  ngOnInit(): void {
    this.baseUrl = this.utilityService.s3Url;
    const a = window.location.href;
    this.profileHandle = a.split('/p/')[1];

    this.userHandle = this.authService.getUserHandle()
    this.profileSubmision();
    this.getStats();
  }

  getStats() {
    this.profileService.getUserStats(this.profileHandle).pipe(take(1)).subscribe(result=>{
      this.stats = result
    })
  }

  profileSubmision() {
    this.loading = true;
    this.profileService.getProfilePost(this.profileHandle).pipe(takeUntil(this._unsubscribe)).subscribe(profile =>{
      this.profile = profile
      this.loading = false
    }) 
  }

  profileComments() {
    this.loading = true;
    this.profileService.getProfileComments({handle: this.profileHandle}).subscribe(result=>{
      console.log(result)
      this.profile['comments'] = result['results'];
      this.loading = false;
    })
  }

  viewChild(ele) {
    this.viewThis = ele;

    switch(ele){
      case('posted'):
        this.profileSubmision();
        break;
      case('comments'):
        this.profileComments();
      default:
        
    }
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
