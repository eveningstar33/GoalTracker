import { Component, OnInit } from '@angular/core';
import { GoalDataService } from '../service/data/goal-data.service';
import { Goal } from '../list-goals/list-goals.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  id: number;
  goal: Goal;

  constructor(
    private goalService: GoalDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.goalService.retrieveGoal('dgs', this.id).subscribe(
      data => this.goal = data
    );
  }

}
