import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendarsComponent } from './edit-calendars.component';

describe('EditCalendarsComponent', () => {
  let component: EditCalendarsComponent;
  let fixture: ComponentFixture<EditCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
