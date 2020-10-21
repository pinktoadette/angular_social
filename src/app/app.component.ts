import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Crowdsource Real News';
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}
  
  ngOnInit() {
    this.auth.loggedIn.subscribe(val => {
      this.isLoggedIn = val;
    });
  }

  logout() {
    this.auth.logout()
  }
}
