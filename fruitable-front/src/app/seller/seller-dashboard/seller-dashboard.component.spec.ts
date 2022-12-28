import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardComponent } from './seller-dashboard.component';

describe('DashboardComponent', () => {
  let component: SellerDashboardComponent;
  let fixture: ComponentFixture<SellerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
