import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showBurgerMenu: boolean;
  isLoggedIn: boolean = false;
  constructor(
    private auth: AuthService
  ) { 
    this.auth.loggedIn.subscribe(val => {
      this.isLoggedIn = val;
    });
  }

  ngOnInit(): void {
  }

}
