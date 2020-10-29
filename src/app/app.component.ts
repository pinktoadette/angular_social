import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PollFormComponent } from './shared/components/poll-form/poll-form.component';
import { AuthService } from './shared/services/auth.service';
import { SignupPageComponent } from './signup-page/signup-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  innerWidth: number;
  title = 'Crowdsource Real News';
  isLoggedIn: boolean;
  handle: string;

  private _unsubscribe = new Subject();

  constructor(private auth: AuthService,
    public dialog: MatDialog
    ) {}
  
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.auth.loggedIn.pipe(takeUntil(this._unsubscribe)).subscribe(val => {
      this.isLoggedIn = val;
    });

    this.auth.handle.pipe(takeUntil(this._unsubscribe)).subscribe(handle =>{
      this.handle = handle;
    })
  }

  openForm() {
    if (this.auth.isLoggedIn()) {
      const dialogRef = this.dialog.open(PollFormComponent, {
        width: '100%',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(SignupPageComponent, {
        width: '100%',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  logout() {
    this.auth.logout()
  }
}
