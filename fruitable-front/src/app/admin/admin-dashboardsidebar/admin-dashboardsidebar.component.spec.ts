import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardsidebarComponent } from './admin-dashboardsidebar.component';

describe('DashboardsidebarComponent', () => {
  let component: AdminDashboardsidebarComponent;
  let fixture: ComponentFixture<AdminDashboardsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
