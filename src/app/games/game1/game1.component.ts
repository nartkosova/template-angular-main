import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaserGame } from "../../../game/phaser-game.component";

@Component({
    selector: 'app-game1',
    standalone: true,
    imports: [CommonModule, PhaserGame], // Import CommonModule for ngIf, ngFor, etc. if needed
    templateUrl: './game1.component.html',
  styleUrl: './game1.component.css'
})
export class Game1Component {

}
