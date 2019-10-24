import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import{ComponentsModule}from'../../../components/components.module';
import { MapsPage } from './maps.page';
import { ModalSearchOriPage } from '../modal-search-ori/modal-search-ori.page';
import { ModalSearchOriPageModule } from '../modal-search-ori/modal-search-ori.module';

const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  entryComponents:[
    ModalSearchOriPage
  ],
  imports: [
    CommonModule,
    ModalSearchOriPageModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
