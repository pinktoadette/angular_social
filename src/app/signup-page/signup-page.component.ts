import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  isAgreed: boolean = false;
  registerForm: FormGroup;
  handleExists: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'handle': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'isAgreed': new FormControl(null, [Validators.required]),
    });
  }

  onSignupButtonClicked() {
    const f = this.registerForm.value;
    this.authService.signup(f.email, f.password, f.handle).subscribe((res: HttpResponse<any>) => {
      this.router.navigate(['/']);
    });
  }

}
