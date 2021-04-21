
import { ItemCarritoComponent } from './item-carrito/item-carrito.component';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    HeaderComponent,
    CardProductoComponent,
    ItemCarritoComponent,

  ],
 
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    FormsModule,  
    SwiperModule
  ],

  exports: [
     HeaderComponent,
     CardProductoComponent,
     ItemCarritoComponent,
  ]
})
export class ComponentesModule { }
