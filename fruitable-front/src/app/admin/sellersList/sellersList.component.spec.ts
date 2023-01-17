/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellersListComponent } from './sellersList.component';

describe('UsersListComponent', () => {
  let component: SellersListComponent;
  let fixture: ComponentFixture<SellersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
