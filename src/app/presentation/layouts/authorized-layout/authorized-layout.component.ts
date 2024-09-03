import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouteData } from '../../interfaces/route-data.interface';

@Component({
  selector: 'app-authorized-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.scss'
})
export class AuthorizedLayoutComponent {

  routes: RouteData[] = [
    {
      route: "/film-list",
      title: "Films",
      icon: "dashboard",
      selected: false,
    },
    {
      route: "/people-list",
      title: "People",
      icon: "people",
      selected: false,
    },
    {
      route: "/planets",
      title: "Planets",
      icon: "public",
      selected: false,
    },
    {
      route: "vehicles",
      title: "Vehicles",
      icon: "commute",
      selected: false,
    },
  ]

  constructor( private router: Router ) {}

  goToRoute( route: string ): void {
    this.routes = this.routes.map( actualRoute => ({
      ...actualRoute,
      selected: actualRoute.route === route,
    }))
    this.router.navigate([ route ]);
  }
}
