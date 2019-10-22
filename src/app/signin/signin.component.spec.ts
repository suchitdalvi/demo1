import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { SigninComponent } from './signin.component';
import { UserService } from '../shared/user.service';

const userServiceSpy = jasmine.createSpyObj('UserService', ['checkLogin']);
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        SigninComponent 
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });
  function updateForm(userName, userPassword) {
    component.loginForm.controls['username'].setValue(userName);
    component.loginForm.controls['password'].setValue(userPassword);
  }
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.error).toBeUndefined();
    expect(component.submitted).toBeFalsy();
  });

  it('create a form with username and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('form invalid should be true when blank fields passed', () => {
    updateForm('', '');
    component.submit();
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should have error if wrong credential passed when submit()', () => {
    updateForm("randmee", "teasdf");
    component.submit();
    expect(component.error).toEqual("Invalid Username or Password");
  });

  it('Display Username Error when Username is blank', () => {
    updateForm('', 'test');
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = compiled.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter username');
  });

  it('Display Password Error when Password is blank', () => {
    updateForm('tedsaf', '');
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = compiled.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('Display Username & Password Error when Username and Password are blank', () => {
    updateForm('', '');
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = compiled.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter username');

    const passwordErrorMsg = compiled.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm('', "test");
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = compiled.querySelectorAll('mat-form-field');
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('mat-form-field-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    updateForm('test', "");
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = compiled.querySelectorAll('mat-form-field');
    const usernameInput = inputs[1];

    expect(usernameInput.classList).toContain('mat-form-field-invalid');
  });

  it('When both field are filled, userService checkLogin() should called ', fakeAsync(() => {
    updateForm('test', 'test');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(userServiceSpy.checkLogin).toHaveBeenCalled();
  }));
});
