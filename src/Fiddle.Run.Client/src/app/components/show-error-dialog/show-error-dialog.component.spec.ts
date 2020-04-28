import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowErrorDialogComponent } from './show-error-dialog.component';

describe('ShowErrorDialogComponent', () => {
  let component: ShowErrorDialogComponent;
  let fixture: ComponentFixture<ShowErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
