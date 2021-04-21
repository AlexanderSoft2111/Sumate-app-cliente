import { FireStoreService } from './servicios/fire-store.service';
import { Cliente } from './models/interfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SetDatosService } from './servicios/set-datos.service';

import {Plugins, StatusBarStyle} from '@capacitor/core'

const {SplashScreen, StatusBar} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  clienteActivo = false;
  uid = '';
  cliente: Cliente = {
    id: '',
    codigo: '',
    cedula: '',
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    latitud: null,
    longitud: null,
    telefono: '',
    FechaCreacion: new Date(),
    rol: 'Cliente',
    imagenBig: '',
    imagenSmall: '',
    emailRegistro: '',
    contrasena: '',
    tipoCliente: 'Mayorista',
    estado: 'activo',
  }
  suscribirDoc: Subscription;
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    public menu:MenuController,
    public fireStoreService:FireStoreService,
    public route:Router,
    public setDatosService:SetDatosService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      SplashScreen.hide();
      StatusBar.setBackgroundColor({color: '#ffffff'});
      StatusBar.setStyle({
        style: StatusBarStyle.Light
      });
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
     this.Permisos();
    });
  }

  Permisos(){
   this.suscribirDoc = this.fireStoreService.getUidState().subscribe( res => {
      if(res !== null){
        this.uid = res.uid;
        this.clienteActivo = true;
        const path = 'Clientes';
        this.suscribirDoc = this.fireStoreService.getDoc<Cliente>(path, this.uid).subscribe(user =>{
          if(user !== null){
            this.cliente = user;
           this.suscribirDoc.unsubscribe();
          }
         });
      }
      else if(res===null){
        this.clienteActivo = false;
        this.route.navigate(['login']);
      } 
    });
    
  }

  Salir(){
    this.suscribirDoc.unsubscribe();
    this.fireStoreService.logout();
    this.route.navigate(['login']);
    this.cerrarMenu();
    this.clienteActivo = false;
  }

  cerrarMenu(){
    this.menu.close();
  }

}

