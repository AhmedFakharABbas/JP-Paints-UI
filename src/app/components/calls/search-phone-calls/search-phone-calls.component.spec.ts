import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPhoneCallsComponent } from './search-phone-calls.component';

describe('SearchPhoneCallsComponent', () => {
  let component: SearchPhoneCallsComponent;
  let fixture: ComponentFixture<SearchPhoneCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPhoneCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPhoneCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
