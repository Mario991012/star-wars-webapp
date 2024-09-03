import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';
import { IResponse } from '../../../core/interfaces/response.interface';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../core/services/login/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['validateCredentials']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginService and navigate on valid form submission', () => {
    const response: IResponse = {
      returnCode: 0,
      data: {
        user: 'star.wars@email.com',
        accessToken: environment.mockToken
      },
      message: ''
    };
    loginService.validateCredentials.and.returnValue(of(response));

    component.loginForm.setValue({ email: 'star.wars@email.com', password: 'password123' });
    component.onSubmit();

    expect(loginService.validateCredentials).toHaveBeenCalledWith('star.wars@email.com', 'password123');
    expect(localStorage.getItem('accessToken')).toBe(environment.mockToken);
    expect(router.navigate).toHaveBeenCalledWith(['/film-list']);
  });

  it('should display an error message for invalid credentials', () => {
    const response: IResponse = {
      returnCode: 13,
      data: null,
      message: 'Invalid credentials'
    };
    loginService.validateCredentials.and.returnValue(of(response));

    component.loginForm.setValue({ email: 'invalid@email.com', password: 'wrongpassword' });
    component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith('Incorrect credentials. Try again.', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar']
    });
  });
});
