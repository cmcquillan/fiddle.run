import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTemplatePageComponent } from './route-template-page.component';

describe('RouteTemplatePageComponent', () => {
  let component: RouteTemplatePageComponent;
  let fixture: ComponentFixture<RouteTemplatePageComponent>;

  beforeEach(async(() => {
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
