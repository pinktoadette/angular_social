import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { WebRequestService } from '../../services/web-request.service';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit, OnDestroy{
  @ViewChild('hashtagInput') hashtagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  submitArticle: FormGroup;
  brokenUrl: boolean = false;
  search: string;
  searchItems: Array<string>;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hashtagCtrl = new FormControl();
  filteredHashtags: Observable<any>;
  hashtags: string[] = [];
  message: string;
  textInput: string = '';

  subFake: Array<Object> = [
    {name: 'Misinformation', completed: false, color: 'warn'},
    {name: 'Disinformation', completed: false, color: 'warn'},
    {name: 'Satire', completed: false, color: 'warn'},
    {name: 'Image/Video Manipulation', completed: false, color: 'warn'},
    {name: 'Other', completed: false, color: 'warn'}
  ]

  private _unsubscribe = new Subject<any>();

  constructor(
    private hashtagService: ArticleService,
    private webService: WebRequestService
  ) { 
    this.filteredHashtags = this.hashtagCtrl.valueChanges.pipe(
      startWith(''),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(val => {
            return this.hashtagService.getHashTags(val)
          })      
    );
  }

  ngOnInit(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.submitArticle = new FormGroup({
      'url': new FormControl(null, [Validators.required, Validators.pattern(urlRegex)]),
      'real': new FormControl(null, [Validators.required]),
      'hashtag': new FormControl(null, []),
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

      }, err=>{
        this.message = err['error']['message'];
      })
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (this.hashtags.length > 5) {
      return
    }

    if ((value || '').trim()) {
      this.hashtags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.hashtagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.hashtags.indexOf(tag);

    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.hashtags.length > 5) {
      return
    }
    
    this.hashtags.push(event.option.viewValue);
    this.hashtagInput.nativeElement.value = '';
    this.hashtagCtrl.setValue(null);
  }

  updateFakeSelection(item) {
    const prevVal = this.submitArticle.controls['fakeType'].value;
    let temp = [...prevVal];
    prevVal.indexOf(item) ===-1 ? temp.push(item) : temp.splice(temp.indexOf(item), 1)
    this.submitArticle.controls['fakeType'].setValue(temp);
  }

  parseText(text) {
    const urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/;
    if (text.includes('#') ){
      const startFinding= text.split('#')[1]
      // this.selected(startFinding)
      console.log(startFinding)
    }
    
    if (text.includes('@')) {
      const findPerson = text.split('@')[1]
      // this.selected(findPerson)
      console.log(findPerson)
    }

    if (text.match(urlRegex)) {
      const url = text.match(urlRegex);
      console.log(url)
    }

  }


  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
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
