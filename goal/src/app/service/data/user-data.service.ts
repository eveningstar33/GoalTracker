import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  addUser(user) {
    return this.http.post(`${API_URL}/register`, user);
  }
}
