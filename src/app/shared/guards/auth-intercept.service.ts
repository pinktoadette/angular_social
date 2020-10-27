import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SignupPageComponent } from 'src/app/signup-page/signup-page.component';
import {AuthService} from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UnauthorisedRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        public dialog: MatDialog) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.dialog.open(SignupPageComponent, {
                        width: '500px',
                    });
                }
                return throwError(error);
            })
        );
    }
}