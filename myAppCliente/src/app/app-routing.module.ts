import { LoginComponent } from './pages/login/login.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { TutorialesComponent } from './pages/tutoriales/tutoriales.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:"inicio", component: InicioComponent},

  {path:"tutoriales", component: TutorialesComponent},

  {path:"tienda", component: TiendaComponent},

  {path:"carrito", component: CarritoComponent},

  {path:"pedidos", component: PedidosComponent},

  {path:"login", component: LoginComponent},
  
  {path: '**', redirectTo: 'login', pathMatch:'full'},

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
