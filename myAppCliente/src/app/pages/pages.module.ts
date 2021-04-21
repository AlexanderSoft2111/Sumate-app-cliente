import { LoginComponent } from './login/login.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { TiendaComponent } from './tienda/tienda.component';
import { SwiperModule } from 'swiper/angular';
import { TutorialesComponent } from './tutoriales/tutoriales.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComponentesModule } from './../componentes/componentes.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    InicioComponent,
    TutorialesComponent,
    TiendaComponent,
    CarritoComponent,
    PedidosComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    FormsModule,
    ComponentesModule,
    SwiperModule
  ],
})
export class PagesModule { }
