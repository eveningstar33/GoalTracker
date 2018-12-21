import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BasicAuthenticationService {

    constructor(private http: HttpClient) { }

    executeAuthenticationService(username, password) {

        let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
        let headers = new HttpHeaders({
            Authorization: basicAuthHeaderString
        });
        
        return this.http.get<AuthenticationBean>(
            'http://localhost:8080/basicauth',
            {headers});
    }
}

export class AuthenticationBean {
    constructor(public message: string) { }
}