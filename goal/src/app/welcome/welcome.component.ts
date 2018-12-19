import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcomeMessageFromService: string;
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
    // console.log('Get welcome message');
    console.log(this.service.executeHelloWorldBeanService());  // We'll get an Observable in the console

    // To execute the request we need to subscribe to the observable
    this.service.executeHelloWorldBeanService().subscribe(
      response => {
        // console.log(response);
        // console.log(response.message);
        this.welcomeMessageFromService = response.message;
      }
    );

    console.log('last line of getWelcomeMessage()');

  }

}
