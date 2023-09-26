import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PhoneCall } from "src/app/models/phone-call.model";
import { GeneralService } from "src/app/services/general.service";
import { SharedService } from "src/app/services/shared.service";
import { PhoneCallsDetail } from "src/app/models/phone-calls-detail.model";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-phone-calls",
  templateUrl: "./phone-calls.component.html",
  styleUrls: ["./phone-calls.component.css"],
})
export class PhoneCallsComponent implements OnInit {
  current_date_number: number;
  pcurrent_date: string;
  isLinear = false;
  activetedMOdalRef: NgbModalRef;
  phoneCallObj: PhoneCall;
  isHideFields: Boolean = false;
  phoneCallsDetailObj: PhoneCallsDetail;
  isCallCompleted: boolean = false;
  phoneCallDetails: Array<PhoneCall>;
  phoneCallsId: number;
  estimatorDetail: any;
  phoneCallsFilterID: number;
  currentUserID: number;
  phoneNumber: string;
  phoneCallLogs: Array<string>;
  phoneCallsArray: Array<any>;
  callfilterNames: Array<Object>;
  callStatusNames: Array<Object>;
  scheduled_calls_id: number;
  p: number;
  customer_id: number;
  CurrentPageNo: number;
  PreviousPageNo: number;
  firstCallId: number;
  lastCallId: number;
  total: number;

  constructor(
    public route: ActivatedRoute,
    public datepipe: DatePipe,
    public _modalService: NgbModal,
    public _generalService: GeneralService,
    public _sharedService: SharedService,
    private _router: Router
  ) {}

  ngOnInit() {
    debugger;

    this.customer_id = 0;
    this.loadScript("https://media.twiliocdn.com/sdk/js/client/v1.7/twilio.js");
    this.loadScript("//media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js");
    this.loadScript("//media.twiliocdn.com/sdk/js/client/v1.3/twilio.min.js");
    this.phoneCallObj = new PhoneCall();
    this.phoneCallsDetailObj = new PhoneCallsDetail();
    // this.getScheduledPhoneCalls();
    // this.getScheduledPhoneCallsMeta();
    this.phoneCallDetails = new Array<PhoneCall>();
    this.callfilterNames = new Array<Object>();
    this.callStatusNames = new Array<Object>();
    this.phoneCallLogs = new Array<string>();
    this.current_date_number = Date.now();
    this.pcurrent_date = this.datepipe.transform(
      this.current_date_number,
      "yyyy-MM-dd"
    );
    this.phoneCallsFilterID = 75;
    this.phoneCallObj.filter_id = 75;
    // this.scheduled_calls_id = 70;
    //pagination  data
    this.CurrentPageNo = 1;
    this.PreviousPageNo = 1;
    // this.loading = true;
    this.firstCallId = 0;
    this.lastCallId = 0;
    this.onGetPhoneCallsFilterTypes();
    this.onChange(event, this.phoneCallsFilterID);
  }

