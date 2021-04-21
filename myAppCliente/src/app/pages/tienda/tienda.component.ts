import { FireStoreService } from './../../servicios/fire-store.service';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetDatosService } from 'src/app/servicios/set-datos.service';
import SwiperCore, { EffectFade, Swiper, EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from "swiper/core";

// install Swiper components

//SwiperCore.use([EffectCoverflow]);

//SwiperCore.use([Navigation]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})


export class TiendaComponent implements OnInit, OnDestroy {
  
  tituloTienda = "Tienda";
  private path ='Productos/';
  productos: Producto [] = [];
  subscribir: Subscription;
  items: number;
  loading = true;

  swiper = new Swiper('.swiper-container', {
      cssMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination'
      },
      mousewheel: true,
      keyboard: true,
    });


  constructor(public fireStoreService:FireStoreService,
              public setDatosService: SetDatosService) { 
               this.getProducts();
    }

  ngOnInit() {

  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ionViewWillEnter(){
    const pedidolocal = JSON.parse(localStorage.getItem('pedido'));
    if(pedidolocal !== null){
      this.items = pedidolocal.productos.length;
    }
  }

  ngOnDestroy(){
    if(this.subscribir){
        this.subscribir.unsubscribe();
    }
  }

  getProducts(){
     this.subscribir = this.fireStoreService.getCollectionChanges<Producto>(this.path).subscribe(res => {
      this.productos = res;
      if(!this.productos){
        console.log("no hay productos");
      } else{
        this.loading = false;
      }
    });
  }

  recibirItem(item: number){   
    this.items = item;
  }

}

