import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password fields', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
    expect(inputElements[0].getAttribute('type')).toEqual('email');
    expect(inputElements[1].getAttribute('type')).toEqual('password');
  });

  it('should invalidate the form if fields are empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate the email field as required', () => {
    const email = component.email;
    email?.setValue('');
    expect(email?.hasError('required')).toBeTruthy();
  });

  it('should validate the email format', () => {
    const email = component.email;
    email?.setValue('invalidemail');
    expect(email?.hasError('email')).toBeTruthy();
  });

  it('should validate the password field with minimum length', () => {
    const password = component.password;
    password?.setValue('12345');
    expect(password?.hasError('minlength')).toBeTruthy();
  });

  it('should enable the login button if the form is valid', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeFalsy();
  });
});
