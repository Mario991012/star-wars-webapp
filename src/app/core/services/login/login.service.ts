import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IResponse } from '../../interfaces/response.interface';
import { environment } from '../../../../environments/environment';

/**
 * `LoginService` provides methods for handling user authentication and token management.
 * It uses a mock implementation to simulate login validation, token storage, and retrieval.
 *
 * The service validates credentials against mock data and returns an observable response.
 * It also provides methods to save, retrieve, and clear tokens from `localStorage`.
 *
 * @example
 * Usage example for login validation:
 * ```typescript
 * this.loginService.validateCredentials('email@example.com', 'password123')
 *   .subscribe(response => {
 *     if (response.returnCode === 0) {
 *       this.loginService.saveToken(response.data.accessToken);
 *     }
 *   });
 * ```
 * 
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private mockUser = {
    email: 'star.wars@email.com',
    password: 'password123'
  };

  private mockSuccessResponse: IResponse = {
    returnCode: 0,
    data: {
      user: this.mockUser.email,
      accessToken: environment.mockToken
    },
    message: 'Login successful'
  };

  private mockErrorResponse: IResponse = {
    returnCode: 13,
    data: null,
    message: 'Invalid credentials'
  };

  /**
   * Validates the provided credentials against the mock user data.
   * Returns an observable `IResponse` that emits either a success or error response.
   * 
   * @param email - The email address entered by the user.
   * @param password - The password entered by the user.
   * @returns An `Observable<IResponse>` that emits the login result. This have a delay of 500ms to simulate a request call.
   */
  validateCredentials(email: string, password: string): Observable<IResponse> {
    const isValid = email === this.mockUser.email && password === this.mockUser.password;
    return of(isValid ? this.mockSuccessResponse : this.mockErrorResponse).pipe(delay(500));
  }

  /**
   * Saves the authentication token to `localStorage`.
   * 
   * @param token - The authentication token to be saved.
   */
  saveToken(token: string): void {
    localStorage.setItem(environment.authTokenKey, token);
  }

  /**
   * Retrieves the authentication token from `localStorage`.
   * 
   * @returns The stored authentication token, or `null` if no token is found.
   */
  getToken(): string | null {
    return localStorage.getItem(environment.authTokenKey);
  }

  /**
   * Clears the authentication token from `localStorage`.
   */
  clearToken(): void {
    localStorage.removeItem(environment.authTokenKey);
  }
}
