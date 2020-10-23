import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;
  loading: boolean = false;
  userHandle: string;
  profileHandle: string;
  viewThis: String = 'posted';
  stats: {} = {
    'posted': 0,
    'following': 0,
    'followers': 0,
    'comments': 0
  }

  private _unsubscribe = new Subject<any>();
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) { 
  }

  ngOnInit(): void {
    this.loading = true;
    const a = window.location.href;
    this.profileHandle = a.split('/p/')[1];

    this.userHandle = this.authService.getUserHandle()
    this.profileService.getProfilePost(this.profileHandle).pipe(takeUntil(this._unsubscribe)).subscribe(profile =>{
      this.profile = profile
      this.loading = false
      this.stats['posted'] = profile['article'].length
    })
  }

  viewChild(ele) {
    this.viewThis = ele;
  }

}
