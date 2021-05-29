import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() { }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
    console.log('interceptor for ', request.url);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('[inteceptor.service.ts] Http Response ', event);

          return event;
        }
      }),
      catchError((error: HttpErrorResponse, header) => {
        return throwError("Something went wrong");
      })
    );
  }
}
