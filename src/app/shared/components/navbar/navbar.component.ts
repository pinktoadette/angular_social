import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private auth: AuthService
  ) { 
    //todo need auth guard
    this.isLoggedIn = this.auth.isLoggedIn() === 'true' ? true : false;
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