  // start
  getScheduledPhoneCalls() {
    this._generalService.getScheduledPhoneCalls().subscribe(
      (res: any) => {
        this.phoneCallDetails = res.phone_call_details;
        this.phoneCallLogs = res.callLogs;
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  public onChange(event?, idx?): void {
    debugger;

    if (event != undefined) {
      if (event.value == undefined && idx != undefined) {
        this.phoneCallsFilterID = idx;
      } else {
        this.phoneCallsFilterID = event.value;
      }
    }

    var id = localStorage.getItem("loggedInUserID");
    this.currentUserID = +id;
    this._generalService
      .getPhoneCallsFilterResults(
        this.currentUserID,
        this.phoneCallsFilterID,
        this.CurrentPageNo
      )
      .subscribe(
        (res: any) => {
          this.phoneCallDetails = res.phone_calls;
          this.total = res.count;
          if (this.phoneCallsFilterID == 68) {
          } else if (this.phoneCallsFilterID == 69) {
            this.isHideFields = false;
          } else if (this.phoneCallsFilterID === 75) {
            this.isHideFields = false;
          } else if (this.phoneCallsFilterID === 76) {
            this.isHideFields = true;
          } else if (this.phoneCallsFilterID === 77) {
            this.isHideFields = true;
          } else if (this.phoneCallsFilterID == 1) {
            this._router.navigate(["/calls/search"]);
          } else if (this.phoneCallsFilterID == 2) {
            this._router.navigate(["/calls/search-unscheduled"]);
          } else if (this.phoneCallsFilterID == 3) {
            // let navigationExtras: NavigationExtras = {
            //   queryParams: { 'current_date': this.current_date },
            // };
            this._router.navigate(
              ["/customer/customer-interection/view" + "/" + this.customer_id],
              { queryParams: { pcurrent_date: this.pcurrent_date } }
            );
          }
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  getScheduledPhoneCallsMeta() {
    this._generalService.getCustomerEstimatorsMeta().subscribe(
      (res: any) => {
        this.estimatorDetail = res.estimator_name;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetPhoneCallsFilterTypes() {
    this._generalService.getPhoneCallsFilterTypes().subscribe(
      (res: any) => {
        this.callfilterNames = res.phone_calls_select_filter;
        this.callStatusNames = res.phone_calls_status_filter;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  DeleteScheduledPhoneCall(id: number) {
    this.activetedMOdalRef.close();
    this._generalService
      .deleteScheduledPhoneCall(this.phoneCallsId)
      .subscribe((res: any) => {
        this.p = 1;
        // this.ngOnInit();
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  openDialMyPhoneCallsModal(modal: any, phoneCall_id: number) {
    this.phoneCallsId = phoneCall_id;
    this.phoneCallDetails.forEach((element) => {
      if (this.phoneCallsId == element.id) {
        this.phoneNumber = element.phone_number;
      }
    });
    this.activetedMOdalRef = this._modalService.open(modal);
  }

  openDeleteScheduledPhoneCallsModal(modal: any, phone_call_id: number) {
    this.phoneCallsId = phone_call_id;
    this.activetedMOdalRef = this._modalService.open(modal);
  }

  onCallCustomer(phoneNumber: string) {
    $(function () {
      var device;

      // http://localhost/jp-api/public/api/
      // https://jpapi.belatent.com/public/api/phone_call/capability_token
      $.getJSON(environment.API_URL + "phone_call/capability_token")
        .then(function (data) {
          const Device = require("twilio-client").Device;
          device = new Device(data.CapabilityToken, {
            codecPreferences: ["opus", "pcmu"],
            fakeLocalDTMF: true,
          });

          device.on("ready", function (device) {
            log("Twilio.Device Ready!");
          });

          device.on("offline", function (device) {
            log("Twilio.Device Offline!");
          });

          device.on("busy", function (device) {
            log("Twilio.Device Busy!");
          });

          device.on("error", function (error) {
            log("Twilio.Device Error: " + error.message);
          });

          device.on("connect", function (conn) {
            log("Successfully established call!");
            document.getElementById("button-call").style.display = "none";
            document.getElementById("button-hangup").style.display = "inline";
          });

          //working on disconnect
          device.on("disconnect", function (conn) {
            log("Call ended.");
            document.getElementById("button-call").style.display = "inline";
            document.getElementById("button-hangup").style.display = "none";
          });

          device.on("incoming", function (conn) {
            log("Incoming connection from " + conn.parameters.From);
            var archEnemyPhoneNumber = "+12093373517";
            if (conn.parameters.From === archEnemyPhoneNumber) {
              conn.reject();
              log("It's your nemesis. Rejected call.");
            } else {
              conn.accept();
            }
          });
          setClientNameUI(data.identity);
        })

        .catch(function (err) {
          log("Waiting for Device!");
        });

      document.getElementById("button-call").onclick = function () {
        var inputElement: HTMLInputElement = document.getElementById(
          "phone-number"
        ) as HTMLInputElement;
        var inputValue: string = inputElement.value;
        phoneNumber = inputValue;
        var params = {
          To: phoneNumber,
        };
        if (device) {
          device.connect(params);
        }
      };

      document.getElementById("button-hangup").onclick = function () {
        log("Hanging up...");
        if (device) {
          device.disconnectAll();
        }
      };

      function log(message) {
        var logDiv = document.getElementById("log");
        logDiv.innerHTML += "<p>&gt;&nbsp;" + message + "</p>";
        logDiv.scrollTop = logDiv.scrollHeight;
      }

      function setClientNameUI(clientName) {
        var div = document.getElementById("client-name");
        div.innerHTML = "Your client name: <strong>" + clientName + "</strong>";
      }
    });
  }

  onCreatePhoneCallsDetail() {
    debugger;
    this.phoneCallsDetailObj.phone_call_id = this.phoneCallsId;
    this._generalService.phoneCallsDetail(this.phoneCallsDetailObj).subscribe(
      (res: any) => {
        var index = this.phoneCallDetails.findIndex(
          (item) => item.id == this.phoneCallsDetailObj.phone_call_id
        );
        this.phoneCallDetails.splice(index, 1);
        this.DeleteScheduledPhoneCall(this.phoneCallsDetailObj.phone_call_id);
        this.activetedMOdalRef.close();
        this.phoneCallsFilterID = 76;
        // this.scheduled_calls_id = 70;
        this.onChange(event, this.phoneCallsFilterID);
        this.phoneCallObj.filter_id = 76;
        this._router.navigate["/calls"];
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement("script");
    script.innerHTML = "";
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
