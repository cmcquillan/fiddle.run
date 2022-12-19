import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PalettePageComponent } from './palette-page.component';

describe('PalettePageComponent', () => {
  let component: PalettePageComponent;
  let fixture: ComponentFixture<PalettePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PalettePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalettePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
