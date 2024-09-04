import { Routes } from '@angular/router';
import { UnauthorizedLayoutComponent } from './presentation/layouts/unauthorized-layout/unauthorized-layout.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { AuthorizedLayoutComponent } from './presentation/layouts/authorized-layout/authorized-layout.component';
import { NotFoundComponent } from './presentation/pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'star-wars',
    component: AuthorizedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'film-list', pathMatch: 'full' },
      { path: 'home', redirectTo: 'film-list', pathMatch: 'full' },
      { 
        path: 'film-list', 
        loadComponent: () => import('./presentation/pages/film-list/film-list.component').then(m => m.FilmListComponent)
      },
      { 
        path: 'people-list', 
        loadComponent: () => import('./presentation/pages/people-list/people-list.component').then(m => m.PeopleListComponent)
      },
      {
        path: 'vehicles',
        children: [
          { 
            path: 'vehicle-list', 
            loadComponent: () => import('./presentation/pages/vehicle-list/vehicle-list.component').then(m => m.VehicleListComponent)
          },
          { 
            path: 'details/:id', 
            loadComponent: () => import('./presentation/pages/vehicle-detail/vehicle-detail.component').then(m => m.VehicleDetailComponent)
          },
        ],
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  {
    path: '',
    component: UnauthorizedLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
