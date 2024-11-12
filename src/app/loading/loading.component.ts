import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LandingComponent {

  constructor(private router: Router) {}

  // Navigate to Game 1
  navigateToGame1() {
    this.router.navigate(['/app-game1']);
  }

  // Navigate to Game 2
  navigateToGame2() {
    this.router.navigate(['/app-game2']);
  }
}
