import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NavbarComponent {
  isMenuOpen = false;
  currentRoute: string;

  toggleMenu(event: Event): void {
    event.stopPropagation(); // Prevent click event from affecting other elements
    this.isMenuOpen = !this.isMenuOpen;
  }
}
