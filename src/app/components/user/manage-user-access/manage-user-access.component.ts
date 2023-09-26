import { Component, OnInit } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
import { GeneralService } from "src/app/services/general.service";
import { UserManageAccess } from "src/app/models/user-manage-access.model";
import { AuthorizeCity } from "src/app/models/authorize-city.model";
import { AuthorizeZipCode } from "src/app/models/authorize-zip-code.model";
import { FormControl } from "@angular/forms";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-manage-user-access",
  templateUrl: "./manage-user-access.component.html",
  styleUrls: ["./manage-user-access.component.css"],
})
export class ManageUserAccessComponent implements OnInit {
  activeModelRef: NgbModalRef;
  estimatorsDetails: Array<any>;
  authorizedCityDetails: Array<any>;
  authorizedZipCodeDetails: Array<any>;
  estimator_id: number;
  Authorized_City_Id: number;
  Authorized_Zip_Code_Id: number;
  estimator_ID: number;
  citiesDetails: Array<any>;
  cities = new FormControl();
  // UserManageAccessObj: UserManageAccess;
  authorizeCityObj: AuthorizeCity;
  authorizeZipCodeObj: AuthorizeZipCode;

  constructor(
    public _modelService: NgbModal,
    public _sharedService: SharedService,
    private _generalService: GeneralService
  ) {}

  ngOnInit() {
    this.onGetUserManageAccessMeta();
    // this.UserManageAccessObj = new UserManageAccess();
    this.authorizeCityObj = new AuthorizeCity();
    this.authorizeZipCodeObj = new AuthorizeZipCode();
    this.authorizedCityDetails = new Array<any>();
    this.authorizedZipCodeDetails = new Array<any>();

    // this.UserManageAccessObj.authorizeCityArray = new Array<AuthorizeCity>();
    // this.UserManageAccessObj.authorizeZipCodeArray = new Array<AuthorizeZipCode>();
  }

