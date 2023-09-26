import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBulkCallsComponent } from './schedule-bulk-calls.component';

describe('ScheduleBulkCallsComponent', () => {
  let component: ScheduleBulkCallsComponent;
  let fixture: ComponentFixture<ScheduleBulkCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleBulkCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBulkCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
