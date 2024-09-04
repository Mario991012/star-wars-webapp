import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { IResponse } from '../../../core/interfaces/response.interface';
import { environment } from '../../../../environments/environment';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a success response for valid credentials', (done) => {
    const email = 'star.wars@email.com';
    const password = 'password123';
    const expectedResponse: IResponse = {
      returnCode: 0,
      data: {
        user: email,
        accessToken: environment.mockToken
      },
      message: 'Login successful'
    };

    service.validateCredentials(email, password).subscribe((response: IResponse) => {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });

  it('should return an error response for invalid credentials', (done) => {
    const email = 'invalid@email.com';
    const password = 'wrongpassword';
    const expectedResponse: IResponse = {
      returnCode: 13,
      data: null,
      message: 'Invalid credentials'
    };

    service.validateCredentials(email, password).subscribe((response: IResponse) => {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });

  it('should save the token to localStorage', () => {
    const token = 'test-token';
    service.saveToken(token);
    expect(localStorage.getItem('authToken')).toBe(token);
  });

  it('should retrieve the token from localStorage', () => {
    const token = 'test-token';
    localStorage.setItem('authToken', token);
    expect(service.getToken()).toBe(token);
  });

  it('should clear the token from localStorage', () => {
    const token = 'test-token';
    localStorage.setItem('authToken', token);
    service.clearToken();
    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
