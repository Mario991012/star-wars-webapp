import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
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
      icon: "dashboard"
    },
    {
      route: "/people-list",
      title: "People",
      icon: "people"
    },
    {
      route: "/planets",
      title: "Planets",
      icon: "public"
    },
    {
      route: "vehicles",
      title: "Vehicles",
      icon: "commute"
    },
  ]
}
