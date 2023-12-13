import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StandaloneComponent } from './standalone.component';

describe('StandaloneComponent', () => {
  let component: StandaloneComponent;
  let fixture: ComponentFixture<StandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StandaloneComponent]
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
    // const fixture = TestBed.createComponent(StandaloneComponent);
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

  it('with register view, should not show login and register buttons, but submit button with name and confirm password fields', () => {
    fixture.componentInstance.view = fixture.componentInstance.REGISTER_VIEW;
    
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
    fixture.componentInstance.view = fixture.componentInstance.REGISTER_VIEW;
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let passInput: HTMLInputElement|null = compiled.querySelector('input[name="password"]');
    expect(passInput).toBeTruthy();

    let att = passInput?.getAttribute('autocomplete');
    expect(att).toBe('off');
  });
});
