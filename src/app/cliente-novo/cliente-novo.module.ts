import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteNovoPageRoutingModule } from './cliente-novo-routing.module';

import { ClienteNovoPage } from './cliente-novo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteNovoPageRoutingModule
  ],
  declarations: [ClienteNovoPage]
})
export class ClienteNovoPageModule {}
