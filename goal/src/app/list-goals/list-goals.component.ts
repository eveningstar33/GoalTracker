import { Component, OnInit } from '@angular/core';
import { detachEmbeddedView } from '@angular/core/src/view';

export class Goal {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css']
})
export class ListGoalsComponent implements OnInit {

  goals = [
    new Goal(1, 'Learn to Dance', false, new Date()),
    new Goal(2, 'Visit USA', false, new Date()),
    new Goal(3, 'Become an Expert at Angular', false, new Date())
    
    // {
    //   id: 1,
    //   description: 'Learn to Dance'
    // },
    // {
    //   id: 2,
    //   description: 'Visit USA'
    // },
    // {
    //   id: 3,
    //   description: 'Become an Expert at Angular'
    // }
  ];

  constructor() { }

  ngOnInit() {
  }

}
