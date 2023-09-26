import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef,
  ɵConsole,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfHour,
  setHours,
  setMinutes,
  getHours,
} from "date-fns";
import { Subject } from "rxjs";
import {
  NgbModal,
  NgbModalRef,
  NgbTabChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { EventEmitter, Output } from "@angular/core";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from "angular-calendar";
import { GeneralService } from "src/app/services/general.service";
import { SharedService } from "src/app/services/shared.service";
import { Customer } from "src/app/models/customer";
import { User } from "src/app/models/user.model";
import { Calendars } from "src/app/models/calendars.model";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from "rxjs/operators";
import { Project } from "src/app/models/project";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { AdminSideService } from "src/app/services/admin-side.service";
import { ItemsList } from "@ng-select/ng-select/lib/items-list";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ObjectType } from "src/app/models/object-type.model";
import { UserAdministration } from "src/app/models/user-administration.model";
import { Estimate } from "src/app/models/estimate.model";
import { element } from "protractor";
import { getWeekView } from "calendar-utils";
import $ from "jquery";
import { ScrollDispatcher } from "@angular/cdk/overlay";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { MatOptionSelectionChange } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { stringify } from "querystring";
import { FormControl } from "@angular/forms";

const colors: any = {
  red: {
    primary: "#ee3724",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-crews",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./crews.component.html",
  styleUrls: ["./crews.component.css"],
})
export class CrewsComponent implements OnInit {
  // @ViewChild('modalContent') modalContent: TemplateRef<any>;

  appointmentForTextSearch$ = new FormControl();
  appointmentWithTextSearch$ = new FormControl();

  searchResult$: Observable<any[]>;
  customersSearchResult$: Observable<any[]>;

  projecttSearch$ = new FormControl();

  searchProjects$: Observable<any[]>;

  is_navigated: boolean = false;
  appointmentForID: number = 0;
  time_difference: number;
  time_duration: number;
  hours_difference_in_int: number;
  minutes_difference_in_int: number;
  hours_difference_in_int_2: number;
  minutes_difference_in_int_2: number;
  customerName: string;
  t: any;
  estimators_id: number;
  projectNumber: any;
  crews_id: number;
  appointmentDate: Date;
  appointmentForName: string;
  isCustomerIDset: number;
  delEventId: number = undefined;
  currentJustify = "start";
  currentOrientation = "horizontal";
  eventId: number;
  isSelectAllCalled: boolean;
  isSelectAll: boolean = true;
  estimators: Array<UserAdministration>;
  viewDate: Date = new Date();
  // events: CalendarEvent[] = [];
  clickedDate: Date;
  clickedColumn: number;
  project: Project;
  appointmerForName: string;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  virtualScroll: CdkVirtualScrollViewport;

  // @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @ViewChild("input1", { static: false }) inputEl: ElementRef;

  selectedItem: any;
  _itemTrigger: any;
  cdkVirtualScrollViewPort: any;
  appointmentType: any;
  appointment_for: number;
  iscustomerLoading: boolean;
  isProjectLoading: boolean;
  isAppointmentForLoading: boolean;
  searchResultLength: any;
  projectsLength: any;
  customerssearchResultLength: any;
  get itemTrigger(): string {
    return this._itemTrigger;
  }

