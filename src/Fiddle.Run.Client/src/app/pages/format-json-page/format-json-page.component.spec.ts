import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatJsonPageComponent } from './format-json-page.component';

describe('FormatJsonPageComponent', () => {
  let component: FormatJsonPageComponent;
  let fixture: ComponentFixture<FormatJsonPageComponent>;

  beforeEach(async(() => {
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
