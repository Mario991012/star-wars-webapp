import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from '../../../core/services/login/login.service';
import { IResponse } from '../../../core/interfaces/response.interface';
import { By } from '@angular/platform-browser';

// Mock services
class MockLoginService {
  validateCredentials(email: string, password: string) {
    return of({
      returnCode: 0,
      data: { user: email, accessToken: 'mockToken' },
      message: 'Login successful',
    } as IResponse);
  }
  saveToken(token: string) {}
  getToken() {
    return 'mockToken';
  }
  clearToken() {}
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let snackBar: MatSnackBar;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        LoginComponent
      ],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: Router, useClass: MockRouter },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message if login fails', () => {
    spyOn(loginService, 'validateCredentials').and.returnValue(
      of({
        returnCode: 13,
        data: null,
        message: 'Invalid credentials'
      } as IResponse)
    );
    component.loginForm.setValue({
      email: 'invalid@example.com',
      password: 'wrongpassword'
    });
    component.onSubmit();
    fixture.detectChanges();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Invalid credentials',
      'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      }
    );
  });

  it('should navigate to home on successful login', () => {
    spyOn(loginService, 'validateCredentials').and.returnValue(
      of({
        returnCode: 0,
        data: { user: 'star.wars@email.com', accessToken: 'mockToken' },
        message: 'Login successful'
      } as IResponse)
    );
    spyOn(router, 'navigate');
    component.loginForm.setValue({
      email: 'star.wars@email.com',
      password: 'password123'
    });
    component.onSubmit();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/star-wars/home']);
  });

  it('should disable login button when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.email?.setValue('');
    component.password?.setValue('');

    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBeTrue();
  });
});
