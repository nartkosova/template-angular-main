import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaserGame2 } from "../../../game2/phaser-game2.component";
import { EventBus } from '../../../game2/EventBus';

@Component({
    selector: 'app-game2',
    standalone: true,
    imports: [CommonModule, PhaserGame2], // Import CommonModule for ngIf, ngFor, etc. if needed
    templateUrl: './game2.component.html',
  styleUrl: './game2.component.css'
})
export class Game2Component implements OnInit{
  ngOnInit() {
    EventBus.on('background-color-change', (newColor: string) => {
      this.changeBackgroundColor(newColor);
    });
  }

  changeBackgroundColor(newColor: string) {
    // Your code to update the background color in Angular (e.g., update CSS styles)
    document.body.style.backgroundColor = newColor;
  }
}
