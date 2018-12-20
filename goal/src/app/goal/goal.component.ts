import { Component, OnInit } from '@angular/core';
import { GoalDataService } from '../service/data/goal-data.service';
import { Goal } from '../list-goals/list-goals.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.goal = new Goal(1, '', false, new Date());  // We need to do this otherwise goal will be undefined
    this.goalService.retrieveGoal('dgs', this.id).subscribe(
      data => this.goal = data
    );
  }

  saveGoal() {
    this.goalService.updateGoal('dgs', this.id, this.goal).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['goals']);
      }
    );
  }

}
