import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutesRoutingModule } from './order-routes-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    OrderRoutesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderRoutesModule { }
