import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StandaloneComponent } from './standalone.component';
import { AuthService } from '../_services/auth.service';

const mockAuthService = {

};

describe('StandaloneComponent', () => {
  let component: StandaloneComponent;
  let fixture: ComponentFixture<StandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StandaloneComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let emailInput: HTMLInputElement|null = compiled.querySelector('input[name="email"]');
    let passInput: HTMLInputElement|null = compiled.querySelector('input[name="password"]');
    expect(emailInput).toBeTruthy();
    expect(passInput).toBeTruthy();
  });

  it('with normal view, should show login and register buttons with no name and confirm password fields', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let nameInput: HTMLInputElement|null = compiled.querySelector('input[name="name"]');
    let confirmInput: HTMLInputElement|null = compiled.querySelector('input[name="confirmpassword"]');

    let loginBtn: HTMLButtonElement|null = compiled.querySelector('#loginBtn');
    let registerBtn: HTMLButtonElement|null = compiled.querySelector('#registerBtn');

    expect(loginBtn).toBeTruthy();
    expect(registerBtn).toBeTruthy();
    expect(nameInput).toBeFalsy();
    expect(confirmInput).toBeFalsy();
  });

  it('should trigger view change to REGISTER_VIEW', () => {
    let fnSpy = spyOn(component, 'onViewToggle').and.callThrough();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let registerBtn: HTMLButtonElement|null = compiled.querySelector('#registerBtn');
    registerBtn?.click();

    expect(fnSpy).toHaveBeenCalled();
    expect(component.view).toBe(component.REGISTER_VIEW);
  });

  it('with register view, should not show login and register buttons, but submit button with name and confirm password fields', () => {
    component.view = component.REGISTER_VIEW;
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let nameInput: HTMLInputElement|null = compiled.querySelector('input[name="name"]');
    let confirmInput: HTMLInputElement|null = compiled.querySelector('input[name="confirmpassword"]');

    let loginBtn: HTMLButtonElement|null = compiled.querySelector('#loginBtn');
    let registerBtn: HTMLButtonElement|null = compiled.querySelector('#registerBtn');
    let submitBtn: HTMLButtonElement|null = compiled.querySelector('#submitBtn');

    expect(loginBtn).toBeFalsy();
    expect(registerBtn).toBeFalsy();
    expect(submitBtn).toBeTruthy();

    expect(nameInput).toBeTruthy();
    expect(confirmInput).toBeTruthy();
  });

  it('with register view, should not autocomplete password', () => {
    component.view = component.REGISTER_VIEW;
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let passInput: HTMLInputElement|null = compiled.querySelector('input[name="password"]');
    expect(passInput).toBeTruthy();

    let att = passInput?.getAttribute('autocomplete');
    expect(att).toBe('off');
  });

  it('with register view, should make name and confirmpassword controls required', () => {
    component.onViewToggle(component.REGISTER_VIEW);

    let nameRequired = component.form.controls.name.hasValidator(Validators.required);
    let passRequired = component.form.controls.confirmpassword.hasValidator(Validators.required);

    expect(nameRequired).toBeTrue();
    expect(passRequired).toBeTrue();
  });

  it('should trigger view change to LOGIN_VIEW', () => {
    let fnSpy = spyOn(component, 'onViewToggle').and.callThrough();

    component.view = component.REGISTER_VIEW;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let cancelBtn: HTMLButtonElement|null = compiled.querySelector('#cancelBtn');
    cancelBtn?.click();

    expect(fnSpy).toHaveBeenCalled();
    expect(component.view).toBe(component.LOGIN_VIEW);
  });
});
