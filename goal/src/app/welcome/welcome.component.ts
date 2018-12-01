import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';

  // Inject ActivatedRoute dependency
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // We need to pick up the route parameter name - params is a Map, name is the Key
    this.name = this.route.snapshot.params['name'];
  }

}
