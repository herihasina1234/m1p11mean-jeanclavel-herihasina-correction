import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

// Import client containers
import { ClientFooterComponent, ClientHeaderComponent, ClientLayoutComponent } from './containers';

// Import employee containers
import { EmployeeFooterComponent, EmployeeHeaderComponent, EmployeeLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationInterceptorService } from 'src/app/services/authentication_interceptor/authentication-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralSettingModule } from './views/general-setting/general-setting.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTablesModule } from 'angular-datatables';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

const CLIENT_CONTAINERS = [
  ClientFooterComponent,
  ClientHeaderComponent,
  ClientLayoutComponent
];

const EMPLOYEE_CONTAINERS = [
  EmployeeFooterComponent,
  EmployeeHeaderComponent,
  EmployeeLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent, 
    ...APP_CONTAINERS,
    ...CLIENT_CONTAINERS,
    EMPLOYEE_CONTAINERS
  ],
  imports: [
    GeneralSettingModule,    
    BrowserModule,
    MatDialogModule,
    DataTablesModule,    
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,

    //custom

    HttpClientModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },    
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthenticationInterceptorService, multi: true 
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
