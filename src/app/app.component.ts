import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, RouterLink } from '@angular/router'; // Import Router
import { PhaserGame } from '../game/phaser-game.component';
import PlayScene from '../game/scenes/PlayScene'; // Import PlayScene as default
import { CommonModule } from '@angular/common';
import { EventBus } from '../game/EventBus';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { Game1Component } from './games/game1/game1.component';
import { Game2Component } from './games/game2/game2.component';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule,NgStyle, RouterOutlet, NavbarComponent, FooterComponent, Game1Component, Game2Component, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./styles.css']  // Make sure styles.css exists
})
export class AppComponent {
    currentRoute: string;

    // This is a reference from the PhaserGame component
    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.url.subscribe(url => {
            this.currentRoute = url.join('/');
        });
    }

    navigateToGame1() {
        this.router.navigate(['/app-game1']);
    }

    navigateToGame2() {
        this.router.navigate(['/app-game2']);
    }

}
