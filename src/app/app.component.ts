import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

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
  isLoggedIn: boolean = false;
  handle: string;

  constructor(private auth: AuthService) {}
  
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.auth.loggedIn.subscribe(val => {
      this.isLoggedIn = val;
    });
    this.handle = this.auth.getUserHandle();
  }

  logout() {
    this.auth.logout()
  }
}
