import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import{
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';



@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.page.html',
  styleUrls: ['./mapas.page.scss'],
})

export class MapasPage implements OnInit {
 map1:GoogleMap;

  constructor(private navCtrl: NavController, private googlemap:GoogleMaps) {
 
   }

  ngOnInit() {
  }

  ionViewDidLoad(){
    this.cargarMapa();
  }

  cargarMapa(){
    let opcionesMapa: GoogleMapOptions  = {
      mapType:'MAP_TYPE_TERRAIN',
      controls:{
        compass:true, //-Contener brujula
        myLocationButton:true, //localizacion actual 
        zoom:true, // botones de zoom

      },camera:{
        target:{
          lat:  6.251840, 
          lng:  -75.563590
        },
        zoom:18
      }
    };
    this.map1=this.googlemap.create('map_canvas',opcionesMapa);
    this.map1.one(GoogleMapsEvent.MAP_READY).then(
      resultado=>{
        console.log('mapa listo');
      }
    ).catch(error=>{
      console.log('error '+ error);
    });

  }
}
