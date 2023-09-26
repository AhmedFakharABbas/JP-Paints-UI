import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePhoneCallComponent } from './schedule-phone-call.component';

describe('SchedulePhoneCallComponent', () => {
  let component: SchedulePhoneCallComponent;
  let fixture: ComponentFixture<SchedulePhoneCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePhoneCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePhoneCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
