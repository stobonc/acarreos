import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-search-ori',
  templateUrl: './modal-search-ori.page.html',
  styleUrls: ['./modal-search-ori.page.scss'],
})
export class ModalSearchOriPage implements OnInit {

  @Input()nombre;
  @Input()pais;

  @ViewChild('searchInput') sInput;
  constructor(private modalCtrl:ModalController) { }

 async ngOnInit() {

    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }
  public search:string='';
  public dato:string="";
  googleAutoComplete= new google.maps.places.AutocompleteService();
  searchResult=new Array<any>();
 // public origenServ:String='sergio';
 
 
  async searchDireccion(){
  
    if(!this.search.trim().length) return;
    this.googleAutoComplete.getPlacePredictions({input:this.search},predictions=>{
     // console.log(this.search);
    this.searchResult=predictions; 
  

    });
   
  //console.log(event);
  }

  async salirSinArg(){
 this.modalCtrl.dismiss();

  }
   async salirConArg(event:any){
    //console.log(event);
     
    this.modalCtrl.dismiss({
        'nombreUbicacion':event.description,
        'id':event.place_id,
      });
   }
}
