import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Falsy | Truthy - About');
    this.metaService.addTags([
      {name: 'keywords', content: 'crowdsource news, msnbc,wapo,infowars, bloomberg, cnbc,espn, youtube, facebook, twitter, sec 230'},
      {name: 'description', content: 'FalsyTruthy is a crowdsource social media platform that gathers the verity of source, comments, images, videos.'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

}
