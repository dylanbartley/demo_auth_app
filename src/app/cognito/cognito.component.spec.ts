import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoComponent } from './cognito.component';

describe('CognitoComponent', () => {
  let component: CognitoComponent;
  let fixture: ComponentFixture<CognitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CognitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CognitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
