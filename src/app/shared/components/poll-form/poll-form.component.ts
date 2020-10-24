import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { take } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit, OnDestroy{
  @ViewChild('hashtagInput') hashtagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @HostListener('input') onInput() {
      const urlRegex = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#]?[\w-]+)*\/?/gm;
    if (this.textInput.match(urlRegex)) {
      const url = this.textInput.match(urlRegex);
      this.submitArticle.controls['url'].setValue(url[0]);
    }

    this.submitArticle.controls['comment'].setValue(this.textInput)
}
  
  submitArticle: FormGroup;
  brokenUrl: boolean = false;

  visible = true;
  
  hashtags: string[] = [];
  message: string;
  textInput: string;

  subFake: Array<Object> = [
    {name: 'Misinformation', completed: false, color: 'warn'},
    {name: 'Disinformation', completed: false, color: 'warn'},
    {name: 'Satire', completed: false, color: 'warn'},
    {name: 'Image/Video Manipulation', completed: false, color: 'warn'},
    {name: 'Other', completed: false, color: 'warn'}
  ]
  fakeVote = {
    items: [ "Fake", "Real", "Neutral"],
    triggerChar: '^',
    returnTrigger: true
  }
  isLoggedIn: boolean;
  mentionConfig = {}  
  lastCharSelected: string;

  private _unsubscribe = new Subject<any>();

  constructor(
    private hashtagService: ArticleService,
    private authService: AuthService
  ) { 
    this.isLoggedIn = this.authService.isLoggedIn();

  }

  ngOnInit(): void {
    this.mentionConfig = {
      mentions: [
        {
          items: [],
          triggerChar: '@',
          returnTrigger: true
        },
        {
          items: [],
          triggerChar: '#',
          returnTrigger: true
        },
          this.fakeVote
        ]
    }
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.submitArticle = new FormGroup({
      'url': new FormControl(null, [Validators.required, Validators.pattern(urlRegex)]),
      'real': new FormControl(null, [Validators.required]),
      'hashtag': new FormControl(null, []),
      'mention': new FormControl(null, []),
      'comment': new FormControl(null, []),
      'fakeType': new FormControl([])
    });
  }

  onSubmit() {
    const url = this.submitArticle.value['url']
    this.brokenUrl = !this._checkUrl(url);
    if (this.brokenUrl) {
      return
    } else {
      this.hashtagService.submitArticle({...this.submitArticle.value, hashtags: this.hashtags}).pipe(take(1)).subscribe(result=> {
        console.log(result)
        this.submitArticle.reset();
        this.message = "Submitted"
        this.textInput = '';
      }, err=>{
        this.message = err['error']['message'];
      })
    }
  }


  updateFakeSelection(item) {
    const prevVal = this.submitArticle.controls['fakeType'].value;
    let temp = [...prevVal];
    prevVal.indexOf(item) ===-1 ? temp.push(item) : temp.splice(temp.indexOf(item), 1)
    this.submitArticle.controls['fakeType'].setValue(temp);
  }

  parseText(evt) {
    const text = evt
    
    if (text.includes('#') ){
      const startFinding= text.split('#')[1]
      this.hashtagService.getHashTags(startFinding).subscribe((response)=>{
          const  x = [].concat(response || [])
          const items = x.reduce((acc, ele) => {
            acc.push(ele['hashtag'])
            return acc
          }, [])
          this.updateMentionConfig(items, '#')
        }
      )
    }
    if (text.includes('@')) {
      const findPerson = text.split('@')[1]
      this.hashtagService.getMentions(findPerson).subscribe((response)=>{
        const  x = [].concat(response || [])
        const items = x.reduce((acc, ele) => {
          acc.push(ele['handle'])
          return acc
        }, [])
        this.updateMentionConfig(items, '@')
      }
    )
    }

    if (text.includes('^')) {
      this.lastCharSelected = '^'
    }
  }

  mentionClose() {
    const slice = this.textInput.slice(this.textInput.lastIndexOf(this.lastCharSelected), this.textInput.length)
    switch(this.lastCharSelected) {
      case '#':
        let tags;
        if (!this.submitArticle.controls.hashtag) {
          debugger;
          tags = this.submitArticle.get('hashtag').value
        } else {
          tags = slice.split(this.lastCharSelected)[1];
        }
        this.submitArticle.controls['hashtag'].setValue(tags)
        break;
      case '@':
        //const user = this.submitArticle.get('user').value;
        this.submitArticle.controls['mention'].setValue(slice.split(this.lastCharSelected)[1])
        break;
      case '^':
        this.submitArticle.controls['real'].setValue( slice.split(this.lastCharSelected)[1])
        break;
      default:
        break;
    }
  }


  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }  

  private updateMentionConfig(items, trigger) {
    const spreadMe = trigger === '@' ? {
      items: [],
      triggerChar: '#',
      returnTrigger: true
    } : {
      items: [],
      triggerChar: '@',
      returnTrigger: true
    }

    this.mentionConfig = {
      mentions: [{
      items,
      triggerChar: trigger,
      returnTrigger: true
      },
      spreadMe,
      this.fakeVote
    ]}
    this.lastCharSelected = trigger;
  }

  private _checkUrl(url) {
    var reader = new XMLHttpRequest();
    reader.open('get', url, true);
    // if (reader.onreadystatechange && reader.readyState === 4) {
    //     return true
    // }
    // return false
    return true
  }
}
