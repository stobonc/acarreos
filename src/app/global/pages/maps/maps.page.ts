import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
//import { map } from 'rxjs/operators';
import { ModalSearchOriPage } from '../modal-search-ori/modal-search-ori.page';
import { MyLocation } from '@ionic-native/google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  
  myLatLong = {lat: 6.091372, lng: -75.635300};

  @ViewChild(GoogleMapComponent) _GoogleMap: GoogleMapComponent;
  map: google.maps.Map;  
  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    center: this.myLatLong,
    zoomControl: true,
    scaleControl: true,
   // gestureHandling: 'cooperative',

    // uncomment the following line if you want to remove the default Map controls
    disableDefaultUI: true
  };
  loadingElement: any;
  origenServicio='';
  origenServ="";
 // valor: any;
  latitud:any;
  longitud:any;
 

  constructor(private loadingController: LoadingController,public navCtrl:NavController, public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder, private modalCtrl:ModalController) {
     
     
     }
    ngOnInit() {
      
      this._GoogleMap.$mapReady.subscribe(map => {
        this.map = map;
      });
    
      this.createLoader();
      
    }
  
    async createLoader() {
      this.loadingElement = await this.loadingController.create({
        message: 'Obteniendo su location...'
      });
    
    }
  
    async presentLoader() {
      await this.loadingElement.present();
    }
  
    async dismissLoader() {
      if (this.loadingElement) {
        await this.loadingElement.dismiss();
      }
    }
  
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

    public search:string='';
    public dato:string="";
    googleAutoComplete= new google.maps.places.AutocompleteService();
    searchResult=new Array<any>();
   // public origenServ:String='sergio';
   
   
    pasarDato(event:any){

      console.log(event);
      this.search=event.nombreUbicacion;
     // this.geolocateMe();
     
    }

    
  async searchDirOrigen(){
    const modal=  await this.modalCtrl.create({
      component:ModalSearchOriPage,
      componentProps:{
        'origenServ':'Ingrese el lugar a buscar',
          }

    });
     await modal.present();

     const {data}=await modal.onDidDismiss();
      this.pasarDato(data);

      var idPlace= data.id;
     
      var infowindow = new google.maps.InfoWindow;
     const st = await this.geocodePlaceId(idPlace);
      console.log(st);
  }

  async geocodePlaceId(idPlace) {
   
   var map:google.maps.Map;
   var placeId = idPlace
       var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'placeId': placeId}, function(results,status) {

        if (status === google.maps.GeocoderStatus.OK) { 
     
           this.latitud=results[0].geometry.location.lat();
           this.longitud=results[0].geometry.location.lng();
           this.myLatLong={latitud:results[0].geometry.location.lat(),longitud:results[0].geometry.location.lng()};

          console.log(this.myLatLong);
        let st= this.myLatLong;
        console.log(st);
      //  return st;
        //this.geolocate();

        //---------------------
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
    
        }).finally(() => {
          console.log('aqui');
        });
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(this.map);
        //-----------------


      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

    console.log('esta es '+this.latitud);
  
  }
    

async geolocate(){
  
    this.presentLoader();
      var infoWindow:google.maps.Map;
     Geolocation.getCurrentPosition().then(position => { 
       
      const current_location = new google.maps.LatLng(this.latitud,this.longitud);
      console.log(this.latitud,this.longitud);
       this.map.panTo(current_location);
       
       
       // add a marker
      // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      
       var contenidoStrig ="Usted esta AQUI!";
       var infoWindow=new google.maps.InfoWindow({
           content:contenidoStrig
       });

       var marker = new google.maps.Marker({
         position: current_location,
         title: 'Usted esta AQUItobon!',
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


}
