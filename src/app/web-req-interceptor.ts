import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor{


  refreshingAccessToken : boolean;

  constructor(private service : AuthService) { }

  intercept(request: HttpRequest<any> , next : HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

   return next.handle(request).pipe(
     catchError((error : HttpErrorResponse)=>{
       console.log(error);
       if(error.status === 401 && !this.refreshingAccessToken){
         return this.refreshAccessToken().pipe(
           switchMap(()=>{
             request =this.addAuthHeader(request);
             return next.handle(request);

           }),catchError((err: any)=>{
             console.log(err);
             this.service.logout();
             return empty()
             
           })
         )
       }
       return throwError(error);
     })
   )
  }

  refreshAccessToken(){
    this.refreshingAccessToken= true;
    return this.service.getNewAccessToken().pipe(tap(()=>{
      this.refreshingAccessToken= false;
      console.log("token refreshed");
    }));
  }

  addAuthHeader(request : HttpRequest<any>){
    const token = this.service.getAccessToken();
    if(token){
      return request.clone({
        setHeaders:{
          'x-access-token' : token
        }
      }); 
    }

    return request;
  }
}
