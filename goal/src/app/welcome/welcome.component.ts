import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';

  // Inject ActivatedRoute dependency
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService) { }

  ngOnInit() {
    // We need to pick up the route parameter name - params is a Map, name is the Key
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());
    // console.log('Get welcome message');
  }

}
