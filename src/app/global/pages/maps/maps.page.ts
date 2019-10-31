import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
import { ModalSearchOriPage } from '../modal-search-ori/modal-search-ori.page';

 /************************************************************************************ */

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
 /************************************************************************************ */
export class MapsPage implements OnInit {
  public searchOrigen:string='';
  public searchDestino:string='';

  googleAutoComplete= new google.maps.places.AutocompleteService();
  searchResult=new Array<any>();
  
  myLatLong = {lat: 6.260128, lng: -75.574430};


  @ViewChild(GoogleMapComponent) _GoogleMap: GoogleMapComponent;
  map: google.maps.Map;  
  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    center: this.myLatLong,
    zoomControl: true,
    scaleControl: true,
   gestureHandling: 'cooperative',

    // uncomment the following line if you want to remove the default Map controls
    disableDefaultUI: true
  };
  loadingElement: any;
   origenServ="";
 // valor: any;
  latitud:any;
  longitud:any;
  geocoder: any;
 
 /************************************************************************************ */
  constructor(private loadingController: LoadingController,public navCtrl:NavController, public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder, private modalCtrl:ModalController,private router:Router) {
     
     }

      /************************************************************************************ */
    ngOnInit() {
      
      this._GoogleMap.$mapReady.subscribe(map => {
        this.map = map;
      });
    
      this.createLoader();
      
    }
   /************************************************************************************ */
    async createLoader() {
      this.loadingElement = await this.loadingController.create({
        message: 'Obteniendo su location...'
      });
    
    }
   /************************************************************************************ */
    async presentLoader() {
      await this.loadingElement.present();
    }
  
     /************************************************************************************ */
    async dismissLoader() {
      if (this.loadingElement) {
        await this.loadingElement.dismiss();
      }
    }
  
     /************************************************************************************ */
    geolocateMe() {
  
     this.presentLoader();
     var infoWindow:google.maps.Map;
      Geolocation.getCurrentPosition().then(position => { 
        
        const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.panTo(current_location);
        
        
        // add a marker
       // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
       
        var contenidoStrig ="Usted esta AQUI!";
        var infoWindow=new google.maps.InfoWindow({
            content:contenidoStrig
        });

      var marker = new google.maps.Marker({
          position: current_location,
          title: 'Usted esta AQUI!',
         // icon:image,
          animation: google.maps.Animation.DROP
           
        });
        var map: google.maps.Map;
        marker.addListener('click',function(){
          infoWindow.open(map,marker);
        });
        
        
      marker.setMap(this.map);

      }).catch((error) => {
        console.log('Error getting current location', error);
  
      }).finally(() => this.dismissLoader());
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(this.map);
  
    }

 
  
  /************************************************************************************ */  
  async searchDirOrigen(){
    const modal=  await this.modalCtrl.create({
      component:ModalSearchOriPage,
      componentProps:{
        'destinoServ':'Ingrese la direccion de Origen',
        'opcion':'1'
          }

    });
     await modal.present();

     const {data}=await modal.onDidDismiss();
     const searchOrigen=(data['nombreUbicacion']);
     const opcion=data['opcion'];
     var idPlace= data.id;

     this.pasarDato(searchOrigen,opcion);
     this.geocodePlaceId(idPlace);
 
  }
/************************************************************************************ */
async searchDirDestino(){
  const modal=  await this.modalCtrl.create({
    component:ModalSearchOriPage,
    componentProps:{
      'origenServ':'Ingrese la direccion de Destino',
      'opcion':'2'
        }

  });
   await modal.present();

   const {data}=await modal.onDidDismiss();
   const searchDestino=(data['nombreUbicacion']);
   const opcion=data['opcion'];
   var idPlace= data.id;
  
   this.pasarDato(searchDestino,opcion);
   this.geocodePlaceId(idPlace);

}
 
   /************************************************************************************ */
   
   pasarDato(ubicacion,opcion){

      if(opcion =='1'){this.searchOrigen=ubicacion;}
      if(opcion =='2'){this.searchDestino=ubicacion;}
    
   }
/************************************************************************************ */
  async geocodePlaceId(idPlace) {
   
   var map:google.maps.Map;
   var placeId = idPlace
  
   this.geocoder = new google.maps.Geocoder();

    this.geocoder.geocode({'placeId': placeId}, (results,status)=> {

        if (status === google.maps.GeocoderStatus.OK) { 
          let position={
           latitud:results[0].geometry.location.lat(),
           longitud:results[0].geometry.location.lng()
          };
         
        this.geolocate(position.latitud,position.longitud);

       
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

  }
    
/************************************************************************************ */
async geolocate(latitud,longitud){
  
    this.presentLoader();
    var lat=latitud;
    var lng=longitud;
      var infoWindow:google.maps.Map;
     Geolocation.getCurrentPosition().then(position => { 
       
      const current_location = new google.maps.LatLng(latitud,longitud);
     
       this.map.panTo(current_location);
       
       
       // add a marker
      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      
       var contenidoStrig ="Ubicación Origen Servicio ..!";
       var infoWindow=new google.maps.InfoWindow({
           content:contenidoStrig
       });

       var marker = new google.maps.Marker({
         position: current_location,
         title: 'Ubicacion Orgien...!',
        icon:image,
         animation: google.maps.Animation.DROP,
           
       });
      
       
     marker.setMap(this.map);

     }).catch((error) => {
       console.log('Error getting current location', error);
 
     }).finally(() => this.dismissLoader());
     var trafficLayer = new google.maps.TrafficLayer();
     trafficLayer.setMap(this.map);
 
   }

   /**************************************************************** */

   irA_Solicitud(){

    this.router.navigateByUrl('/solicitud');
    
   }

    /************************************************************************************ */
}
