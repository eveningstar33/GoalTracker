import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }  // Also we need to add HttpClientModule in the app.module

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    // console.log("Execute Hello World Bean Service");
  }

  executeHelloWorldBeanServiceWithPathVariable(name) {
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // Create a header
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<HelloWorldBean>(
      `http://localhost:8080//hello-world/path-variable/${name}`,
      {headers});  // This object is the same with this {headers: headers}
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'dgs';
    let password = 'test';
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    // You can see with Postman that it looks like this string "Basic ZGdzOnRlc3Q=" - it is some kind of
    // a byte 64 representation, of a combination of username and password separated by ":", appended with 
    // a string called "Basic". We're using window.btoe to encode the string in a base 64 format. 
    return basicAuthHeaderString;
  }

}
