import { AdminGuardGuard } from './guards/admin-guard.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { SimpleLayoutComponent } from "./containers/simple-layout/simple-layout.component";
import { FullLayoutComponent } from "./containers/full-layout/full-layout.component";
import { CanActivateAuthGuard } from './guards/can-activate-auth-guard';

const appRoutes: Routes = [

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },

  {
    path: "login",
    component: SimpleLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule)
      }
    ]
  },

  {
    path: "",
    component: FullLayoutComponent,

    // canActivate: [
    //   CanActivateAuthGuard
    // ],

    children: [
      {
        path: "home/app",
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
        canActivate: [CanActivateAuthGuard]
      },

      {
        path: "admin",
        loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuardGuard]
      },

      {
        path: "customer",
        loadChildren: () => import('./components/customers/customers.module').then(m => m.CustomersModule),
        canActivate: [CanActivateAuthGuard]
      },

      {
        path: "project",
        loadChildren: () => import('./components/projects/projects.module').then(m => m.ProjectsModule),
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: "vendor",
        loadChildren: () => import('./components/vendor/vendor.module').then(m => m.VendorModule),
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: "user",
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
        canActivate: [AdminGuardGuard]
      },
      {
        path: "statistic",
        loadChildren: () => import('./components/statistics/statistics.module').then(m => m.StatisticsModule),
        canActivate: [AdminGuardGuard]
      },
      {
        path: "calendar",
        loadChildren: () => import('./components/calenders/calenders.module').then(m => m.CalendersModule),
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: "calls",
        loadChildren: () => import('./components/calls/calls.module').then(m => m.CallsModule),
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: "todo",
        loadChildren: () => import('./components/todo/todo.module').then(m => m.TodoModule),
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: "work-order",
        loadChildren: () => import('./components/workorder-pdf/workorder-pdf.module').then(m => m.WorkorderPdfModule),
        canActivate: [CanActivateAuthGuard]
      },
      {
        path: "information",
        loadChildren: () => import('./components/information-pdf/information-pdf.module').then(m => m.InformationPdfModule),
        canActivate: [CanActivateAuthGuard]
      }



    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled' , scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
