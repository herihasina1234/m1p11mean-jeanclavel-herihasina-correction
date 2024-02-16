import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralSettingRoutingModule } from './general-setting-routing.module';
import { BrowserModule } from "@angular/platform-browser";

import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeneralSettingRoutingModule,
    DataTablesModule
  ]
})
export class GeneralSettingModule { }
