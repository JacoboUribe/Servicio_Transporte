import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaturalPeoplesRoutingModule } from './natural-peoples-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    NaturalPeoplesRoutingModule
  ]
})
export class NaturalPeoplesModule { }
