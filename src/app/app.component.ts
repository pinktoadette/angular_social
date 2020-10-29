import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PollFormComponent } from './shared/components/poll-form/poll-form.component';
import { AuthService } from './shared/services/auth.service';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { Title, Meta } from '@angular/platform-browser';

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
  title = 'Falsy | Truthy - News, Events, Videos, Photos';
  isLoggedIn: boolean;
  handle: string;

  private _unsubscribe = new Subject();

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private titleService: Title,
    private metaService: Meta
    ) {}
  
  ngOnInit() {
    this.seoTags();
    this.innerWidth = window.innerWidth;
    this.auth.loggedIn.pipe(takeUntil(this._unsubscribe)).subscribe(val => {
      this.isLoggedIn = val;
    });

    this.auth.handle.pipe(takeUntil(this._unsubscribe)).subscribe(handle =>{
      this.handle = handle;
    })
  }

  seoTags() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'fake news, real news, fake, real, cnn, foxnews, abc, onan, msnbc,wapo,infowars, bloomberg, cnbc,espn, youtube, facebook, twitter, sec 230'},
      {name: 'description', content: 'Real news, real comments, real events determine by real people. FalsyTruthy is a crowdsource social media network platform.'},
      {name: 'robots', content: 'index, follow'}
    ]);
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
