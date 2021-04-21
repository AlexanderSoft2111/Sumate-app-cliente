import { FireStoreService } from './../../servicios/fire-store.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  
  titulohome = "Bienvenidos";

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(public route:Router,
              private navCtrl: NavController,
              public fireStoreService:FireStoreService) { }

  ngOnInit() {}
  
  empezar(){
    this.navCtrl.navigateBack('/tienda')
  }

 
}
