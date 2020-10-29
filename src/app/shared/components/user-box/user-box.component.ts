import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../../constants';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss']
})
export class UserBoxComponent implements OnInit {
  @Input() user: any;
  baseUrl: string;
  default_image = constants.default_img;
  
  constructor(
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.baseUrl = this.utilityService.s3Url;
  }

  gotoProfile() {
    this.router.navigate(['/p', this.user.handle]);
  }
}
