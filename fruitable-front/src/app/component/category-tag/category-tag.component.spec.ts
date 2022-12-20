import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTagComponent } from './category-tag.component';

describe('CategoryTagComponent', () => {
  let component: CategoryTagComponent;
  let fixture: ComponentFixture<CategoryTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
