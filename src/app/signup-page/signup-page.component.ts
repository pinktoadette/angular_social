import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  isAgreed: boolean = false;
  registerForm: FormGroup;
  handleExists: boolean = false;
  message: string;

  isLoading: boolean = false;
  private _unsubscribe = new Subject();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'handle': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'isAgreed': new FormControl(null, [Validators.required]),
    });
    this.registerForm.get('handle')!.valueChanges.subscribe(data => {
      this.isLoading = true;
      this.handleExists = false;
      setTimeout(() =>{
        this.authService.checkHandle(data).pipe(takeUntil(this._unsubscribe)).subscribe(res=> {
            this.handleExists = !!res;
        })
        this.isLoading = false;
      }, 500)
    })
  }

  onSignupButtonClicked() {
    this.message = '';
    const f = this.registerForm.value;
    this.authService.signup(f.email, f.password, f.handle).subscribe((res: HttpResponse<any>) => {
      this.router.navigateByUrl('/');
    }, err=>{
      this.message = err.error.message
    })
  }

}
