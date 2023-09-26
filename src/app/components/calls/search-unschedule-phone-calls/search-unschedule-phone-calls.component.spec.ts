import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUnschedulePhoneCallsComponent } from './search-unschedule-phone-calls.component';

describe('SearchUnschedulePhoneCallsComponent', () => {
  let component: SearchUnschedulePhoneCallsComponent;
  let fixture: ComponentFixture<SearchUnschedulePhoneCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUnschedulePhoneCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUnschedulePhoneCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
