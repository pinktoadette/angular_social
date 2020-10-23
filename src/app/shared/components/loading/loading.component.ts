import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() size: string = 'fa-2x';
  @Input() style: string = 'fas fa-spinner';

  constructor() { }

  ngOnInit(): void {
  }

}
