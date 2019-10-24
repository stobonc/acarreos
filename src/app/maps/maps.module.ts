import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsPage } from './maps.page';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalSearchOriPage } from '../global/pages/modal-search-ori/modal-search-ori.page';
import { ModalSearchOriPageModule } from '../global/pages/modal-search-ori/modal-search-ori.module';

@NgModule({
  entryComponents:[
ModalSearchOriPage
  ],
  imports: [
    ModalSearchOriPageModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: MapsPage }])
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
