import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {AUTHENTICATED_USER, TOKEN, API_URL } from '../app.constants'; 

@Injectable({
    providedIn: 'root'
})
export class JWTAuthenticationService {

    constructor(private http: HttpClient) { }

    executeJWTAuthenticationService(username, password) {
        console.log('here 2');
        return this.http.post<any>(
            `${API_URL}/authenticate`, 
            {
                username,
                password
            }
        ).pipe(
            map(
                data => {
                    sessionStorage.setItem(AUTHENTICATED_USER, username);
                    sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
                    console.log(TOKEN);
                    return data;
                }
            )
        );
    }
}