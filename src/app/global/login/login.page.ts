import { Component} from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import{HttpClient, HttpHeaders }from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions, Headers, Http } from '@angular/http';
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
  //user:any;
  //registroData:any={};
  //dataPost:any={};
  //respuesta:any[]=[];
 
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
   
    let url:string="http://127.0.0.1:8000/user/show";

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   let requestOptions = new RequestOptions({ headers: headers });

    let dataPost={
      'user':this.formgroup.get('email').value,
      'password':this.formgroup.get('password').value

    };
    
    let data:Observable<any>= this.httpClient.post(url,dataPost,{responseType:"text"})
    data.subscribe(async data => {
     //console.log(data);

     const info=JSON.parse(data);
    // console.log(info);
     console.log(info['id']);

     if(info['estado']=='0'){
     
           this.router.navigateByUrl('/home');
  
     }else{
        const alert = await this.alertController.create({
        header:'Ingresar',
        message:'El Usuario o Contraseña no son correctos o el usuario esta inactivo',
        buttons:['Ok']  
      })
  
        await alert.present();

     }

    });

     this.submitted = false;
     this.formgroup.reset();
   
}

  get frm() { return this.formgroup.controls; } 
   

}
