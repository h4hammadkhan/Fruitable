import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupBuyerComponent } from './signup-buyer.component';

describe('SignupComponent', () => {
  let component: SignupBuyerComponent;
  let fixture: ComponentFixture<SignupBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
