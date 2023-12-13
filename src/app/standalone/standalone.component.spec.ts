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
    const fixture = TestBed.createComponent(StandaloneComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let emailInput: HTMLInputElement|null = compiled.querySelector('input[name="email"]');
    let passInput: HTMLInputElement|null = compiled.querySelector('input[name="password"]')
    expect(emailInput).toBeTruthy();
    expect(passInput).toBeTruthy();
  });
});
