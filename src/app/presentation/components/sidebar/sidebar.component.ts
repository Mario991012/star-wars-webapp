import { LoginService } from './../../../core/services/login/login.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouteData } from '../../interfaces/route-data.interface';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * `SidebarComponent` is a standalone Angular component responsible for rendering a navigation sidebar.
 * It displays a list of routes and optionally includes a logout button. The selected route is highlighted,
 * and the component emits the selected route whenever a new route is clicked.
 * 
 * @remarks
 * The component handles route selection and emits the selected route via the `selectedRouteEmitter` output.
 * It also provides a logout function that clears the authentication token using `LoginService` and navigates to the login page.
 * 
 * @example
 * Example usage:
 * ```html
 * <app-sidebar [routes]="appRoutes" (selectedRouteEmitter)="onRouteSelected($event)"></app-sidebar>
 * ```
 * 
 * @decorator `@Component`
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavContent,
    MatIcon,
    MatList,
    MatSidenav,
    MatNavList,
    MatSidenavContainer,
    MatToolbar,
    MatList,
    MatListItem,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  /**
   * An array of route objects that defines the routes displayed in the sidebar.
   * Each route object implements the `RouteData` interface.
   */
  @Input() routes: RouteData[] = [];

  /**
   * A flag that controls whether the logout button is visible. Defaults to `true`.
   */
  @Input() showLogout: boolean = true;

  /**
   * An output event that emits the selected route's path as a string when a route is clicked.
   */
  @Output() selectedRouteEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private loginService: LoginService) {}

  /**
   * Handles route selection by marking the selected route and emitting its path.
   * 
   * @param route - The selected `RouteData` object.
   */
  returnRoute(route: RouteData): void {
    this.defineSelected(route);
    this.selectedRouteEmitter.emit(route.route);
  }

  /**
   * Logs the user out by clearing the authentication token via `LoginService` and navigating to the login page.
   */
  public logout(): void {
    this.loginService.clearToken();
    this.router.navigate(['/login']);
  }

  /**
   * Marks the currently selected route in the `routes` array by comparing the `route` path.
   * 
   * @param route - The selected `RouteData` object to be highlighted.
   */
  private defineSelected(route: RouteData): void {
    this.routes = this.routes.map((actualRoute) => ({
      ...actualRoute,
      selected: actualRoute.route === route.route,
    }));
  }
}
