import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutesRoutingModule } from './order-routes-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    OrderRoutesRoutingModule
  ]
})
export class OrderRoutesModule { }
