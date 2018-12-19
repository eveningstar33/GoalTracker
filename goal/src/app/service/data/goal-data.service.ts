import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from 'src/app/list-goals/list-goals.component';

@Injectable({
  providedIn: 'root'
})
export class GoalDataService {

  constructor(private http: HttpClient) { }

  retrieveAllGoals(username) {
    return this.http.get<Goal[]>(`http://localhost:8080/users/${username}/goals`);
  }

  deleteGoal(username, id) {
    return this.http.delete<Goal>(`http://localhost:8080/users/${username}/goals/${id}`);
  }
}
