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
  @Input() routes: RouteData[] = [];
  @Input() showLogout: boolean = true;
  @Output() selectedRouteEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor( private router: Router, private loginService: LoginService) {}

  returnRoute( route: RouteData ) {
    this.defineSelected( route );
    this.selectedRouteEmitter.emit( route.route );
  }

  public logout() {
    this.loginService.clearToken();
    this.router.navigate(["/login"]);
  }
  
  private defineSelected( route: RouteData ): void {
    this.routes = this.routes.map( actualRoute => ({
      ...actualRoute,
      selected: actualRoute.route === route.route,
    }));
  }
}
