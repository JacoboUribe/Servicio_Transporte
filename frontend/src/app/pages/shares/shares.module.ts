import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharesRoutingModule } from './shares-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    SharesRoutingModule
  ]
})
export class SharesModule { }
