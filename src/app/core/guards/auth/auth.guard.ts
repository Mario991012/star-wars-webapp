import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';

/**
 * `AuthGuard` is responsible for protecting routes by checking if the user is authenticated.
 * It implements `CanActivate` to determine if a route can be activated based on whether
 * the user has a valid authentication token.
 * 
 * The guard checks the presence of a token retrieved from `LoginService`.
 * If a valid token is found, the user is allowed to proceed to the protected route.
 * If no token is found, the user is redirected to the login page.
 *
 * @example
 * Example usage in routing module:
 * ```typescript
 * const routes: Routes = [
 *   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
 * ];
 * ```
 * 
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.loginService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
