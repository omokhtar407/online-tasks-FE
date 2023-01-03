import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error(error.error.massage);
        }

        if (
          error.error.message == 'jwt expired' ||
          error.error.message == 'jwt must provided' ||
          error.error.message == 'jwt malformed'
        ) {
          this.router.navigate(['/auth/login']);
          localStorage.removeItem('userToken');
        }
        throw error;
      })
    );
  }
}
