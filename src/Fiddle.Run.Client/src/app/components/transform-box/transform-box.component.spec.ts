import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransformBoxComponent } from './transform-box.component';

describe('TransformBoxComponent', () => {
  let component: TransformBoxComponent;
  let fixture: ComponentFixture<TransformBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
