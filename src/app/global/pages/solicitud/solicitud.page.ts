import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  submitted=false; 
  formgroup:FormGroup;
  origenServ='prueba';
  constructor(public formBuilder:FormBuilder,public HttpClient:HttpClient,private router:Router) { 
   
  }

  ngOnInit() {
    this.formgroup = this.formBuilder.group({
      origenServ:['',[Validators.required,Validators.minLength(6)]],
      destinoServ:['',[Validators.required,Validators.minLength(6)]],
      descripcionServ:['',[Validators.required,Validators.minLength(6)]],
     
  }, {});
  }

 async onSubmit(value: any): Promise<void>{
    this.submitted = true;

    if (this.formgroup.invalid) {
      return;
     }

  let url:string="http://localhost:8000/services";

      var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.append('Access-Control-Allow-Headers', 'x-id');


      let dataPost={
        'origenServ':this.formgroup.get('origenServ').value,
        'destinoServ':this.formgroup.get('destinoServ').value,
        'descripcionServ':this.formgroup.get('descripcionServ').value
      };
      let data:Observable<any>= this.HttpClient.post(url,dataPost,{headers:headers,responseType: 'text'})
        data.subscribe(async data=>{
          console.log(data);
          const info=JSON.parse(data);
          
       
         // this.router.navigateByUrl("/maps",this.formgroup.get('origenServ').value);
          this.router.navigate(['/maps', this.formgroup.get('origenServ').value]);

        });

   
  }
  get frm() { return this.formgroup.controls; }

  
  /***********************************************************/

  
}
