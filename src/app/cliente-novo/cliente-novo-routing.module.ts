import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteNovoPage } from './cliente-novo.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteNovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteNovoPageRoutingModule {}
