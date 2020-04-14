import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64PageComponent } from './base64-page.component';

describe('Base64PageComponent', () => {
  let component: Base64PageComponent;
  let fixture: ComponentFixture<Base64PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Base64PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
