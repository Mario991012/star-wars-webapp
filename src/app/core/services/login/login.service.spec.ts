import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { environment } from '../../../../environments/environment';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock success response for valid credentials', (done: DoneFn) => {
    service.validateCredentials('star.wars@email.com', 'password123').subscribe(response => {
      expect(response).toBeTruthy();
      expect(response?.returnCode).toBe(0);
      expect(response?.data.user).toBe('star.wars@email.com');
      expect(response?.data.accessToken).toBe(environment.mockToken);
      expect(response?.message).toBe('Login successful');
      done();
    });
  });

  it('should return mock error response for invalid credentials', (done: DoneFn) => {
    service.validateCredentials('star.wars@email.com', 'wrongpassword').subscribe(response => {
      expect(response).toBeTruthy();
      expect(response?.returnCode).toBe(13);
      expect(response?.data).toBeNull();
      expect(response?.message).toBe('Invalid credentials');
      done();
    });
  });
});
