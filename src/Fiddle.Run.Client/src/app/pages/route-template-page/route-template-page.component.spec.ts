import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouteTemplatePageComponent } from './route-template-page.component';

describe('RouteTemplatePageComponent', () => {
  let component: RouteTemplatePageComponent;
  let fixture: ComponentFixture<RouteTemplatePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTemplatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
