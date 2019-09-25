import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import{GoogleMap,GoogleMaps,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //  componentes: Componente[]=[
  //    {
       
  //      origen:'Medellin - Guayabal',
  //      destino:"Medelin - Laureles",
  //      observacion:' Hay un servicio disponible..' ,
  //      imagen:'https://i.ibb.co/jJZZ3Bv/camion.jpg',
       
  //    },
  //    {
    
  //    origen:'Medellin - Guayabal',
  //    destino:"Medelin - Laureles",
  //    observacion:' Hay un servicio disponible..' ,
  //    imagen:'https://i.ibb.co/Kq4X9Rk/imagen.jpg',
     
  //    }
  //  ];

 
  result:any;
 // result:Componente;
  valor:any;
  data:Observable<any>;
  map:GoogleMap;
  constructor(public http: HttpClient, private googlemapas: GoogleMaps) { 
    this.getData();
  }

   getData(){
     var url='http://127.0.0.1:8000/api/tasks';
     this.data=this.http.get(url);
    this.data.subscribe(data=>{
    console.log(data);  
    this.result=data;
    this.valor=this.result[2].name;

    });
   }

  ngOnInit() {
  }



  ionViewDidLoad(){
    this.cargarMapa();

  }
  cargarMapa(){
    let opcionesMapa: GoogleMapOptions={
      mapType:'MAP_TYPE_TERRAIN',
      controls:{
        compass:true,
        myLocationButton:true,
        zoom:true
         }, camera:{
           target:{
             lat:6.236628,
             lng:-75.576531
           }, 
           zoom:18

           }
         };

         this.map=this.googlemapas.create("map_canvas",opcionesMapa);
         this.map.one(GoogleMapsEvent.MAP_READY).then(
           resultado=>{
             console.log('mapa_listo');
           }
         ).catch(error=>{
           console.log('error ' +  error);
         });
         
    }
    

  }

 interface Componente{
   
  id:string;
  origen: string;
  destino: string;
  estado:string;
 
 }
