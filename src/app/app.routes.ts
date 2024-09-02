import { Routes } from '@angular/router';
import { FilmListComponent } from './presentation/pages/film-list/film-list.component';
import { UnauthorizedLayoutComponent } from './presentation/layouts/unauthorized-layout/unauthorized-layout.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { AuthorizedLayoutComponent } from './presentation/layouts/authorized-layout/authorized-layout.component';

export const routes: Routes = [
    {
        path: "login",
        component: UnauthorizedLayoutComponent,
        children: [
            { path: "", component: LoginComponent },
        ],
    },
    {
        path: "",
        component: AuthorizedLayoutComponent,
        children: [
            { path: "", redirectTo: "film-list", pathMatch: "full" },
            { path: "film-list", component: FilmListComponent }
        ]
    }
];
