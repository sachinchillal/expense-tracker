import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/page', label: 'Page' },
    { path: '/pages', label: 'Pages' },
    { path: '/tag', label: 'Tag' },
    { path: '/tags', label: 'Tags' },

  ]

}
