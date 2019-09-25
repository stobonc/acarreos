import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.page.html',
  styleUrls: ['./registrousuario.page.scss'],
})
export class RegistrousuarioPage implements OnInit {
  submitted=false; 
  formgroup:FormGroup;
  registroData:any={};
  
  constructor( public formBuilder:FormBuilder, private router:Router,public httpClient: HttpClient,
    private alertController:AlertController) {
   
   }
  

  ngOnInit() {
      this.formgroup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      nombre:['',[Validators.required,Validators.minLength(6)]],
      telefono:['',[Validators.required,Validators.minLength(7)]],
      ciudad:['',[Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
  }, {});
  }
  async onSubmit(value: any): Promise<void> {
    this.submitted = true;

    // Stop if the form validation has failed
    if (this.formgroup.invalid) {
        return;
    }
            
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
      'user':this.formgroup.get('email').value,
      'email':this.formgroup.get('email').value,
      'name':this.formgroup.get('nombre').value,
      'telefono':this.formgroup.get('telefono').value,
      'ciudad':this.formgroup.get('ciudad').value,
      'password':this.formgroup.get('password').value

    };
    let data:Observable<any>= this.httpClient.post(url,dataPost, {responseType: 'text'})
    data.subscribe(data => {
    
      console.log(data);
    });


  }
  else{
    console.log("Ingrese los datos faltantes");
  }
     this.submitted = false;
     this.formgroup.reset();

    const alert = await this.alertController.create({
      header:'Registo de Usuario',
      message:"Usuario Creado Correctamente",
      buttons:['Ok']  
    })

    await alert.present();
    this.router.navigateByUrl('/login');
}

 
  get frm() { return this.formgroup.controls; }  
}


