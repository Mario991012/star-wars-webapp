import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouteData } from '../../interfaces/route-data.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-authorized-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss'],
})
export class AuthorizedLayoutComponent {
  isSidebarOpen = false;

  routes: RouteData[] = [
    {
      route: '/star-wars/film-list',
      title: 'Films',
      icon: 'dashboard',
      selected: false,
    },
    {
      route: '/star-wars/people-list',
      title: 'People',
      icon: 'people',
      selected: false,
    },
    {
      route: '/star-wars/vehicles/vehicle-list',
      title: 'Vehicles',
      icon: 'commute',
      selected: false,
    },
    {
      route: '/star-wars/not-found',
      title: 'Not Found',
      icon: 'public',
      selected: false,
    },
  ];

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  goToRoute(route: string): void {
    this.routes = this.routes.map((actualRoute) => ({
      ...actualRoute,
      selected: actualRoute.route === route,
    }));
    this.router.navigate([route]);
    this.closeSidebar();
  }
}
