import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import{HttpClient}from '@angular/common/http'
import 'rxjs/add/operator/map';
import { RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  [x: string]: any;
   registroData:any={};
   private todo : FormGroup;

  constructor(public navCtrl: NavController,public httpClient: HttpClient, private formBuilder: FormBuilder) {
   this.registroData.correo="";
   this.registroData.nombre="";
   this.registroData.telefono="";
   this.registroData.ciudad="";
   this.registroData.password="";
   this.registroData.confirmarPasword="";

   this.todo = this.formBuilder.group({
    correo: ['', Validators.required],
    nombre: ['', Validators.required],
    description: [''],
  });

  }

  ngOnInit() {
  }
   registrarUsuario(){
      if(this.registroData.password !== this.registroData.confirmarPasword ){
            
            if(this.registroData.correo !="" && this.registroData.nombre !=""
            && this.registroData.telefono !="" && this.registroData.ciudad !="" && this.registroData.password !="" ){
          //console.log("correo:",this.registroData.correo);
        // console.log("nombre:",this.registroData.nombre);

          let url:string="http://127.0.0.1:8000/user/";

          let headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          let requestOptions = new RequestOptions({ headers: headers });

          let dataPost={
            'user':this.registroData.correo,
            'password':this.registroData.password

          };
          let data:Observable<any>= this.httpClient.post(url,dataPost, {responseType: 'text'})
          data.subscribe(data => {
          
            console.log(data);
          });


        }
        else{
          console.log("Ingrese los datos faltantes");
        }
      }else{
        console.log("Son diferentes");
    
  }
}

}
