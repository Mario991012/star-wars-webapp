import { Component, Input } from '@angular/core';
import { RouteData } from '../../interfaces/route-data.interface';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavContent, MatIcon, MatList, MatSidenav, MatNavList, MatSidenavContainer, MatToolbar, MatList, MatListItem],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() routes: RouteData[] = [];
}
