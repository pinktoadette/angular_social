import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  handle: string;
  showBurgerMenu: boolean;
  isLoggedIn: boolean = false;
  private _unsubscribe = new Subject<any>();
  
  constructor(
    private auth: AuthService
  ) { 
  }

  ngOnInit(): void {
    this.auth.loggedIn.pipe(takeUntil(this._unsubscribe)).subscribe(val => {
      this.isLoggedIn = val;
    });

    this.handle = this.auth.getUserHandle();
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }  


}
