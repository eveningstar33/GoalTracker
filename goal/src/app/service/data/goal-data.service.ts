import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GOAL_JPA_API_URL, API_URL } from 'src/app/app.constants';
import { Goal } from 'src/app/model/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalDataService {

  constructor(private http: HttpClient) { }

  retrieveAllGoals(username) {
    console.log(username);
    return this.http.get<Goal[]>(`${GOAL_JPA_API_URL}/users/${username}/goals`);
  }

  deleteGoal(username, id) {
    return this.http.delete<Goal>(`${GOAL_JPA_API_URL}/users/${username}/goals/${id}`);
  }

  retrieveGoal(username, id) {
    return this.http.get<Goal>(`${GOAL_JPA_API_URL}/users/${username}/goals/${id}`);
  }

  updateGoal(username, id, goal) {
    return this.http.put(`${GOAL_JPA_API_URL}/users/${username}/goals/${id}`, goal);
  }

  createGoal(username, goal) {
    return this.http.post(`${GOAL_JPA_API_URL}/users/${username}/goals`, goal);
  }

  // We'll not use the same thing like in the welcome-data.service.ts. Now we'll use http interceptors
  // that will enable us to add a specific request header to every request. 
}
