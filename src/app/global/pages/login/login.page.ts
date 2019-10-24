import { Component} from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import{HttpClient, HttpHeaders }from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Validators,FormBuilder,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  submitted=false; 
  formgroup:FormGroup;
  
  constructor(public navCtrl: NavController,public formBuilder:FormBuilder, private router:Router,public httpClient: HttpClient,
    private alertController:AlertController) {
   
   }

  ngOnInit() {
    this.formgroup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
  }, {});
  }

  async onSubmit(value: any): Promise<void>{
    this.submitted = true;

    // Stop if the form validation has failed
    if (this.formgroup.invalid) {
        return;
    }
            
    //  if(this.registroData.correo !="" && this.registroData.nombre !=""
     // && this.registroData.telefono !="" && this.registroData.ciudad !="" && this.registroData.password !="" ){
   
    //let url:string="https://cors-anywhere.herokuapp.com/http://acarreos.masalcance.com/user/show";
    let url:string="http://127.0.0.1:8000/user/show";

      var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');

    let dataPost={
      'user':this.formgroup.get('email').value,
      'password':this.formgroup.get('password').value

    };
    
    let data:Observable<any>= this.httpClient.post(url,dataPost,{headers:headers, responseType: 'text'})
    data.subscribe(async data => {
     console.log(data);

     const info=JSON.parse(data);
    // console.log(info);
     console.log(info['id']);
     
    console.log(info['estado']);

    if(info['estado']=='1'){
     
        const alert = await this.alertController.create({
        header:'Ingresar',
        message:'El Usuario o Contraseña no son correctos o el usuario esta inactivo',
        buttons:['Ok']
        
         });
       
       await alert.present();

      }else{
        this.router.navigateByUrl('/solicitud');

      }
    
    });

     this.submitted = false;
     this.formgroup.reset();
   
}

  get frm() { return this.formgroup.controls; } 
   
}
