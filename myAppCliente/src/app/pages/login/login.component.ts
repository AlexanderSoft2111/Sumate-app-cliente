import { ToastController } from '@ionic/angular';
import { FireStoreService } from './../../servicios/fire-store.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  user = {
    email: '',
    password: '',
  };
  
  roles = '';
  uid = '';

  constructor(public Firebase: FireStoreService,
             public toastController: ToastController,
             public route: Router) { }

  ngOnInit() {}


  login(){
      this.user.email = this.user.password + "@gmail.com"; 
      this.Firebase.login(this.user.email, this.user.password).then(res => {
      this.presentToast("Login exitoso");
      this.vaciarCredenciales();
      this.route.navigate(['inicio']);
    }).catch(error => {
      this.presentToast("Error, el código ingresado es incorrecto");
    });
    }
    

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


 vaciarCredenciales(){
  this.user = {
    email: '',
    password: '',
  };
 }

}
