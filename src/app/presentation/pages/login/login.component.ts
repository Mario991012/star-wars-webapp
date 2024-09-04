import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../../data/auth/services/login/login.service';
import { IResponse } from '../../../core/interfaces/response.interface';
import { Router } from '@angular/router';

/**
 * `LoginComponent` is a standalone Angular component that handles user authentication.
 * It provides a login form where users enter their email and password, validates their credentials,
 * and navigates to the home page if successful. If login fails, it displays an error message.
 * 
 * @remarks
 * If the login is successful, the user is redirected to the `star-wars/home` route.
 * 
 * @decorator `@Component`
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  /**
   * The reactive form group for the login form.
   * It contains `email` and `password` form controls with validation rules.
   */
  loginForm: FormGroup;

  /**
   * Subject used to manage the unsubscription from observables when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.loginService.clearToken();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Handles the form submission when the login form is submitted.
   * It validates the form and calls `LoginService` to validate the user credentials.
   * If successful, the token is saved, and the user is redirected. If login fails, an error message is shown.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.loginService
        .validateCredentials(email, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: IResponse) => {
          if (response.returnCode === 0) {
            this.loginService.saveToken(response?.data?.accessToken || undefined);
            this.router.navigate(['/star-wars/home']);
          } else {
            this.snackBar.open(
              response.message || 'Incorrect credentials. Try again.',
              'Close',
              {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['error-snackbar'],
              }
            );
          }
        });
    }
  }

  /**
   * It completes the `destroy$` subject to clean up any subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
