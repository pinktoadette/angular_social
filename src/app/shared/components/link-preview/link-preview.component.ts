import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-preview',
  templateUrl: './link-preview.component.html',
  styleUrls: ['./link-preview.component.scss']
})
export class LinkPreviewComponent implements OnInit {
  @Input() linkInfo: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  innerWidth: number;
  constructor(
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  openLink(link) {
    window.open(link, '_blank');
  }

}
