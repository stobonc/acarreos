import { Component, OnInit } from '@angular/core';
import{ Router }from'@angular/router';
import { FormBuilder,FormGroup,Validators, ReactiveFormsModule} from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
  submitted=false; 
  formgroup:FormGroup;

  constructor(private router:Router, private formBuilder:FormBuilder) {   }

  ngOnInit() {
    this.formgroup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
  }, {});
  }

  onSubmit(value: any): void {
    this.submitted = true;

    // Stop if the form validation has failed
    if (this.formgroup.invalid) {
        return;
    }
        
    this.router.navigateByUrl('/registro');
  }
 
  get frm() { return this.formgroup.controls; }  
}

  

