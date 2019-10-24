import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      cedula:['',[Validators.required,Validators.minLength(5)]],
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
                    
              //      if(this.registroData.correo !="" && this.registroData.nombre !=""
              //      && this.registroData.telefono !="" && this.registroData.ciudad !="" && this.registroData.password !="" ){

            //let url:string="https://cors-anywhere.herokuapp.com/http://acarreos.masalcance.com/user";

            let url:string="http://127.0.0.1:8000/user";

            var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.append('Access-Control-Allow-Headers', 'x-id');



            let dataPost={
              'user':this.formgroup.get('email').value,
              'email':this.formgroup.get('email').value,
              'name':this.formgroup.get('nombre').value,
              'telefono':this.formgroup.get('telefono').value,
              'cedula':this.formgroup.get('cedula').value,
              'ciudad':this.formgroup.get('ciudad').value,
              'password':this.formgroup.get('password').value

            };
            let data:Observable<any>= this.httpClient.post(url,dataPost, {headers:headers,responseType: 'text'})
            data.subscribe(async data => {
            
              console.log(data);
              const info=JSON.parse(data);
              console.log(info['code']);

              console.log(info['estado']);
                if(info['estado']=='1'){
     
                  const alert = await this.alertController.create({
                    header:'Registo de Usuario',
                    message:"Usuario Creado Correctamente",
                    buttons:['Ok']  
                  })
                    await alert.present();
                    this.submitted = false;
                    this.formgroup.reset();
                    this.router.navigateByUrl('/login');
  
                 }else{
                    const alert = await this.alertController.create({
                      header:'Registro usuario',
                      message:'El registro no se realizo, intenta nuevamente',
                      buttons:['Ok']  
                   })
  
                      await alert.present();

                  }
              
            });
       
        }

        
          get frm() { return this.formgroup.controls; }  
}


