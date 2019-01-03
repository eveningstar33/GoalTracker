import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../app.constants';

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
            `${API_URL}/basicauth`,
            {headers}).pipe(
                map(
                    data => {
                        sessionStorage.setItem(AUTHENTICATED_USER, username);
                        sessionStorage.setItem(TOKEN, basicAuthHeaderString);
                        return data;
                    }
                )
            );

        // If there is a valid response then set something into session and return the response back 
        // so that whoever is subscribing to it will get the data. 
    }

    getAuthenticatedUser() {
        return sessionStorage.getItem(AUTHENTICATED_USER);
    }

    getAuthenticatedToken() {
        if (this.getAuthenticatedUser())
            return sessionStorage.getItem(TOKEN);
    }

    logout() {
        sessionStorage.removeItem(AUTHENTICATED_USER);
        sessionStorage.removeItem(TOKEN);
    }
}

export class AuthenticationBean {
    constructor(public message: string) { }
}