  set itemTrigger(v: string) {
    this._itemTrigger = v;
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === "bar") {
      $event.preventDefault();
    }
  }
  view: string = "day";
  meridian: boolean = false;

  newEvent: CalendarEvent;
  startTimeInInt: number;
  endTimeInInt: number;
  startTimeMinutesInInt: number;
  endTimeMinutesInInt: number;
  userID: number;
  selectedUsers: Array<any>;

  query_param_id: number;
  query_param_date: Date;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-eye mx-1"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.delEventId = +event.id;
        console.log("eye: " + this.delEventId);
        var index = this.Events.findIndex((item) => item.id == event.id);
        this.calendarsObj = new Calendars();
        this.calendarsObj = this.Events[index];

        document.getElementById("viewModelBtn").click();
      },
    },
    {
      label: '<i class="fa fa-edit"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.delEventId = +event.id;
        console.log("edit: " + this.delEventId);
        var index = this.Events.findIndex((item) => item.id == event.id);
        this.calendarsObj = new Calendars();
        this.calendarsObj = this.Events[index];
        console.log(this.Events[index]);
        this.customerName = this.calendarsObj.appointment_with_name;
        this.appointmentForName = this.calendarsObj.appointment_for_name;
        this.projectNumber = this.calendarsObj.project_for_appointment;
        this.appointmentForTextSearch$.setValue(
          this.Events[index].appointment_for_name
        );
        this.appointmentWithTextSearch$.setValue(
          this.Events[index].appointment_with_name
        );

        // this.calendarsObj.appointment_with_obj = this.customers.find(item => item.id == this.calendarsObj.appointment_with)

        // this.onGetProjectsOfCustomers();
        // var idx = this.customers.findIndex(item => item.id == this.calendarsObj.appointment_with);
        // this.calendarsObj.appointment_with = this.customers[idx].first_name + " " + this.customers[idx].last_name;
        document.getElementById("updateModelBtn").click();

        // this.handleEvent('Edit this event', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.delEventId = +event.id;
        document.getElementById("delModelBtn").click();

        // this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('This event is deleted!', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = false;

  @Output() directionEvent = new EventEmitter<Object>();
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  currentLang = "en";
  options = {
    direction: "ltr",
  };
  activeModelRefCustomer: NgbModalRef;
  activeModelRef: NgbModalRef;
  // dir

  query_start_date: string;
  crew_id: number;
  estimator_id: number;
  currentPathUrl: string;
  projectID: number;
  customerDetail: any;
  calendarsObj: Calendars;
  customers: Array<Customer>;
  projects: Array<Project>;
  users: Array<User>;
  // all_users: Array<User>;
  calendars: Array<Calendars>;
  Events: Array<Calendars>;
  crews: Array<User>;
  eventDetail: Array<any>;
  customer_id: number;
  types_of_appointment: Array<any>;
  project_detail;
  anotherCalendarsObj: Calendars;
  calendarId: number;
  resultID: Number;
  duration: any;
  loading: boolean;

  constructor(
    public _cdr: ChangeDetectorRef,
    public scrollDispatcher: ScrollDispatcher,
    private _adminService: AdminSideService,
    private route: ActivatedRoute,
    public _modelService: NgbModal,
    private datepipe: DatePipe,
    public _sharedService: SharedService,
    private _generalService: GeneralService,
    private modal: NgbModal
  ) {
    // this.calendarsObj.appointment_for.valueChanges.forEach(v => {
    //   console.log("value changes", v);
    //   this.selectedItem = v;
    //   this.itemTrigger = v;
    // });
  }

  ngOnInit() {
    this.iscustomerLoading = false;
    this.isProjectLoading = false;
    this.isAppointmentForLoading = false;
    this.route.params.subscribe((params) => {
      this.projectID = +params["id"]; // (+) converts string 'id' to a number
    });

    // this.query_param_id = this.route.snapshot.queryParams['crewqueryid'] != undefined ? parseInt(this.route.snapshot.queryParams['crewqueryid']) : undefined;

    this.query_param_id =
      this.route.snapshot.queryParams["queryid"] != undefined
        ? parseInt(this.route.snapshot.queryParams["queryid"])
        : undefined;
    this.query_param_date =
      this.route.snapshot.queryParams["querydate"] != undefined
        ? this.route.snapshot.queryParams["querydate"]
        : undefined;

    if (this.query_param_date != undefined) {
      this.viewDate = this.query_param_date;
    }

    this.is_navigated = this.query_param_id != undefined ? true : false;

    this.calendarsObj = new Calendars();
    this.anotherCalendarsObj = new Calendars();
    this.customers = new Array<Customer>();
    this.projects = new Array<Project>();
    this.selectedUsers = new Array<any>();
    this.users = new Array<User>();
    this.crews = new Array<User>();
    this.estimators = new Array<UserAdministration>();
    this.eventDetail = new Array<any>();
    this.meridian = true;
    this.Events = new Array<Calendars>();
    this.types_of_appointment = new Array<any>();
    this.calendars = new Array<Calendars>();
    this.loading = true;
    this.onGetEvents();

    this.query_start_date = "";
    this.duration = [
      { id: 1, value: 0.5 },
      { id: 2, value: 1.0 },
      { id: 3, value: 1.5 },
      { id: 4, value: 2.0 },
      { id: 5, value: 2.5 },
      { id: 6, value: 3.0 },
      { id: 7, value: 3.5 },
      { id: 8, value: 4.0 },
      { id: 9, value: 4.5 },
      { id: 10, value: 5.0 },
      { id: 11, value: 5.5 },
      { id: 12, value: 6.0 },
      { id: 13, value: 6.5 },
      { id: 14, value: 7.0 },
      { id: 15, value: 7.5 },
      { id: 16, value: 8.0 },
      { id: 17, value: 8.5 },
      { id: 18, value: 9.0 },
      { id: 19, value: 9.5 },
      { id: 20, value: 10.0 },
      { id: 21, value: 10.5 },
      { id: 22, value: 11.0 },
      { id: 23, value: 11.5 },
      { id: 24, value: 12.0 },
      { id: 25, value: 12.5 },
      { id: 26, value: 13.0 },
      { id: 27, value: 13.5 },
      { id: 28, value: 14.0 },
    ];

    this.appointmentForTextSearch$.valueChanges.subscribe((value) => {
      if (value != undefined && value.length >= 1) {
        if (this.calendarsObj.appointment_type != undefined) {
          var type: string = this.types_of_appointment.find(
            (item) => item.ObjectTypeID == this.calendarsObj.appointment_type
          ).ObjectName;
          this.isAppointmentForLoading = true;
          this._adminService
            .getProjectSearchByKeyWords(
              value,
              type,
              this._sharedService.userObj.id
            )
            .subscribe((response: any) => {
              this.searchResultLength = response.search_result.length;
              this.searchResult$ = response.search_result;
              this.isAppointmentForLoading = false;
            });
        }
        // else
        // {
        //   this._sharedService.warning('Please select type first')
        // }
      } else {
        return null;
      }
    });
    // project search
    this.projecttSearch$.valueChanges.subscribe((value) => {
      if (
        value != undefined &&
        value.length >= 2 &&
        (this.calendarsObj.appointment_with == undefined ||
          this.projects == undefined)
      ) {
        var type: string = "projects";
        this.isProjectLoading = true;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            type,
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            console.log(response);
            this.projects = response.search_result;
            this.projectsLength = response.search_result.length;

            this.isProjectLoading = false;
          });

        // else
        // {
        //   this._sharedService.warning('Please select type first')
        // }
      } else {
        return null;
      }
    });
    // project search section end
    this.appointmentWithTextSearch$.valueChanges.subscribe((value) => {
      if (value != undefined && value.length == 0) {
        this.calendarsObj.appointment_with = undefined;
        this.calendarsObj.project_for_appointment = undefined;
      }
      if (value != undefined && value.length >= 1) {
        this.iscustomerLoading = true;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "customers",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.customersSearchResult$ = response.search_result;
            this.customerssearchResultLength = response.search_result.length;
            this.iscustomerLoading = false;
          });

        // else
        // {
        //   this._sharedService.warning('Please select type first')
        // }
      } else {
        return null;
      }
    });
  }

  // ngAfterViewInit(): void {

  //   this.scrollDispatcher.scrolled().pipe(filter(event => this.virtualScroll.getRenderedRange().end === this.virtualScroll.getDataLength())
  //   ).subscribe(event => {

  //      if(this.loading == true){debugger;
  //       this.onGetEvents();
  //       this.loading = false;
  //     }

  //      setTimeout( ()=> { this.loading = true; }, 500);

  //   })

  //   this.scrollDispatcher.scrolled()
  //     .subscribe(event => {
  //       if (this.loading == true) {
  //         this.onGetEvents();
  //         this.loading = false;
  //       }
  //       setTimeout(() => { this.loading = true; }, 500);
  //       console.log('scrolled');
  //     });

  // }

  // openChange($event: boolean) {
  //   console.log("open change", $event);
  //   if ($event) {
  //     this.cdkVirtualScrollViewPort.scrollToIndex(0 );
  //     this.cdkVirtualScrollViewPort.checkViewportSize();
  //   } else {
  //   }
  // }

  // onSelectionChange(change: MatOptionSelectionChange) {
  //   if (change.isUserInput) {
  //     console.log("onSelectionChange", change.source.value);
  //     this.selectedItem = change.source.value;
  //   }
  // }

  onGetDataForEstimatorAppointment(id: number) {
    this._generalService.getDataForEstimatorAppointment(id).subscribe(
      (res: any) => {
        this.anotherCalendarsObj = res.appointment_data[0];
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  formatter = (result: any) => {
    var result = result;

    var idx = -1;
    if (result != undefined && result.id != undefined) {
      idx = this.customers.findIndex((item) => item.id == result.id);
    } else {
      idx = this.customers.findIndex((item) => item.id == result);
    }
    if (idx > -1) {
      this.isCustomerIDset = 1;
      return (
        this.customers[idx].first_name +
        " " +
        this.customers[idx].last_name +
        " (" +
        this.customers[idx].id +
        ")"
      );
    } else {
      result = 0;
      return "";
    }
  };

  public onChange(event): void {
    this.appointmentForID = event.value;
    console.log("value changes", this.appointmentForID);
    this.selectedItem = this.appointmentForID;
    // this.itemTrigger = this.appointmentForID;
  }

  onSelectAllUsers() {
    debugger;
    // this.appointmentForName = undefined;
    // this.calendarsObj.appointment_for = undefined;
    this.isSelectAll = true;
    this.userID = undefined;
    // this.appointmentType = undefined;
    // this.appointment_for = undefined;
    // this.projectNumber = undefined;

    this.events = new Array<CalendarEvent>();

    if (this.Events != undefined && this.Events.length > 0) {
      // if (this.projectID > 0 && (this.crew_id != undefined || this.estimator_id != undefined)) {
      //   this.Events.filter(item => item.manage_calendar_id == this.calendarId)
      //     .filter(item2 => item2.appointment_for == this.estimator_id)
      //     .filter(item3 => item3.appointment_for == this.crew_id)
      //     .filter(item4 => item4.project_for_appointment == this.projectID).forEach(element => {
      //       this.viewDate = new Date(element.start_date);
      //       this.addEvent(element);
      //     });
      // }
      // if (this.projectID <= 0) {
      //   this.Events.filter(item => item.manage_calendar_id == this.calendarId).forEach(element => {
      //     this.viewDate = new Date(element.start_date);
      //     this.addEvent(element);
      //   });
      // }

      this.Events.forEach((element) => {
        // this.viewDate = new Date(element.start_date);
        this.addEvent(element);
      });
    }
    this.refresh.next();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.customers
              .filter(
                (v) =>
                  v.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  sendOptions() {
    this.directionEvent.emit(this.options);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      // if (
      //   (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      //   events.length === 0
      // ) {
      //   this.activeDayIsOpen = false;
      // } else {
      this.activeDayIsOpen = false;
      this.view = "day";
      this.viewDate = date;
      // }
    }
  }

  // onChangeAppointmentType() {
  //   // this.appointmentForTextSearch$.setValue("");
  //   // this.appointmentWithTextSearch$.setValue("");
  // }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent("Dropped or resized", event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  openBookAppointment(modal: any) {
    debugger;
    this.customer_id = undefined;
    this.customerName = undefined;
    this.searchResult$ = undefined;
    this.customersSearchResult$ = undefined;
    this.projects = undefined;
    this.calendarsObj = new Calendars();

    if (this.appointmentType != undefined) {
      this.calendarsObj.appointment_for = this.appointment_for;
      this.calendarsObj.appointment_for_name = this.appointmentForName;
    }
    if (this.isSelectAll == true) {
      this.calendarsObj.appointment_for = null;
      this.calendarsObj.appointment_for_name = null;
      this.appointmentForName = undefined;
      // this.appointmentForTextSearch$.reset();

      this.projectNumber = undefined;
      this.appointmentForTextSearch$.setValue("");
      this.projecttSearch$.setValue("");
    }

    // this.calendarsObj.role_id = this._sharedService.calendarId;
    this.activeModelRef = this.modal.open(modal, {
      centered: true,
      size: "xl",
    });
  }

  openUpdateBookAppointment(modal: any) {
    this.customer_id = this.calendarsObj.appointment_with;
    this.activeModelRef = this.modal.open(modal, {
      centered: true,
      size: "xl",
    });
    console.log("function called");
  }
  openAppointmentModel(modal: any) {
    this.customer_id = undefined;
    this.activeModelRefCustomer = this.modal.open(modal);
  }

  openViewAppointment(modal: any) {
    this.customer_id = undefined;
    var id = this.delEventId;
    console.log(id);
    this._generalService.viewAppointmentDetails(id).subscribe(
      (res: any) => {
        this.eventDetail = res.event_detail[0];
        console.log(JSON.stringify(this.eventDetail));
        this.activeModelRef = this.modal.open(modal, {
          centered: true,
          size: "xl",
        });
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  OnAddNewEvent(date: Date) {
    this.appointmentForTextSearch$.setValue("");
    this.appointmentWithTextSearch$.setValue("");

    this.calendarsObj = new Calendars();

    // this.calendarsObj.start_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    // this.calendarsObj.start_time = this.datepipe.transform(date,'h:mm');
    // this.calendarsObj = this.anotherCalendarsObj;

    this.calendarsObj.start_date = this.datepipe.transform(date, "yyyy-MM-dd");

    this.calendarsObj.start_time = this.datepipe.transform(date, "hh:mm");

    // this.calendarsObj.start_time = date.getUTCHours() + ":" + (date.getMinutes() == 0 ? (date.getMinutes() + '0') : date.getMinutes());
    // this.calendarsObj.end_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    // var splitTime,
    //   [splitTimeHour, splitTimeMinute] = this.calendarsObj.start_time.split(':');
    // this.calendarsObj.duration = +splitTimeHour + +splitTimeMinute;
    // if (this.duration != undefined && this.duration.length > 0) {
    //   this.duration.forEach(element => {
    //     if (+element.ObjectName == this.calendarsObj.duration) {
    //        element.ObjectName = this.calendarsObj.duration.toString();
    //     }
    //   });
    //    this.duration[3].ObjectTypeID = 3;
    // }

    if (this.query_param_id > -1) {
      this.calendarsObj.appointment_for = this._sharedService.selectedCrewId;
    }
    document.getElementById("CreateModelBtn").click();
  }

  onCreateEvent() {
    if (
      (this.calendarsObj.project_for_appointment != undefined ||
        this.calendarsObj.appointment_type == 82 ||
        this.calendarsObj.appointment_type == 83 ||
        this.calendarsObj.appointment_type == 84 ||
        this.calendarsObj.appointment_type == 85) &&
      (this.calendarsObj.appointment_with != undefined ||
        this.calendarsObj.appointment_type == 85) &&
      this.calendarsObj.appointment_for != undefined
    ) {
      if (this.calendarsObj.end_date < this.calendarsObj.start_date) {
        this.calendarsObj.end_date = this.calendarsObj.start_date;
      }

      // this.calendarsObj.appointment_with = this.calendarsObj.appointment_with_obj != undefined ? this.calendarsObj.appointment_with_obj.id : undefined;
      this.calendarsObj.manage_calendar_id = this.calendarId;

      if (
        this.calendarsObj.duration != undefined &&
        this.calendarsObj.start_time != undefined
      ) {
        debugger;
        var t = new Date(
          this.datepipe.transform(this.calendarsObj.start_date, "yyyy-MM-dd") +
            this.calendarsObj.start_time
        ).getTime();
        this.calendarsObj.end_time = new Date(
          new Date(
            this.datepipe.transform(
              this.calendarsObj.start_date,
              "yyyy-MM-dd"
            ) +
              " " +
              this.calendarsObj.start_time
          ).getTime() +
            this.calendarsObj.duration * 60000 * 60
        ).toLocaleTimeString("en-UK", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }

      if (this.calendarsObj.end_time == undefined) {
        this.onChangeDuration();
      }
      console.log(this.calendarsObj);
      this._generalService.createEvent(this.calendarsObj).subscribe(
        (res: any) => {
          this.activeModelRef.close();
          this.calendarsObj.id = res.id;

          this.Events.push(this.calendarsObj);
          this.FilterSelectedName(this.calendarsObj.appointment_for);

          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
    }
  }

  onselectCrewLeader(event) {
    this.isSelectAll = true;
    this.onSelectAllUsers();
  }

  onSelectAll() {
    if (this.Events != undefined && this.Events.length > 0) {
      this.Events.forEach((element) => {
        this.addEvent(element);
      });
    }
    this.refresh.next();
  }

  onclickSelectedName(id: number) {
    debugger;
    let user = this.users.filter((user) => user.id == id);
    if (user[0] != undefined) {
      this.projectNumber = undefined;
      this.appointmentForName = user[0].first_name + " " + user[0].last_name;
      this.appointment_for = id;

      this.appointmentType = 1;
    }

    // && item.manage_calendar_id == this.calendarId
    this.FilterSelectedName(id);
  }
  FilterSelectedName(id: number) {
    debugger;
    this.isSelectAll = false;
    this.userID = id;
    var filteredEvents = this.Events.filter(
      (item) =>
        item.appointment_for == id ||
        (this.calendarId == undefined && this.is_navigated == true) ||
        (item.manage_calendar_id == null && this.is_navigated == true)
    );

    this.events = new Array<CalendarEvent>();

    if (filteredEvents != undefined) {
      filteredEvents.forEach((element) => {
        this.addEvent(element);
      });
    }

    this.refresh.next();
  }

  onGetAssignedAppointments() {
    if (this.projectID > 0) {
      if (this.projects != undefined && this.projects.length > 0) {
        this.projects
          .filter((item20) => item20.id == this.projectID)
          .forEach((element1) => {
            this.estimators_id = element1.estimator_id;
            this.crews_id = element1.crew_id;
          });
        this.Events.filter(
          (item2) =>
            item2.appointment_for == this.estimators_id ||
            item2.appointment_for == this.crews_id
        ).forEach((element) => {
          this.viewDate = new Date(element.start_date);
          this.addEvent(element);
        });
      }
    }
  }

  onEditEvent() {
    if (
      (this.calendarsObj.project_for_appointment != undefined ||
        this.calendarsObj.appointment_type == 82 ||
        this.calendarsObj.appointment_type == 83 ||
        this.calendarsObj.appointment_type == 84 ||
        this.calendarsObj.appointment_type == 85) &&
      (this.calendarsObj.appointment_with != undefined ||
        this.calendarsObj.appointment_type == 85) &&
      this.calendarsObj.appointment_for != undefined
    ) {
      if (this.calendarsObj.end_date < this.calendarsObj.start_date) {
        this.calendarsObj.end_date = this.calendarsObj.start_date;
      }

      // this.calendarsObj.appointment_with = this.calendarsObj.appointment_with_obj != undefined ? this.calendarsObj.appointment_with_obj.id : undefined;

      if (this.calendarsObj.end_time == undefined) {
        this.onChangeDuration();
      }

      if (
        this.calendarsObj.end_time == undefined &&
        this.calendarsObj.duration == undefined
      ) {
        this.calendarsObj.end_time = this.calendarsObj.start_time;
      }

      this._generalService.editEvent(this.calendarsObj).subscribe(
        (res: any) => {
          this.activeModelRef.close();
          this.customer_id = undefined;
          var index = this.events.findIndex(
            (item) => item.id == this.calendarsObj.id
          );
          this.events.splice(index, 1);
          // this.Events.push(this.calendarsObj);
          this.FilterSelectedName(this.calendarsObj.appointment_for);

          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
    }
  }

  onGetEvent(id: number) {
    this._generalService.getEvent(id).subscribe(
      (res: any) => {
        // this.calendarsObj = res.event[0];
        this.projects = res.projects;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetProjectsOfCustomers() {
    if (this.calendarsObj.appointment_with != undefined) {
      debugger;
      this.customer_id = +this.calendarsObj.appointment_with;
      this._adminService.getProjectsOfCustomers(this.customer_id).subscribe(
        (res: any) => {
          this.projects = res.projects;
          this.projectsLength = res.projects.length;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
    }
  }

  onGetMonthlyEvents() {
    debugger;

    this.query_start_date = this.datepipe.transform(
      this.viewDate,
      "yyyy-MM-dd"
    );
    console.log("Date to query on : " + this.query_start_date);
    console.log("Old Date to query on : " + this.viewDate);

    this._adminService
      .getMonthlyEvents(
        this.query_start_date,
        this.view,
        this._sharedService.userObj.id
      )
      .subscribe(
        (res: any) => {
          this.Events = res.events;
          this.projects = res.projects;

          this.userID =
            this.Events != undefined && this.Events.length > 0
              ? this.Events[0].appointment_for
              : undefined;
          if (this.is_navigated == false) {
            this.onSelectAllUsers();
          } else {
            this.onclickSelectedName(this.userID);
          }
        },
        (error) => {
          this._sharedService.error(error);
        }
      );

    // this.viewDate
  }

  onGetEvents() {
    this._generalService
      .getEvents(
        this.query_param_id != undefined
          ? this.query_param_id
          : this._sharedService.userObj.id
      )
      .subscribe(
        (res: any) => {
          this.is_navigated = res.is_exists == 1 ? false : true;

          // this.onSelectAllUsers();

          // this.Events = res.events;
          this.calendars = res.calendars;

          this.calendarId =
            this.calendars != undefined && this.calendars.length > 0
              ? this.calendars[0].id
              : undefined;

          this.onGetMonthlyEvents();
          // this.userID = (this.Events != undefined && this.Events.length > 0) ? this.Events[0].appointment_for : undefined;
          // if (this.is_navigated == false) {
          //   this.onSelectAllUsers();
          // }
          // else {
          //   this.onclickSelectedName(this.userID);
          // }

          this.crews = res.crews;
          this.estimators = res.estimators;

          if (
            res.type_of_estimate != undefined ||
            res.type_of_estimate != null
          ) {
            this.types_of_appointment = res.type_of_estimate;
          }

          this.users = res.users;
          this.customers = res.customers;

          // this.projects = res.projects;

          this.refresh.next();
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  addEvent(calendarsObj: Calendars): void {
    if (calendarsObj != undefined || calendarsObj != null) {
      var startTimeInString = calendarsObj.start_time,
        [startTimeHours, startTimeMinutes] = startTimeInString.split(":");
      if (
        calendarsObj.end_time != undefined &&
        (calendarsObj.end_time != null ||
          calendarsObj.end_time != "" ||
          calendarsObj.end_time > calendarsObj.start_time)
      ) {
        var endTimeInString = calendarsObj.end_time,
          [endTimeHours, endTimeMinutes] = endTimeInString.split(":");
      }
    }

    this.newEvent = {
      // start: setHours(setMinutes(new Date(calendarsObj.start_date), +startTimeMinutes), +startTimeHours),
      // end: setHours(setMinutes(new Date(calendarsObj.end_date), +endTimeMinutes), +endTimeHours),

      start: setHours(
        setMinutes(new Date(calendarsObj.start_date), +startTimeMinutes),
        +startTimeHours
      ),
      end: setHours(
        setMinutes(new Date(calendarsObj.end_date), +endTimeMinutes),
        +endTimeHours
      ),

      title: calendarsObj.display_text,
      color: colors.red,
      draggable: false,
      id: calendarsObj.id,
      meta: {
        user: this.calendarsObj.appointment_for,
      },
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      actions: this.actions,
    };

    this.events.push(this.newEvent);

    this.handleEvent("Add new event", this.newEvent);
    this.refresh.next();
  }

  onDeleteEvent() {
    this._generalService.deleteEvent(this.delEventId).subscribe(
      (res: any) => {
        var index = this.events.findIndex((item) => item.id == this.delEventId);
        var index2 = this.Events.findIndex(
          (item) => item.id == this.delEventId
        );
        this.events.splice(index, 1);
        this.Events.splice(index2, 1);
        this.refresh.next();
        this.activeModelRefCustomer.close();

        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetDataFromProject(id: number) {
    this._generalService.getdataFromProject(id).subscribe(
      (res: any) => {
        this.project_detail = res.project_detail;
        if (res.project_detail != undefined && res.project_detail.length > 0) {
          this.calendarsObj.appointment_with =
            res.project_detail[0].customer_name;
        }
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  setCustomerID() {
    this.calendarsObj.appointment_with =
      this.calendarsObj.appointment_with_obj.id;
    // if (this.projectID > 0 && this.crew_id != undefined || this.estimator_id != undefined) {
    // }
  }

  onChangeDuration() {
    if (
      this.calendarsObj.start_time != undefined &&
      this.calendarsObj.duration != undefined
    ) {
      this.calendarsObj.end_time = new Date(
        new Date("1970/01/01 " + this.calendarsObj.start_time).getTime() +
          this.calendarsObj.duration * 60000 * 60
      ).toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  }

  setSubProjectFlag(id: number) {
    this.project = this.projects.find((item) => item.id == id);
    if (this.project != undefined) {
      this.calendarsObj.is_sub_project = this.project.is_sub_project;
      this.calendarsObj.sub_project_id = id;
    }
  }

  optionClicked(type: string, user) {
    if (type == "user") {
      this.calendarsObj.appointment_for = user.id;
      this.calendarsObj.appointment_for_name =
        user.first_name + " " + user.last_name;
    } else {
      this.calendarsObj.appointment_with = user.id;
      this.calendarsObj.appointment_with_name =
        user.first_name + " " + user.last_name;
    }
    console.log(this.calendarsObj);
  }
  projectClicked(project: Project) {
    debugger;
    let customerName = this.customerName;
    let appointmentWith = this.calendarsObj.appointment_with;
    this.customerName = project.customer_name;
    this.calendarsObj.project_for_appointment = project.project_number;
    this.calendarsObj.appointment_with = project.customer_id;
    this.calendarsObj.appointment_with_name = project.customer_name;
    if (appointmentWith != undefined) {
      this.customerName = customerName;
      this.calendarsObj.appointment_with = appointmentWith;
      this.calendarsObj.appointment_with_name = customerName;
    }
  }

  ngOnDestroy() {}
}

//Calendar event handler ends
