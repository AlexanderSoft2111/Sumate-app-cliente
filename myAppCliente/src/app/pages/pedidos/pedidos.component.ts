import { Pedido } from './../../models/interfaces';
import { Subscription } from 'rxjs';
import { CarritoService } from './../../servicios/carrito.service';
import { FireStoreService } from './../../servicios/fire-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  nuevoSubscribir: Subscription;
  entregadoSubscribir: Subscription;
  pedidos: Pedido[] = [];
  pedidosEntregados: Pedido[] = [];
  starAt = null;
  pedidoNuevo = true;
  loadNuevos = false;
  loadEntregados = false;
  opc= '';
  tituloTienda = "Pedidos";

  constructor(public FireStoreService:FireStoreService,
               public carritoService:CarritoService) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getNuevos();
    console.log("ingrese otra vez")
  }

  ngOnDestroy(){
    if(this.nuevoSubscribir){
      this.nuevoSubscribir.unsubscribe();
    }
    
    if(this.entregadoSubscribir){
      this.entregadoSubscribir.unsubscribe();
    }
  }

   changeSegment(ev: any){
    this.opc = ev.detail.value;
     console.log("changeEvent");
    if(this.opc === 'Nuevos'){
      this.vaciarPedido(); 
      this.pedidoNuevo = true;
        if(!this.loadNuevos){
          this.getNuevos();
        }
    } else if(this.opc === 'Entregados'){
          this.vaciarPedidoEntregado();
              this.pedidoNuevo = false;
              if(!this.loadEntregados){
                this.getEntregados();
                
              }
            }
  }

  async getNuevos(){

      if(this.pedidos.length){
        this.starAt = this.pedidos[this.pedidos.length -1].fecha;
      }
      const uid = await this.FireStoreService.getUid();
      if(uid !== undefined){
        const path = 'Clientes/' + uid + '/Pedidos/';
        this.nuevoSubscribir = this.FireStoreService.getCollectionQueryVendedor<Pedido>(path,'estado', this.starAt).subscribe(res => {
          if(res.length){
            console.log("usuarios",res);
            this.loadNuevos = true;
            res.forEach(pedido => {
              const existe = this.pedidos.find(pedidoExiste => {
                return pedidoExiste.id === pedido.id;
              });
              if(existe === undefined){
                this.pedidos.push(pedido);
              }
            });
            this.ordenarPedidos(this.pedidos);
           }
          });
      }
          
  }

  

 async getEntregados(){

  if(this.pedidosEntregados.length){
    this.starAt = this.pedidosEntregados[this.pedidosEntregados.length -1].fecha;
    }
  const uid = await this.FireStoreService.getUid();
  if(uid !== undefined){
    const path = 'Clientes/' + uid + '/Pedidos/';
    this.entregadoSubscribir = this.FireStoreService.getCollectionQueryVendedorEntre<Pedido>(path,'estado','==','Entregado', this.starAt).subscribe(res => {
      if(res.length){
        this.loadEntregados = true;
        res.forEach(pedido => {
          const existe = this.pedidosEntregados.find(pedidoExiste => {
            return pedidoExiste.id === pedido.id;
          });
          if(existe === undefined){
            this.pedidosEntregados.push(pedido);
          }
        });
        this.ordenarPedidos(this.pedidosEntregados);
       }
      });
  }
   
  }

  cargarmas(){
    if(this.pedidoNuevo){
     this.getNuevos();
    } else {
      this.getEntregados();
    }
    
  }

  ordenarPedidos(pedidos: Pedido[]){

    pedidos.sort((a, b) => {
      if(a.fecha > b.fecha){
        return -1;
      } else if(a.fecha > b.fecha){
          return 1;
      }
      return 0;
    });
  
  }

  vaciarPedido(){
    if(this.pedidos.length){
  
      this.pedidos.splice(3, this.pedidos.length)
  
    }   
  } 

  vaciarPedidoEntregado(){
    if(this.pedidosEntregados.length){
  
      this.pedidosEntregados.splice(3, this.pedidosEntregados.length)
    }
  
  } 


}
