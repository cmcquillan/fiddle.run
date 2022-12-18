import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinearLayoutComponent } from './linear-layout.component';

describe('LinearLayoutComponent', () => {
  let component: LinearLayoutComponent;
  let fixture: ComponentFixture<LinearLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
