import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor() { }
 
  // So HttpIntercepterBasicAuthService is implementing the HttpInterceptor. 
  // In this HttpInterceptor we are adding the basic authentication header on top of the original
  // request. So whatever request is being sent out we want to add a header onto it. The thing is
  // this request object cannot be modified, so we need to clone it. So I make a clone of that 
  // specific request and override a specific property. So we're setting a header called authorization,
  // cloning the request and the only thing that we're changing is adding an authorization header 
  // based on what we have in here. The HTTPInterceptor acts like a filter, so you want to help it
  // continue execution, so once we add the header, I want the rest of the stuff to happen as usual.  
  // We're intercepting the request, adding the authorization header, and we're sending it to the 
  // next http handler. 
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let username = 'dgs';
    let password = 'test';
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    request = request.clone({
      setHeaders: {
        Authorization: basicAuthHeaderString
      }
    });
    return next.handle(request);
  }
}
