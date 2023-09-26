import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBulkCallsModalComponent } from './schedule-bulk-calls-modal.component';

describe('ScheduleBulkCallsModalComponent', () => {
  let component: ScheduleBulkCallsModalComponent;
  let fixture: ComponentFixture<ScheduleBulkCallsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleBulkCallsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBulkCallsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
