import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainTransformComponent } from './chain-transform.component';

describe('ChainTransformComponent', () => {
  let component: ChainTransformComponent;
  let fixture: ComponentFixture<ChainTransformComponent>;

  beforeEach(async(() => {
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
