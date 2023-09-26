import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { SharedService } from './services/shared.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { CustomHttpService } from './services/custom-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'JP-UI';
  showLoadingIndextor: boolean = true;


  constructor(public _route: Router, public _router: ActivatedRoute, private router: Router, 
    public _sharedService: SharedService, public bnIdle: BnNgIdleService, public _customHttpService: CustomHttpService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.showLoadingIndextor = true;
      }
      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.showLoadingIndextor = false;
      }
    })
  }

  ngOnInit() {


    // Broad cast that your're opening a page.
    localStorage.openpages = Date.now();
    var onLocalStorageEvent = function (e) {
      if (e.key == "openpages") {
        // Listen if anybody else opening the same page!
        localStorage.page_available = Date.now();
      }
      if (e.key == "page_available") {
        if (this._sharedService != undefined && this._sharedService.userObj == undefined) {
          this._customHttpService.signout();
        }
      }
    };


    window.addEventListener('storage', onLocalStorageEvent, false);


    this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
      // if (res) {
      // }

      if (isTimedOut == true) {
        
        if (this._sharedService.userObj != undefined) {//if user is logged in
          // localStorage.clear();

          this._customHttpService.signout();
          // window.location.replace('http://jp.privacyforyou.online/login')
        }
      }

    });

    setTimeout(() => {
      this.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
      this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDCcZaXEm1wVa2MJ9VRSPC--UvHMc50K3s&sensor=false');
      this.loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js');
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js');
      this.loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
    }, 3000)

  }

  @HostListener('window:offline', ['$event']) onOffline() {
    this._sharedService.loading = false;
    this._sharedService.warning("Internet connection lost");
  }

  @HostListener('window:online', ['$event']) onOnline() {
    this._sharedService.success("Internet connection restored.");
  }

  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}

