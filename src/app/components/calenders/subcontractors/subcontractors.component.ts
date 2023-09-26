import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter, Output } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-subcontractors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.css']
})
export class SubcontractorsComponent implements OnInit {
  // @ViewChild('modalContent') modalContent: TemplateRef<any>;

  t: any;
  currentJustify = 'start';
  currentOrientation = 'horizontal';

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'bar') {
      $event.preventDefault();
    }
  };
  view: string = 'month';

  newEvent: CalendarEvent;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-edit"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit this event', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('This event is deleted!', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  @Output() directionEvent = new EventEmitter<Object>();
  toggleClass = 'ft-maximize';
  placement = 'bottom-right'
  public isCollapsed = true;
  currentLang = 'en';
  options = {
    direction: 'ltr'
  };
  activeModelRefCustomer: NgbModalRef;
  activeModelRef: NgbModalRef;
  constructor(private modal: NgbModal) {

  }
  ngOnInit() {
    // $.getScript('./assets/js/sticky-header.js');

  }
  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    }
    else {
      this.toggleClass = 'ft-maximize';
    }
  }
  // ChangeLanguage(language: string) {
  //   this.translate.use(language);
  // }
  sendOptions() {
    this.directionEvent.emit(this.options);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: this.actions,
    }
    this.events.push(this.newEvent);

    // this.refresh.next();
    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
  }

  openBookAppointment(modal: any) {
    this.activeModelRef = this.modal.open(modal);
  }
  openCustomer(modal: any) {
    this.activeModelRefCustomer = this.modal.open(modal)
  }
}
//Calendar event handler ends

