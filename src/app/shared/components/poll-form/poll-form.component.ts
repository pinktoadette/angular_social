import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HashtagService } from '../../services/hashtag.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

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
  filteredHashtags: Observable<string[]>;
  hashtags: string[] = [];
  allHashtags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  _unsubscribe = new Subject<any>();

  constructor(
    private hashtagService: HashtagService
  ) { 
    this.filteredHashtags = this.hashtagCtrl.valueChanges.pipe(
      startWith(''),
      map((tag: string | null) => tag ? this._filter(tag) : this.allHashtags.slice()));
  }

  ngOnInit(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.submitArticle = new FormGroup({
      'url': new FormControl(null, [Validators.required, Validators.pattern(urlRegex)]),
      'hashtag': new FormControl(null, Validators.minLength(5)),
      'real': new FormControl(true, Validators.required)
    });
  }

  onSubmit() {
    const url = this.submitArticle.value['url']
    this.brokenUrl = !this._checkUrl(url);

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.hashtags.push(value.trim());
    }

    // Reset the input value
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
    this.hashtags.push(event.option.viewValue);
    this.hashtagInput.nativeElement.value = '';
    this.hashtagCtrl.setValue(null);
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let tags;
    this.hashtagService.getHashTags(value).pipe(takeUntil(this._unsubscribe)).subscribe(result => {
      tags = result;
    })
    return tags
    // return this.allHashtags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private _checkUrl(url) {
    var reader = new XMLHttpRequest();
    reader.open('get', url, true);
    if (reader.onreadystatechange && reader.readyState === 4) {
        return true
    }
    return false
  }
}
