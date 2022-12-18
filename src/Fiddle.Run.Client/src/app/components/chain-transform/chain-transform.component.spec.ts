import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChainTransformComponent } from './chain-transform.component';

describe('ChainTransformComponent', () => {
  let component: ChainTransformComponent;
  let fixture: ComponentFixture<ChainTransformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainTransformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
