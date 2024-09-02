import { Routes } from '@angular/router';
import { FilmListComponent } from './presentation/pages/film-list/film-list.component';

export const routes: Routes = [
    { path: "", redirectTo: "film-list", pathMatch: "full" },
    { path: "film-list", component: FilmListComponent }
];
