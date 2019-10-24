import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalSearchOriPage } from './modal-search-ori.page';

/*const routes: Routes = [
  {
    path: '',
    component: ModalSearchOriPage
  }
];*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  //  RouterModule.forChild(routes)
  ],
  declarations: [ModalSearchOriPage]
})
export class ModalSearchOriPageModule {}
