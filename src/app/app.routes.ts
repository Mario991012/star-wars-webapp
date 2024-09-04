import { Routes } from '@angular/router';
import { FilmListComponent } from './presentation/pages/film-list/film-list.component';
import { UnauthorizedLayoutComponent } from './presentation/layouts/unauthorized-layout/unauthorized-layout.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { AuthorizedLayoutComponent } from './presentation/layouts/authorized-layout/authorized-layout.component';
import { NotFoundComponent } from './presentation/pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { PeopleListComponent } from './presentation/pages/people-list/people-list.component';
import { VehicleListComponent } from './presentation/pages/vehicle-list/vehicle-list.component';

export const routes: Routes = [
    {
        path: "star-wars",
        component: AuthorizedLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", redirectTo: "film-list", pathMatch: "full" },
            { path: "home", redirectTo: "film-list", pathMatch: "full" },
            { path: "film-list", component: FilmListComponent },
            { path: "people-list", component: PeopleListComponent },
            { path: "vehicle-list", component: VehicleListComponent },
            { path: "**", component: NotFoundComponent }
        ]
    },
    {
        path: "",
        component: UnauthorizedLayoutComponent,
        children: [
            { path: "login", component: LoginComponent },
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "**", redirectTo: "login", pathMatch: "full" }
        ]
    },
];
