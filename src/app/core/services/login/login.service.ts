import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IResponse } from '../../interfaces/response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
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

  validateCredentials(email: string, password: string): Observable<IResponse> {
    const isValid = email === this.mockUser.email && password === this.mockUser.password;
    return of(isValid ? this.mockSuccessResponse : this.mockErrorResponse).pipe(delay(500));
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }
}
