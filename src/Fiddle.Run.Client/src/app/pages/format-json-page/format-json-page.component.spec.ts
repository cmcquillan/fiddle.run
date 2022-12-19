import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormatJsonPageComponent } from './format-json-page.component';

describe('FormatJsonPageComponent', () => {
  let component: FormatJsonPageComponent;
  let fixture: ComponentFixture<FormatJsonPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatJsonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatJsonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
