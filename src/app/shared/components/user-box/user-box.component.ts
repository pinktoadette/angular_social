import { Component, Input, OnInit } from '@angular/core';
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
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.baseUrl = this.utilityService.s3Url;
  }

}
