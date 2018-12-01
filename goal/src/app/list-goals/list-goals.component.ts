import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css']
})
export class ListGoalsComponent implements OnInit {

  goals = [
    {
      id: 1,
      description: 'Learn to Dance'
    },
    {
      id: 2,
      description: 'Visit USA'
    },
    {
      id: 3,
      description: 'Become an Expert at Angular'
    }
  ]; 

  constructor() { }

  ngOnInit() {
  }

}
