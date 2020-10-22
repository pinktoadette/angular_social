import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;
  loading: boolean = false;
  handle: string;

  private _unsubscribe = new Subject<any>();
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.loading = true;
    this.handle = this.route.snapshot.paramMap.get('handle')
    this.profileService.getProfile(this.handle).pipe(takeUntil(this._unsubscribe)).subscribe(profile =>{
      const  x = [].concat(profile || [])
      this.profile = !this.profile ? x : [...this.profile,...x]
      this.loading = false
    })
  }

}