  onGetUserManageAccessMeta() {
    this._generalService.getUserManageAccessMeta().subscribe(
      (res: any) => {
        this.estimatorsDetails = res.estimators;
        this.citiesDetails = res.cities;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  // onCreateUserManageAccessMeta() {
  //
  //   this._generalService.createUserManageAccess(this.UserManageAccessObj).subscribe((res: any) => {
  //
  //     this._sharedService.success(res.success);
  //   },
  //     error => {
  //       this._sharedService.error(error);
  //
  //     })
  // }

  addAuthorizeCityValue() {
    // this.UserManageAccessObj.authorizeCityArray = new Array<AuthorizeCity>();
    // this.UserManageAccessObj.authorizeCityArray.push(this.authorizeCityObj);
    // this.authorizeCityObj.user_manage_access_id = +this.UserManageAccessObj.estimator_id;
    // this.authorizeCityObj = new AuthorizeCity();

    this.authorizeCityObj.estimator_id = this.estimator_ID;
    this._generalService.saveAuthorizeCity(this.authorizeCityObj).subscribe(
      (res: any) => {
        this.estimator_ID = +res.authorizecity.estimator_id;
        this.getCitiesandZipCodesData(this.estimator_ID);

        this.authorizeCityObj.city_id = null;
        this.authorizeCityObj.id = res.city_id;
        this.Authorized_City_Id = this.authorizeCityObj.id;

        var index = this.estimatorsDetails.findIndex(
          (item) => item.id == this.authorizeCityObj.estimator_id
        );
        if (index > -1) {
          this.authorizeCityObj.estimator_name =
            this.estimatorsDetails[index].name;
        }

        var index2 = this.citiesDetails.findIndex(
          (item) => item.id == this.authorizeCityObj.city_id
        );
        if (index2 > -1) {
          this.authorizeCityObj.authorized_city_name =
            this.citiesDetails[index2].name;
        }
        if (this.authorizedCityDetails == undefined) {
          this.authorizedCityDetails = new Array<any>();
        }
        this.authorizedCityDetails.push(this.authorizeCityObj);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  addAuthorizeZipCodeValue() {
    // this.UserManageAccessObj.authorizeZipCodeArray = new Array<AuthorizeZipCode>();
    // this.UserManageAccessObj.authorizeZipCodeArray.push(this.authorizeZipCodeObj);
    // this.authorizeZipCodeObj.user_manage_access_id = +this.UserManageAccessObj.estimator_id;
    // this.authorizeZipCodeObj = new AuthorizeZipCode();

    this.authorizeZipCodeObj.estimator_id = this.estimator_ID;
    this._generalService
      .saveAuthorizeZipCode(this.authorizeZipCodeObj)
      .subscribe(
        (res: any) => {
          this.getCitiesandZipCodesData(this.estimator_ID);
          this.authorizeZipCodeObj.zip_code = "";

          this.authorizeZipCodeObj.id = res.zip_code_id;
          this.Authorized_Zip_Code_Id = this.authorizeZipCodeObj.id;

          // this.authorizeZipCodeObj.id = res.authorizezipcode.id;
          this.authorizeZipCodeObj.authorized_zip_code =
            this.authorizeZipCodeObj.zip_code;
          var index = this.estimatorsDetails.findIndex(
            (item) => item.id == this.authorizeZipCodeObj.estimator_id
          );
          if (index > -1) {
            this.authorizeZipCodeObj.estimator_name =
              this.estimatorsDetails[index].name;
          }
          if (this.authorizedZipCodeDetails == undefined) {
            this.authorizedZipCodeDetails = new Array<any>();
          }
          this.authorizedZipCodeDetails.push(this.authorizeZipCodeObj);
          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error.error);
        }
      );
  }

  public onChange(event): void {
    this.estimator_id = event.value;
    this._generalService.getUserAuthorizationMeta(this.estimator_id).subscribe(
      (res: any) => {
        this.authorizedCityDetails = res.authorized_city_details;
        this.authorizedZipCodeDetails = res.authorized_zip_code_details;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  getCitiesandZipCodesData(id: number) {
    this._generalService.getUserAuthorizationMeta(this.estimator_id).subscribe(
      (res: any) => {
        this.authorizedCityDetails = res.authorized_city_details;
        this.authorizedZipCodeDetails = res.authorized_zip_code_details;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onDeleteAuthorizedCity() {
    this._generalService
      .deleteAuthorizedCity(this.Authorized_City_Id)
      .subscribe(
        (res: any) => {
          this.activeModelRef.close();
          var index = this.authorizedCityDetails.findIndex(
            (item) => item.authorized_city_id == this.Authorized_City_Id
          );
          if (index > -1) {
            this.authorizedCityDetails.splice(index, 1);
          }
          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onDeleteAuthorizedZipCode() {
    this._generalService
      .deleteAuthorizedZipCode(this.Authorized_Zip_Code_Id)
      .subscribe(
        (res: any) => {
          this.activeModelRef.close();
          var index = this.authorizedZipCodeDetails.findIndex(
            (item) => item.authorized_zip_code_id == this.Authorized_Zip_Code_Id
          );
          if (index > -1) {
            this.authorizedZipCodeDetails.splice(index, 1);
          }
          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  openManageAccessCityDeleteModel(modal: any, cityId: number) {
    if (cityId == null) {
      cityId = this.authorizeCityObj.id;
      var index = this.authorizedCityDetails.findIndex(
        (item) => item.id == cityId
      );
      if (index > -1) {
        this.authorizedCityDetails.splice(index, 1);
      }
    }
    this.Authorized_City_Id = cityId;
    this.activeModelRef = this._modelService.open(modal);
  }

  openManageAccessZipCodeDeleteModel(modal: any, zipCodeId: number) {
    if (zipCodeId == null) {
      zipCodeId = this.authorizeZipCodeObj.id;
      var index = this.authorizedZipCodeDetails.findIndex(
        (item) => item.id == zipCodeId
      );
      if (index > -1) {
        this.authorizedZipCodeDetails.splice(index, 1);
      }
    }
    this.Authorized_Zip_Code_Id = zipCodeId;
    this.activeModelRef = this._modelService.open(modal);
  }
}
