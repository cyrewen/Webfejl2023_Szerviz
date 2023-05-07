import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpCodeComponent } from './http-code.component';

const routes: Routes = [{ path: '', component: HttpCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HttpCodeRoutingModule { }
