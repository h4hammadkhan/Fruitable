import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardsidebarComponent } from './seller-dashboardsidebar.component';

describe('DashboardsidebarComponent', () => {
  let component: SellerDashboardsidebarComponent;
  let fixture: ComponentFixture<SellerDashboardsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDashboardsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDashboardsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
