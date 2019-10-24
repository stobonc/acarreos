import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, NavParams, NavController, ModalController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

import { GoogleMapComponent } from '../components/google-map/google-map.component';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalSearchOriPage } from '../global/pages/modal-search-ori/modal-search-ori.page';


declare var google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: [
    './styles/maps.page.scss'
  ]
})


export class MapsPage implements OnInit {
  formgroup:FormGroup;
  
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
  objetoRecibido:any;
  
  origenServ='';
  constructor(private loadingController: LoadingController,public navCtrl:NavController, public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder, public modalCtrl:ModalController) {

    console.log(this.origenServ=this.activatedRoute.snapshot.paramMap.get('origenServ'));
    console.log(google);
   
   }

  ngOnInit() {

    this.formgroup = this.formBuilder.group({
     origenServ:['',[Validators.required,Validators.minLength(6)]],
          
  }, {});

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
    Geolocation.getCurrentPosition().then(position => {
     
      const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(current_location);

      // add a marker
      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

      const marker = new google.maps.Marker({
        position: current_location,
        title: 'You are here!',
        icon:image,
        animation: google.maps.Animation.DROP
      });
  /***EJEMPLO DE INGRESAR UN MARCADOR 
     // 6.151296, -75.619166


      var myLatLng = {lat: 6.151296, lng: -75.619166};
      var marker1 = new google.maps.Marker({
        position: myLatLng,
        
        title: 'Hello World!'
      });

      // To add the marker to the map, call setMap();
      marker.setMap(this.map);*/

      
      marker.setMap(this.map);
      var contentString='Lugar de entrega es aca';
       
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });

    marker1.addListener('click', function() {
    infowindow.open(map1, marker1);
    });

    }).catch((error) => {
      console.log('Error getting current location', error);

    }).finally(() => this.dismissLoader());
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.map);



  var marker1 = new google.maps.Marker({
    position: this.myLatLong,
    map: this.map,
    title: 'Uluru (Ayers Rock)'
  });
 
  var map1 = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: this.myLatLong
  });
  
   
  }
initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: this.myLatLong,
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete({input:this.formgroup.get('origenServ').value});
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindow-content');
      infowindow.setContent(infowindowContent);
      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
      });

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
          autocomplete.setTypes(types);
        });
      }
      console.log(this.formgroup.get('origenServ').value);
      setupClickListener(this.formgroup.get('origenServ').value, []);
      setupClickListener('changetype-address', ['address']);
      setupClickListener('changetype-establishment', ['establishment']);
      setupClickListener('changetype-geocode', ['geocode']);

     /* document.getElementById('use-strict-bounds')
          .addEventListener('click', function() {
            console.log('Checkbox clicked! New state=' + this.checked);
            autocomplete.setOptions({strictBounds: this.checked});
          });*/

  }
  public search:string='';
  googleAutoComplete= new google.maps.places.AutocompleteService();
   searchResult=new Array<any>();
  searchChange(){
    if(!this.search.trim().length) return;
    this.googleAutoComplete.getPlacePredictions({input:this.search},predictions=>{
      console.log(predictions);
    });
   console.log(google);
  }
  

  async searchDirOrig(){
    const modal=  this.modalCtrl.create({
      component:ModalSearchOriPage,
      componentProps:{
        'nombre':'sergio',
        'pais':'tobon'
      }

    });
     (await modal).present();
  }
}