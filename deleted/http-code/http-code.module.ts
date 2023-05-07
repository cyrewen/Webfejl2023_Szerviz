import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpCodeRoutingModule } from './http-code-routing.module';
import { HttpCodeComponent } from './http-code.component';


@NgModule({
  declarations: [
    HttpCodeComponent
  ],
  imports: [
    CommonModule,
    HttpCodeRoutingModule
  ]
})
export class HttpCodeModule { }
