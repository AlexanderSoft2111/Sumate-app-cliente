import { Cliente } from './../../models/interfaces';
import { Subscription } from 'rxjs';
import { CarritoService } from './../../servicios/carrito.service';
import { FireStoreService } from './../../servicios/fire-store.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/models/interfaces';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  
  tituloCarrito = "Carrito";
  articulos = null;
  pedido: Pedido;
  carritoSuscribir: Subscription;
  Total = 0;
  Cantidad: number;
  cliente: Cliente;
  loading: any;

  constructor(public fireStoreService:FireStoreService,
               public carritoService: CarritoService,
               public modalController: ModalController,
               public alertController: AlertController,
               public loadingController: LoadingController,
               public toastController: ToastController,
               ) { 
              this.initCarrito();  
              this.loadPedido(); }

  
  ngOnInit() {}

  ngOnDestroy(){
    if(this.carritoSuscribir){
      this.carritoSuscribir.unsubscribe();
    }
  }

  loadPedido(){
    if(this.pedido !== undefined){
      this.carritoSuscribir = this.carritoService.getCarrito().subscribe( res => {
         this.pedido = res;
         this.articulos = this.pedido.productos.length;
         this.getTotal();
         this.getCantidad();
       }); 
    }
    }

    initCarrito(){
      this.pedido = {
        id: '',
        cliente: null,
        productos: [],
        precioTotal: null,
        estado: 'Pendiente',
        fecha: new Date(),
        valorCobrado: 0,
        fechaEnvio: null,
      };
    }

    
  getTotal(){
      this.Total = 0;
      this.pedido.productos.forEach( producto => {
      this.Total = (producto.producto.precio) * producto.cantidad + this.Total;
    });
      this.Total.toFixed(2);
  } 

  getCantidad(){
      this.Cantidad = 0;
      this.pedido.productos.forEach( producto => {
      this.Cantidad = producto.cantidad + this.Cantidad;
    });
  }
  async pedir(){  
        if(!this.pedido.productos.length){
          const mensaje = 'Añade articulos al carrito!';
          this.presentAlertPrompt(mensaje);
          return;
          }
          this.presentLoading();
          this.pedido.fecha = new Date();
          this.pedido.precioTotal = this.Total;
          this.pedido.id = this.fireStoreService.createID();
          const uid = await this.fireStoreService.getUid();
          const path = 'Clientes/' + uid + '/Pedidos/';
          const pathPedidos = 'Pedidos/';
          this.fireStoreService.createDocument(this.pedido,path,this.pedido.id).then( () =>{
            const mensaje = 'Pedido enviado con exito';
            this.presentToast(mensaje);
            this.carritoService.clearCarrito();
            this.limpiarCliente();
            this.loading.dismiss();
          }).catch(error => {
              const mensaje = 'Pedido no enviado, vuelva a intentarlo';
              this.presentToast(mensaje); });
      
              //Guardar la replica del pedido
              this.fireStoreService.createDocument(this.pedido,pathPedidos,this.pedido.id).then( () =>{
              }).catch(error => {
                  const mensaje = 'Pedido no enviado, vuelva a intentarlo';
                  this.presentToast(mensaje); });
    
      }

  async presentAlertPrompt(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: message,
      buttons: [
       
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'subtitulo',
      message: 'Guardando',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

  limpiarCliente(){
    this.cliente = {
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
    };
  }

}
