import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpensesComponent } from './view-expenses.component';

describe('ViewExpensesComponent', () => {
  let component: ViewExpensesComponent;
  let fixture: ComponentFixture<ViewExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
